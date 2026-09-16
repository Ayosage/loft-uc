import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Rate limiting (in-memory, per instance) ---
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_MAX = 5; // 5 requests per window per IP
const MIN_SUBMIT_MS = 2000;
const MAX_BODY_BYTES = 64 * 1024;

function getClientId(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function isRateLimited(id: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(id);
  if (!entry) {
    rateLimit.set(id, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (now > entry.resetAt) {
    rateLimit.set(id, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_MAX;
}

// --- Decoy rejections ---
// The honeypot and the timing guard both answer 200 so a scraper cannot tell
// it was caught. That silence also hides real submissions we drop by mistake,
// so every decoy answer is logged: search Vercel Runtime Logs for
// "Contact API: rejected" to see what the form swallowed.
function logDecoyRejection(
  reason: 'honeypot' | 'timing',
  clientId: string,
  detail: Record<string, unknown>
): void {
  console.warn(
    `Contact API: rejected (${reason})`,
    JSON.stringify({ clientId, ...detail })
  );
}

// --- HTML escaping to prevent injection in email body ---
function escapeHtml(s: string | null | undefined): string {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// --- Submitter confirmation ---
// Fixed copy. Interpolating any submitted field into this body would reopen
// the hole it was written to close, so it takes no arguments.
const CONFIRMATION_HTML = `
      <h2>Thank you for contacting Steeple Lofts</h2>
      <p>We have received your inquiry and our leasing team will be in touch shortly.</p>
      <p>To reach us sooner, call the leasing office at <a href="tel:2156134190">215-613-4190</a>.</p>
    `;

// --- Validation ---
const LIMITS = { name: 200, email: 254, phone: 50, message: 5000, moveInDate: 10 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOVE_IN_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function validate(body: unknown): { ok: true; d: { name: string; email: string; phone?: string; message: string; moveInDate?: string } } | { ok: false; status: number; error: string } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, status: 400, error: 'Invalid request body' };
  }
  const b = body as Record<string, unknown>;
  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : '';
  const phone = typeof b.phone === 'string' ? b.phone.trim() : undefined;
  const message = typeof b.message === 'string' ? b.message.trim() : '';
  const moveInDate = typeof b.moveInDate === 'string' ? b.moveInDate.trim() : undefined;

  if (!name || !email || !message) {
    return { ok: false, status: 400, error: 'Name, email, and message are required' };
  }
  if (name.length > LIMITS.name) {
    return { ok: false, status: 400, error: `Name must be at most ${LIMITS.name} characters` };
  }
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) {
    return { ok: false, status: 400, error: 'Invalid email address' };
  }
  if (phone && phone.length > LIMITS.phone) {
    return { ok: false, status: 400, error: `Phone must be at most ${LIMITS.phone} characters` };
  }
  if (message.length > LIMITS.message) {
    return { ok: false, status: 400, error: `Message must be at most ${LIMITS.message} characters` };
  }
  if (moveInDate && (moveInDate.length > LIMITS.moveInDate || !MOVE_IN_DATE_RE.test(moveInDate))) {
    return { ok: false, status: 400, error: 'Invalid move-in date format (use YYYY-MM-DD)' };
  }

  return { ok: true, d: { name, email, phone: phone || undefined, message, moveInDate: moveInDate || undefined } };
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('Contact API: RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    // Cap the body before parsing it; the form is a few KB at most.
    const length = Number(request.headers.get('content-length') ?? 0);
    if (length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    const clientId = getClientId(request);
    if (isRateLimited(clientId)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const fields: Record<string, unknown> =
      body && typeof body === 'object' && !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : {};

    // Honeypot: if "website" is filled, treat as bot — return 200 so we don't tip them off
    const hp = fields.website;
    if (typeof hp === 'string' && hp.trim().length > 0) {
      logDecoyRejection('honeypot', clientId, { email: fields.email });
      return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    }

    // Minimum time-to-submit: the form sends how long it was open, measured
    // entirely in the visitor's own clock. Comparing a browser timestamp
    // against server time instead would drop real leads from any device whose
    // clock runs fast, which is common on phones.
    // `t` is the field this replaced; it carried an absolute browser timestamp,
    // so a value from a still-cached old bundle reads here as a very long
    // duration and passes. Drop that fallback once no old bundles are in
    // flight. Missing or under 2 s means a script, not a person; answer like
    // the honeypot does.
    const elapsedMs = fields.elapsedMs ?? fields.t;
    if (
      typeof elapsedMs !== 'number' ||
      !Number.isFinite(elapsedMs) ||
      elapsedMs < MIN_SUBMIT_MS
    ) {
      logDecoyRejection('timing', clientId, { elapsedMs, email: fields.email });
      return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    }

    const validated = validate(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: validated.status });
    }
    const { name, email, phone, message, moveInDate } = validated.d;

    const formattedMoveInDate = moveInDate
      ? new Date(moveInDate).toLocaleDateString()
      : 'Not specified';

    const emailContent = `
      <h2>New Inquiry from Steeple Lofts Website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : 'Not provided'}</p>
      <p><strong>Desired Move-in Date:</strong> ${escapeHtml(formattedMoveInDate)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `;

    // The enquiry itself goes to the leasing office only. The submitter's
    // address is caller-supplied, so it must never share a send with
    // caller-authored text: a cc here would let anyone deliver a message they
    // wrote to a mailbox they chose, sent from this building's domain and
    // charged to its Resend quota.
    const { data, error } = await resend.emails.send({
      from: 'Steeple Lofts <noreply@steepleapartments.com>',
      to: ['leasing@madisonparke.com'],
      subject: 'New Inquiry from Steeple Lofts',
      html: emailContent,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Acknowledge the submitter separately, with a fixed body. Nothing the
    // caller typed appears in it, so the worst this send can do is deliver
    // these three lines to an address someone chose.
    // The lead is already safely with leasing, so a failure here is logged and
    // swallowed rather than reported as a failed submission.
    try {
      const { error: confirmationError } = await resend.emails.send({
        from: 'Steeple Lofts <noreply@steepleapartments.com>',
        to: [email],
        subject: 'We received your inquiry',
        html: CONFIRMATION_HTML,
      });
      if (confirmationError) {
        console.error('Contact API: confirmation send failed', confirmationError);
      }
    } catch (confirmationThrow) {
      console.error('Contact API: confirmation send threw', confirmationThrow);
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

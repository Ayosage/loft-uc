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

    if (isRateLimited(getClientId(request))) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot: if "website" is filled, treat as bot — return 200 so we don't tip them off
    const hp = body && typeof body === 'object' && !Array.isArray(body)
      ? (body as Record<string, unknown>).website
      : undefined;
    if (typeof hp === 'string' && hp.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    }

    // Minimum time-to-submit: the form sends the time it was opened. Missing or
    // under 2 s means a script, not a person; answer like the honeypot does.
    const t = body && typeof body === 'object' && !Array.isArray(body)
      ? (body as Record<string, unknown>).t
      : undefined;
    if (typeof t !== 'number' || !Number.isFinite(t) || Date.now() - t < MIN_SUBMIT_MS) {
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

    const { data, error } = await resend.emails.send({
      from: 'Steeple Lofts <noreply@steepleapartments.com>',
      to: ['leasing@madisonparke.com'],
      cc: [email],
      subject: 'New Inquiry from Steeple Lofts',
      html: emailContent,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
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

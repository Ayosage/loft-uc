/**
 * Contact API spam guard.
 *
 * These tests never send mail: global fetch is stubbed, so a call to it is the
 * signal that the route tried to reach Resend. A "decoy 200" (honeypot or
 * timing rejection) looks identical to a real success from the outside, so
 * every assertion here checks the fetch count, not just the status.
 *
 * Run with: npm test (needs Node 22 or newer for TypeScript type stripping).
 */
import assert from 'node:assert/strict';
import { after, beforeEach, describe, it } from 'node:test';

process.env.RESEND_API_KEY = 're_test_key_never_used';

const { POST } = await import('../src/app/api/contact/route.ts');

const MIN_SUBMIT_MS = 2000;
const MINUTE = 60 * 1000;

const realFetch = globalThis.fetch;
const realWarn = console.warn;

let sendAttempts = 0;
let sent: Array<Record<string, unknown>> = [];
let warnings: string[] = [];

globalThis.fetch = async () =>
  new Response(JSON.stringify({ id: 'test-email-id' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });

after(() => {
  globalThis.fetch = realFetch;
  console.warn = realWarn;
});

// The route rate-limits 5 submissions per IP per 15 minutes and keeps that
// count in module state, so every case submits from its own address.
let ipCounter = 0;
function nextIp(): string {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

const FORM = {
  name: 'Dana Reyes',
  email: 'dana@example.com',
  phone: '215-555-0142',
  message: 'I would like to schedule a tour of a one bedroom.',
  moveInDate: '2026-11-01',
  website: '',
};

/**
 * What the browser sends. The form records the time it opened and submits the
 * elapsed duration, so both readings come from the visitor's own clock and the
 * device's offset from real time cancels out.
 */
function browserSubmission(
  { deviceClockOffsetMs = 0, dwellMs = 5000 } = {},
  overrides: Record<string, unknown> = {}
) {
  const openedAt = Date.now() + deviceClockOffsetMs;
  const submittedAt = openedAt + dwellMs;
  return { ...FORM, elapsedMs: submittedAt - openedAt, ...overrides };
}

async function post(body: Record<string, unknown>) {
  const { NextRequest } = await import('next/server');
  const request = new NextRequest('https://www.steepleapartments.com/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': nextIp() },
    body: JSON.stringify(body),
  });
  const response = await POST(request);
  return { status: response.status, body: await response.json() };
}

beforeEach(() => {
  sendAttempts = 0;
  sent = [];
  warnings = [];
  globalThis.fetch = async (_url: unknown, init?: { body?: unknown }) => {
    sendAttempts += 1;
    try {
      sent.push(JSON.parse(String(init?.body ?? '{}')));
    } catch {
      sent.push({});
    }
    return new Response(JSON.stringify({ id: 'test-email-id' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  };
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(' '));
  };
});

describe('contact API timing guard', () => {
  it('accepts a submission from a device whose clock runs fast', async () => {
    // A phone ten minutes ahead of real time. Under the old guard the server
    // computed Date.now() - openedAt, which for this device is negative, so a
    // real lead was silently dropped.
    const offset = 10 * MINUTE;
    const openedAtOnDevice = Date.now() + offset;
    assert.ok(
      Date.now() - openedAtOnDevice < MIN_SUBMIT_MS,
      'precondition: mixing the two clocks would reject this submission'
    );

    const { status, body } = await post(
      browserSubmission({ deviceClockOffsetMs: offset, dwellMs: 5000 })
    );

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(sendAttempts, 2, 'the lead and the acknowledgement both go out');
    assert.deepEqual(warnings, []);
  });

  it('accepts a submission from a device whose clock runs slow', async () => {
    const { status, body } = await post(
      browserSubmission({ deviceClockOffsetMs: -45 * MINUTE, dwellMs: 5000 })
    );

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(sendAttempts, 2);
  });

  it('accepts an honest submission that took longer than 2 s', async () => {
    const { status, body } = await post(browserSubmission({ dwellMs: 30_000 }));

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(sendAttempts, 2);
  });

  it('rejects a submission filled in under 2 s, without tipping off the sender', async () => {
    const { status, body } = await post(browserSubmission({ dwellMs: 500 }));

    assert.equal(status, 200);
    assert.equal(body.success, true, 'the decoy answer must look like a success');
    assert.equal(sendAttempts, 0, 'nothing may reach Resend');
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /rejected \(timing\)/);
    assert.match(warnings[0], /"elapsedMs":500/);
  });

  it('rejects a submission with no elapsed time at all', async () => {
    const { status, body } = await post({ ...FORM });

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(sendAttempts, 0);
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /rejected \(timing\)/);
  });

  for (const [label, value] of [
    ['a string', '5000'],
    ['null', null],
    ['NaN', Number.NaN],
    ['Infinity', Number.POSITIVE_INFINITY],
    ['an object', { ms: 5000 }],
    ['a negative number', -5000],
  ] as const) {
    it(`rejects a malformed elapsed time: ${label}`, async () => {
      const { status, body } = await post({ ...FORM, elapsedMs: value });

      assert.equal(status, 200);
      assert.equal(body.success, true);
      assert.equal(sendAttempts, 0);
      assert.equal(warnings.length, 1);
      assert.match(warnings[0], /rejected \(timing\)/);
    });
  }

  it('accepts a fast-clock submission sent in the old wire format', async () => {
    // The exact production failure: a bundle that posts the browser's absolute
    // timestamp, from a phone ten minutes ahead of real time. The old server
    // computed Date.now() - t, got a negative number, and answered the decoy
    // 200 without sending anything.
    const { status, body } = await post({ ...FORM, t: Date.now() + 10 * MINUTE });

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(sendAttempts, 2, 'the lead must not be silently dropped');
  });

  it('still accepts the legacy absolute timestamp from a cached old bundle', async () => {
    // Visitors who loaded the page before this deploy post `t`, an absolute
    // browser timestamp. It reads as a very long duration, so their lead goes
    // through instead of being dropped during the rollout.
    const { status, body } = await post({ ...FORM, t: Date.now() });

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(sendAttempts, 2);
  });
});

describe('contact API send split', () => {
  it('never puts caller text and a caller address in the same send', async () => {
    // What the cc allowed: the enquiry mail carried the submitter's own text
    // and was copied to an address they chose, so the route could deliver
    // written-to-order mail from this building's domain. The lead and the
    // acknowledgement are now separate sends with no overlap.
    const { status } = await post(browserSubmission());
    assert.equal(status, 200);
    assert.equal(sent.length, 2);

    const [lead, acknowledgement] = sent;

    assert.deepEqual(lead.to, ['leasing@madisonparke.com']);
    assert.equal(lead.cc, undefined, 'the lead may not be copied anywhere');
    assert.ok(String(lead.html).includes(FORM.message), 'leasing still gets the message');

    assert.deepEqual(acknowledgement.to, [FORM.email]);
    assert.equal(
      String(acknowledgement.html).includes(FORM.message),
      false,
      'the acknowledgement must not echo anything the caller typed'
    );
    for (const field of [FORM.name, FORM.phone, FORM.moveInDate]) {
      assert.equal(String(acknowledgement.html).includes(field), false, `leaks ${field}`);
    }
  });
});
describe('contact API honeypot', () => {
  it('rejects a filled honeypot and logs it separately', async () => {
    const { status, body } = await post(
      browserSubmission({ dwellMs: 30_000 }, { website: 'https://spam.example' })
    );

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(sendAttempts, 0);
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /rejected \(honeypot\)/);
  });
});

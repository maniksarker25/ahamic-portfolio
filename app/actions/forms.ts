'use server';

import { SITE } from '../../constants/site';

/**
 * Form submissions (contact, booking, newsletter) are emailed to the team via Resend
 * (https://resend.com). Configure in `.env.local` / your hosting provider:
 *
 *   RESEND_API_KEY      required — API key from resend.com
 *   CONTACT_TO_EMAIL    optional — inbox that receives submissions (default: SITE.email)
 *   CONTACT_FROM_EMAIL  optional — verified sender, e.g. "Ahamic Website <hello@ahamicsolutions.com>"
 *                       (default: Resend's test sender, which can only deliver to your own Resend account email)
 */

export type FormState = {status: 'idle' | 'success' | 'error';message?: string;};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FAILURE = `Sorry — we couldn't send that right now. Please email us directly at ${SITE.email}.`;

function text(fd: FormData, key: string, max = 200): string {
  const v = fd.get(key);
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

/** Hidden "website" field: real visitors never fill it, bots usually do. */
function isBot(fd: FormData) {
  return text(fd, 'website') !== '';
}

async function sendEmail(subject: string, replyTo: string | undefined, body: Record<string, string>): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(`[forms] RESEND_API_KEY is not set — "${subject}" was NOT delivered.`);
    return false;
  }

  const lines = Object.entries(body).
  filter(([, v]) => v).
  map(([k, v]) => `${k}: ${v}`);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Ahamic Website <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO_EMAIL || SITE.email],
        reply_to: replyTo,
        subject,
        text: lines.join('\n\n')
      })
    });
    if (!res.ok) {
      console.error(`[forms] Resend responded ${res.status} for "${subject}"`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[forms] Failed to reach Resend for "${subject}"`, err);
    return false;
  }
}

export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: 'success' };

  const name = text(fd, 'name', 120);
  const email = text(fd, 'email', 200);
  const message = text(fd, 'message', 5000);
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return { status: 'error', message: 'Please add your name, a valid email and a few details about your project.' };
  }

  const ok = await sendEmail(`New project enquiry from ${name}`, email, {
    Name: name,
    Email: email,
    Company: text(fd, 'company', 200),
    Phone: text(fd, 'phone', 50),
    Budget: text(fd, 'budget', 50),
    'Project details': message
  });
  return ok ? { status: 'success' } : { status: 'error', message: FAILURE };
}

export async function submitBooking(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: 'success' };

  const name = text(fd, 'name', 120);
  const email = text(fd, 'email', 200);
  const day = text(fd, 'day', 60);
  const time = text(fd, 'time', 30);
  if (!name || !EMAIL_RE.test(email) || !day || !time) {
    return { status: 'error', message: 'Please pick a day and time, and add your name and a valid email.' };
  }

  const ok = await sendEmail(`Consultation request: ${day}, ${time}`, email, {
    Name: name,
    Email: email,
    'Requested slot': `${day} at ${time} (Bangladesh time, GMT+6)`
  });
  return ok ?
  { status: 'success' } :
  { status: 'error', message: FAILURE };
}

export async function subscribeNewsletter(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: 'success', message: "Thanks — you're on the list." };

  const email = text(fd, 'email', 200);
  if (!EMAIL_RE.test(email)) return { status: 'error', message: 'Please enter a valid email address.' };

  const ok = await sendEmail('New newsletter subscriber', email, { Email: email });
  return ok ?
  { status: 'success', message: "Thanks — you're on the list." } :
  { status: 'error', message: FAILURE };
}

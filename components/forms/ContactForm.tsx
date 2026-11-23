'use client';

import React, { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRightIcon, Loader2Icon } from 'lucide-react';
import { submitContact, type FormState } from '../../app/actions/forms';
import { FormError, Honeypot, inputClass, submitWithoutReset } from '../shared/FormBits';

const budgets = ['< $25k', '$25k – $75k', '$75k – $150k', '$150k+'];
const initial: FormState = { status: 'idle' };

export function ContactForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(submitContact, initial);

  useEffect(() => {
    if (state.status === 'success') router.push('/thank-you');
  }, [state.status, router]);

  return (
    <form onSubmit={submitWithoutReset(action)} className="gradient-border relative rounded-3xl p-8">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" placeholder="Jane Cooper" autoComplete="name" required />
        <Field id="email" label="Work email" type="email" placeholder="jane@company.com" autoComplete="email" required />
        <Field id="company" label="Company" placeholder="Acme Inc." autoComplete="organization" />
        <Field id="phone" label="Phone (optional)" type="tel" placeholder="+880 1XXX-XXXXXX" autoComplete="tel" />
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-medium text-ink">Budget range</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b, i) =>
          <label key={b} className="cursor-pointer">
              <input type="radio" name="budget" value={b} defaultChecked={i === 1} className="peer sr-only" />
              <span className="inline-block rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors peer-checked:border-accent peer-checked:bg-accent/15 peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                {b}
              </span>
            </label>
          )}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Project details<span className="text-accent-soft"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          placeholder="Tell us about your goals, timeline, and where you need help…"
          className={inputClass} />

      </div>

      <FormError message={state.status === 'error' ? state.message : undefined} />

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-slate-800 disabled:opacity-60 sm:w-auto">

        {pending ?
        <><Loader2Icon className="h-4 w-4 animate-spin" /> Sending…</> :
        <>Send message <ArrowUpRightIcon className="h-4 w-4" /></>
        }
      </button>
    </form>);

}

function Field({
  id, label, type = 'text', placeholder, required, autoComplete
}: {id: string;label: string;type?: string;placeholder?: string;required?: boolean;autoComplete?: string;}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}{required && <span className="text-accent-soft"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputClass} />
    </div>);

}

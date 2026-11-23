'use client';

import React, { useActionState } from 'react';
import { ArrowUpRightIcon, CheckIcon, Loader2Icon } from 'lucide-react';
import { subscribeNewsletter, type FormState } from '../../app/actions/forms';
import { Honeypot, submitWithoutReset } from '../shared/FormBits';

const initial: FormState = { status: 'idle' };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, initial);

  if (state.status === 'success') {
    return (
      <p role="status" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 md:mt-0">
        <CheckIcon className="h-4 w-4" /> {state.message}
      </p>);

  }

  return (
    <div className="mt-5 w-full max-w-md md:mt-0">
      <form onSubmit={submitWithoutReset(action)} className="relative flex gap-2">
        <Honeypot />
        <label htmlFor="newsletter" className="sr-only">Email address</label>
        <input
          id="newsletter"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent focus:bg-white focus:outline-none" />

        <button
          type="submit"
          disabled={pending}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-blue-600 disabled:opacity-60">

          {pending ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <>Subscribe <ArrowUpRightIcon className="h-4 w-4" /></>}
        </button>
      </form>
      {state.status === 'error' && <p role="alert" className="mt-2 text-sm text-red-600">{state.message}</p>}
    </div>);

}

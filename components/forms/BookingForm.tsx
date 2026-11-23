'use client';

import React, { useActionState, useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRightIcon, Loader2Icon } from 'lucide-react';
import { submitBooking, type FormState } from '../../app/actions/forms';
import { FormError, Honeypot, inputClass, submitWithoutReset } from '../shared/FormBits';
import { cn } from '../../lib/cn';

const times = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];
const initial: FormState = { status: 'idle' };

/** The next `count` working days (Sun–Thu are working days in Bangladesh; Fri/Sat skipped), starting tomorrow. */
function nextWorkingDays(count: number): string[] {
  const fmt = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const days: string[] = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 5 && wd !== 6) days.push(fmt.format(d));
  }
  return days;
}

// Dates depend on "today", so they are read on the client only. useSyncExternalStore renders the
// server snapshot (null) during hydration, then the real dates — no stale build-time dates, no mismatch.
let cachedDays: string[] | null = null;
const noSubscribe = () => () => {};
const getDays = () => cachedDays ??= nextWorkingDays(5);
const getServerDays = () => null;

export function BookingForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(submitBooking, initial);
  const days = useSyncExternalStore(noSubscribe, getDays, getServerDays) ?? [];
  const [pickedDay, setDay] = useState('');
  const day = pickedDay || days[0] || '';
  const [time, setTime] = useState(times[1]);

  useEffect(() => {
    if (state.status === 'success') router.push('/thank-you');
  }, [state.status, router]);

  return (
    <form onSubmit={submitWithoutReset(action)} className="relative rounded-3xl border border-border bg-card p-8">
      <Honeypot />
      <input type="hidden" name="day" value={day} />
      <input type="hidden" name="time" value={time} />

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">Pick a day</legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {days.length === 0 ?
          Array.from({ length: 5 }).map((_, i) =>
          <span key={i} className="h-[46px] animate-pulse rounded-2xl bg-surface" aria-hidden />
          ) :
          days.map((d) =>
          <Choice key={d} selected={day === d} onClick={() => setDay(d)}>{d}</Choice>
          )}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-medium text-ink">
          Pick a time <span className="font-normal text-muted">(Bangladesh time, GMT+6)</span>
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {times.map((t) =>
          <Choice key={t} selected={time === t} onClick={() => setTime(t)}>{t}</Choice>
          )}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Full name" autoComplete="name" aria-label="Full name" className={inputClass} />
        <input name="email" required type="email" placeholder="Work email" autoComplete="email" aria-label="Work email" className={inputClass} />
      </div>

      <FormError message={state.status === 'error' ? state.message : undefined} />

      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted" aria-live="polite">
          Selected: <span className="text-ink">{day ? `${day} · ${time}` : '—'}</span>
        </p>
        <button
          type="submit"
          disabled={pending || !day}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg hover:bg-slate-800 disabled:opacity-60">

          {pending ?
          <><Loader2Icon className="h-4 w-4 animate-spin" /> Sending…</> :
          <>Request this slot <ArrowUpRightIcon className="h-4 w-4" /></>
          }
        </button>
      </div>
    </form>);

}

function Choice({ selected, onClick, children }: {selected: boolean;onClick: () => void;children: React.ReactNode;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'rounded-2xl border px-2 py-3 text-sm font-medium transition-colors',
        selected ? 'border-accent bg-accent/15 text-ink' : 'border-border bg-surface text-muted hover:text-ink'
      )}>

      {children}
    </button>);

}

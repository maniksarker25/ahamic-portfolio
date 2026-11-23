import React, { startTransition } from 'react';

/**
 * Submit handler that runs a `useActionState` action without React 19's automatic
 * form reset — so a validation error doesn't wipe what the visitor typed.
 */
export function submitWithoutReset(action: (fd: FormData) => void) {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };
}

/** Off-screen field that only bots fill in. Checked by the server actions. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>);

}

export function FormError({ message }: {message?: string;}) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </p>);

}

export const inputClass =
'w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent/60 focus:outline-none';

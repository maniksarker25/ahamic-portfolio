import React from 'react';
import { cn } from '../../lib/cn';

type MarqueeProps = {
  items: string[];
  className?: string;
};

/** Infinite horizontal scroller. The list is rendered twice for a seamless loop; only the first copy is exposed to screen readers. */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={cn('relative flex overflow-hidden', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" aria-hidden />

      <div className="flex min-w-full shrink-0 animate-marquee items-center">
        <ul className="flex shrink-0 items-center gap-16 pr-16">
          {items.map((item) =>
          <li key={item} className="whitespace-nowrap font-display text-xl font-medium text-muted/70">{item}</li>
          )}
        </ul>
        <ul className="flex shrink-0 items-center gap-16 pr-16" aria-hidden>
          {items.map((item) =>
          <li key={item} className="whitespace-nowrap font-display text-xl font-medium text-muted/70">{item}</li>
          )}
        </ul>
      </div>
    </div>);

}

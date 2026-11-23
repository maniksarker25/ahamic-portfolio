import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Aurora } from '../../components/shared/Aurora';
import { MagneticButton } from '../../components/shared/MagneticButton';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Thank You',
  description: 'We have received your message and will be in touch within one business day.',
  path: '/thank-you',
  noIndex: true
});

const delay = (s: number) => ({ animationDelay: `${s}s`, ['--fade-y' as string]: '16px' }) as React.CSSProperties;

export default function ThankYou() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pt-28">
      <div className="absolute inset-0 bg-grid bg-grid-fade" aria-hidden />
      <Aurora />
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="animate-fade-up grid h-20 w-20 place-items-center rounded-full bg-accent/20 text-accent-soft shadow-glow">
          <CheckIcon className="h-9 w-9" />
        </span>
        <h1 className="animate-fade-up mt-8 font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl" style={delay(0.15)}>
          Thank you.
        </h1>
        <p className="animate-fade-up mt-5 max-w-md text-base text-muted md:text-lg" style={delay(0.25)}>
          We have got your message and a senior lead will be in touch within one business day. Keep an eye on your inbox.
        </p>
        <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={delay(0.35)}>
          <MagneticButton to="/" variant="primary">Back to home</MagneticButton>
          <MagneticButton to="/portfolio" variant="ghost">Explore our work</MagneticButton>
        </div>
      </div>
    </section>);

}

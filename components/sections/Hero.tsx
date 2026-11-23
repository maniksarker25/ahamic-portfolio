import React from 'react';
import { ArrowRightIcon, FileTextIcon } from 'lucide-react';
import { MagneticButton } from '../shared/MagneticButton';
import { Aurora } from '../shared/Aurora';
import { SITE } from '../../constants/site';
import { TeamGridShowcase } from './TeamGridShowcase';

const words = ['Software', 'Development', '&', 'Digital', 'Solutions'];

/** Inline style for a staggered CSS entrance (see .animate-fade-up in globals.css). */
const delay = (s: number) => ({ animationDelay: `${s}s` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative flex w-full flex-col items-center justify-start bg-[#e8f5fd] pt-28 lg:pt-32">
      {/* Subtle dot-grid background */}
      <div className="absolute inset-0 bg-grid bg-grid-fade" aria-hidden />
      <Aurora />

      {/* ── Badge + Title + Subtitle + CTA buttons ── */}
      <div className="relative z-10 mx-auto mb-8 flex w-full max-w-container flex-col items-center px-4 text-center sm:px-6 lg:mb-0">
        <div
          className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 font-display text-xs font-medium uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur"
          style={{ ['--fade-y' as string]: '12px' }}>

          {SITE.name} · Software Development Company
        </div>

        <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.25rem]">
          {words.map((w, i) =>
          <span
            key={w}
            className={`animate-fade-up inline-block ${i >= 3 ? 'text-gradient' : ''}`}
            style={delay(0.1 + i * 0.08)}>

              {w}
              {i < words.length - 1 && ' '}
            </span>
          )}
        </h1>

        <p className="animate-fade-up mt-5 max-w-xl text-balance text-base text-muted md:text-lg" style={delay(0.45)}>
          {SITE.subline}
        </p>

        <div className="animate-fade-up mt-7 flex flex-col items-center gap-3 sm:flex-row" style={delay(0.55)}>
          <MagneticButton to="/book" variant="primary">
            Hire The Best Team <ArrowRightIcon className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton to="/portfolio" variant="ghost">
            <FileTextIcon className="h-4 w-4" /> Company Deck
          </MagneticButton>
        </div>
      </div>

      {/* ── Full-width staggered mosaic; on desktop the tall side tiles rise up beside the CTAs ── */}
      <div className="relative z-0 w-full lg:-mt-[3.5vw]">
        <TeamGridShowcase />
      </div>
    </section>);

}

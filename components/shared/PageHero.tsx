import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { Aurora } from './Aurora';
import { Eyebrow } from './Section';

type Crumb = {label: string;to?: string;};

type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  crumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, subtitle, crumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border pb-20 pt-40 md:pb-28 md:pt-48">
      <div className="absolute inset-0 bg-grid bg-grid-fade" aria-hidden />
      <Aurora />
      <div className="relative z-10 mx-auto w-full max-w-container px-6 text-center">
        {crumbs &&
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-1.5 text-xs text-muted">
              {crumbs.map((c, i) =>
            <li key={c.label} className="flex items-center gap-1.5">
                  {c.to ?
              <Link href={c.to} className="hover:text-ink">{c.label}</Link> :
              <span className="text-ink" aria-current={i === crumbs.length - 1 ? 'page' : undefined}>{c.label}</span>
              }
                  {i < crumbs.length - 1 && <ChevronRightIcon className="h-3 w-3" aria-hidden />}
                </li>
            )}
            </ol>
          </nav>
        }
        {eyebrow &&
        <div className="animate-fade-up mb-6 flex justify-center" style={{ ['--fade-y' as string]: '12px' }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        }
        <h1 className="animate-fade-up mx-auto max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
          {title}
        </h1>
        {subtitle &&
        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-base text-muted md:text-lg"
          style={{ animationDelay: '0.15s', ['--fade-y' as string]: '16px' }}>

            {subtitle}
          </p>
        }
      </div>
    </section>);

}

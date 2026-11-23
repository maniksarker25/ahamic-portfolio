import React from 'react';
import Link from 'next/link';
import { Facebook, LinkedinIcon, type LucideIcon } from 'lucide-react';
import { Logo } from './Logo';
import { NewsletterForm } from '../forms/NewsletterForm';
import { SITE, SERVICES, INDUSTRIES } from '../../constants/site';

const columns = [
{
  title: 'Company',
  links: [
  { label: 'About', to: '/about' },
  { label: 'Team', to: '/about#team' },
  { label: 'Process', to: '/about#process' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' }]

},
{
  title: 'Services',
  links: SERVICES.slice(0, 6).map((s) => ({ label: s.title, to: `/services/${s.slug}` }))
},
{
  title: 'Resources',
  links: [
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'FAQ', to: '/pricing#faq' },
  { label: 'Book a call', to: '/book' }]

},
{
  title: 'Legal',
  links: [
  { label: 'Privacy Policy', to: '/legal/privacy' },
  { label: 'Terms & Conditions', to: '/legal/terms' },
  { label: 'Cookie Policy', to: '/legal/cookies' }]

}];


const socialIcons: Record<string, LucideIcon> = { Facebook, LinkedIn: LinkedinIcon };

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-slate-200 bg-slate-100/80 text-slate-600">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="mx-auto w-full max-w-container px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-500">{SITE.subline}</p>
            <address className="mt-6 flex flex-col gap-2 text-sm not-italic text-slate-500">
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-accent">{SITE.email}</a>
              <a href={`tel:${SITE.phoneIntl}`} className="transition-colors hover:text-accent">{SITE.phone}</a>
              <span>{SITE.address}</span>
            </address>
            <div className="mt-6 flex gap-2">
              {SITE.socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${SITE.name} on ${s.label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-accent hover:bg-blue-50 hover:text-accent">

                    {Icon && <Icon className="h-4 w-4" />}
                  </a>);

              })}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) =>
            <div key={col.title}>
                <h3 className="text-sm font-semibold text-slate-900">{col.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) =>
                <li key={link.label}>
                      <Link href={link.to} className="text-sm text-slate-500 transition-colors hover:text-accent">
                        {link.label}
                      </Link>
                    </li>
                )}
                </ul>
              </div>
            )}
          </nav>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-md md:flex md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-slate-900">Get sharp product insight, monthly.</h3>
            <p className="mt-1 text-sm text-slate-500">No noise. Just what we are learning building software.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {INDUSTRIES.slice(0, 5).join(' · ')} & more
          </p>
        </div>
      </div>
    </footer>);

}

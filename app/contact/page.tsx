import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, Facebook, LinkedinIcon } from 'lucide-react';
import { PageHero } from '../../components/shared/PageHero';
import { Section } from '../../components/shared/Section';
import { Reveal } from '../../components/shared/Reveal';
import { ContactForm } from '../../components/forms/ContactForm';
import { SITE } from '../../constants/site';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Contact',
  description: `Tell us about your project. ${SITE.name} replies within one business day with clear next steps.`,
  path: '/contact'
});

const contactCards = [
{ icon: MailIcon, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
{ icon: PhoneIcon, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phoneIntl}` },
{ icon: MapPinIcon, label: 'Studio', value: SITE.address },
{ icon: LinkedinIcon, label: 'LinkedIn', value: 'linkedin.com/company/ahamicsolutions', href: SITE.socials.find((s) => s.label === 'LinkedIn')?.href },
{ icon: Facebook, label: 'Facebook', value: 'facebook.com/ahamicsolutions', href: SITE.socials.find((s) => s.label === 'Facebook')?.href }];


export default function Contact() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        eyebrow="Let's talk"
        title={<>Tell us what you’re<br />trying to build.</>}
        subtitle="Share a few details and we will get back within one business day with clear next steps." />

      <Section className="pt-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {contactCards.map((c) => {
                const inner =
                <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-accent/50">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-soft">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted">{c.label}</p>
                      <p className="mt-0.5 font-medium text-ink">{c.value}</p>
                    </div>
                  </div>;

                return c.href ?
                <a
                  key={c.label}
                  href={c.href}
                  className="block"
                  {...c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}}>
                    {inner}
                  </a> :
                <div key={c.label}>{inner}</div>;
              })}
            </div>

            <div className="mt-4 overflow-hidden rounded-3xl border border-border">
              <div className="relative aspect-[16/10] bg-surface bg-grid">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="animate-floaty grid h-14 w-14 place-items-center rounded-full bg-accent/20 text-accent-soft shadow-glow">
                    <MapPinIcon className="h-6 w-6" />
                  </span>
                </div>
                <span className="absolute bottom-4 left-4 rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm backdrop-blur">
                  {SITE.address} · Remote worldwide
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>
    </>);

}

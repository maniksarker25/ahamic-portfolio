import React from 'react';
import { CalendarIcon, ClockIcon, CheckIcon } from 'lucide-react';
import { PageHero } from '../../components/shared/PageHero';
import { Section } from '../../components/shared/Section';
import { Reveal } from '../../components/shared/Reveal';
import { BookingForm } from '../../components/forms/BookingForm';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Book a Free Consultation',
  description: 'Book a free 30-minute call with a senior lead — honest feedback on your idea or roadmap and clear next steps.',
  path: '/book'
});

const included = [
'A 30-minute call with a senior lead',
'Honest feedback on your idea or roadmap',
'Clear next steps — no obligation'];


export default function Book() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Book a consultation' }]}
        eyebrow="Free consultation"
        title={<>Book 30 minutes<br />with a senior lead.</>}
        subtitle="No sales script. Just a focused conversation about where you want to go and how to get there." />

      <Section className="pt-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="gradient-border rounded-3xl p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent-soft">
                <CalendarIcon className="h-6 w-6" />
              </span>
              <h2 className="mt-6 font-display text-xl font-semibold text-ink">Strategy consultation</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted"><ClockIcon className="h-4 w-4" /> 30 minutes · Video call</p>
              <ul className="mt-6 space-y-3">
                {included.map((item) =>
                <li key={item} className="flex gap-3 text-sm text-muted">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                    {item}
                  </li>
                )}
              </ul>
              <p className="mt-6 text-xs text-muted">
                We’ll confirm your slot by email within one business day.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <BookingForm />
            </Reveal>
          </div>
        </div>
      </Section>
    </>);

}

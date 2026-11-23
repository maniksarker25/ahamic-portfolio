import React from 'react';
import { PageHero } from '../../components/shared/PageHero';
import { TeamGridShowcase } from '../../components/sections/TeamGridShowcase';
import { Stats } from '../../components/sections/Stats';
import { Process } from '../../components/sections/Process';
import { Section, SectionHeading } from '../../components/shared/Section';
import { Reveal } from '../../components/shared/Reveal';
import { CTA } from '../../components/sections/CTA';
import { Team } from '../../components/sections/Team';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: "About Us",
  description: "Meet Ahamic Solutions — a small, senior software team in Dhaka, Bangladesh, building web, mobile and SaaS products for clients worldwide.",
  path: "/about"
});

const VALUES = [
{ title: 'Craft over volume', body: 'We take fewer projects so each one gets the obsessive attention it deserves.' },
{ title: 'Outcomes over output', body: 'Shipping is the start, not the goal. We measure ourselves against your results.' },
{ title: 'Honesty over comfort', body: 'We tell you what we would do if it were our own company — even when it is hard to hear.' },
{ title: 'Ownership over ego', body: 'We leave you with clean code, clear docs, and a team that can run without us.' }];



export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        eyebrow="Our story"
        title={<>A studio built on craft,<br />candor, and consequence.</>}
        subtitle="Ahamic Solutions started with a simple conviction: the best software comes from small, senior teams who care deeply and stay accountable. Years later, that is still exactly how we work." />

      {/* ── Team mosaic (same component as the home hero) ── */}
      <div className="bg-[#e8f5fd] pt-12">
        <TeamGridShowcase />
      </div>

      <Stats />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="What we believe"
              title="Principles we refuse to compromise" />
            
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {VALUES.map((v, i) =>
            <Reveal key={v.title} delay={i * 0.06}>
                <div className="gradient-border h-full rounded-3xl p-7">
                  <h3 className="font-display text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Section>

      <Team />

      <Process />
      <CTA />
    </>);

}
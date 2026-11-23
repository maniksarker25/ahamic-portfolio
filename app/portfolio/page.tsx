import React from 'react';
import { PageHero } from '../../components/shared/PageHero';
import { Section } from '../../components/shared/Section';
import { CTA } from '../../components/sections/CTA';
import { PortfolioFilter } from '../../components/sections/PortfolioFilter';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Portfolio',
  description: 'Selected SaaS, web, mobile and custom software projects designed and engineered by Ahamic Solutions.',
  path: '/portfolio'
});

export default function Portfolio() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Portfolio' }]}
        eyebrow="Selected work"
        title={<>Work we are proud<br />to put our name on.</>}
        subtitle="A look at products we have designed and engineered across SaaS, healthcare, logistics, and beyond." />

      <Section>
        <PortfolioFilter />
      </Section>

      <CTA />
    </>);

}

import React from 'react';
import { PageHero } from '../../components/shared/PageHero';
import { ServicesGrid } from '../../components/sections/ServicesGrid';
import { Process } from '../../components/sections/Process';
import { Technologies } from '../../components/sections/Technologies';
import { FAQ } from '../../components/sections/FAQ';
import { CTA } from '../../components/sections/CTA';
import { SERVICES } from '../../constants/site';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: "Services",
  description: "UI/UX design, web and mobile app development, SaaS, ERP/CRM, APIs, AI integration, cloud and more — one accountable team from first sketch to production.",
  path: "/services"
});

export default function Services() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        eyebrow="Capabilities"
        title={<>Everything you need to<br />design, build, and scale.</>}
        subtitle={`${SERVICES.length} disciplines, one integrated team. Whatever stage you are at, we plug in exactly where you need us.`} />
      
      <ServicesGrid showAll />
      <Technologies />
      <Process />
      <FAQ />
      <CTA />
    </>);

}
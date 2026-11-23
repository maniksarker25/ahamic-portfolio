import React from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import { Section, SectionHeading } from '../shared/Section';
import { Reveal } from '../shared/Reveal';
import { ProjectCard } from './ProjectCard';
import { PROJECTS } from '../../constants/site';

export function FeaturedProjects() {
  return (
    <Section>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          align="left"
          eyebrow="Selected work"
          title={<>Products people<br />rely on every day.</>} />

        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition-all hover:border-accent hover:bg-blue-50 hover:text-accent">

          All projects <ArrowUpRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project, i) =>
        <Reveal key={project.slug} delay={i % 2 * 0.1} className="h-full">
            <ProjectCard project={project} detailed />
          </Reveal>
        )}
      </div>
    </Section>);

}

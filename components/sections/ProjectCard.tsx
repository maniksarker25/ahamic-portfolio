import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Project } from '../../constants/site';
import { IMAGES } from '../../constants/images';

/** Project card shared by the home page "Selected work" grid and the portfolio page. */
export function ProjectCard({ project, detailed = false }: {project: Project;detailed?: boolean;}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-slate-900/5">

      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={IMAGES[project.image].src}
          alt={`${project.client} — ${project.title}`}
          fill
          sizes="(min-width: 1200px) 576px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105" />

        <span className="absolute left-4 top-4 rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">{project.client} · {project.year}</p>
          <h3 className="mt-1.5 font-display text-lg font-semibold text-slate-900 transition-colors group-hover:text-accent">{project.title}</h3>
          {detailed &&
          <>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{project.summary}</p>
              <div className="mt-4 flex gap-6">
                {project.metrics.map((m) =>
              <div key={m.label}>
                    <p className="font-display text-xl font-semibold text-slate-900">{m.value}</p>
                    <p className="text-xs text-slate-500">{m.label}</p>
                  </div>
              )}
              </div>
            </>
          }
        </div>
        <ArrowUpRightIcon className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
    </Link>);

}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../constants/site';
import { cn } from '../../lib/cn';
import { ProjectCard } from './ProjectCard';

const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export function PortfolioFilter() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by category">
        {categories.map((c) =>
        <button
          key={c}
          type="button"
          onClick={() => setActive(c)}
          aria-pressed={active === c}
          className={cn(
            'rounded-full border px-5 py-2 text-sm font-medium transition-colors',
            active === c ? 'border-accent bg-accent/15 text-ink' : 'border-border bg-card text-muted hover:text-ink'
          )}>

            {c}
          </button>
        )}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) =>
          <motion.div
            key={project.slug}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>

              <ProjectCard project={project} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>);

}

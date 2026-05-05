'use client';

import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProjectCategory } from '@/types/project.types';

type FilterCategory = ProjectCategory | 'all';

const CATEGORIES: { value: FilterCategory; label: string }[] = [
  { value: 'all',    label: 'Todos' },
  { value: 'web',    label: 'Web' },
  { value: 'mobile', label: 'Móvil' },
  { value: 'saas',   label: 'SaaS' },
  { value: 'ai',     label: 'IA' },
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const { projects, loading, error } = useProjects(activeCategory);

  return (
    <section id="projects" className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Proyectos
          </span>
          <h2 className="text-4xl font-bold font-display text-white mt-2">Trabajo reciente</h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Proyectos que demuestran lo que puedo construir para ti.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                activeCategory === cat.value
                  ? 'bg-cyan-500 text-black'
                  : 'border border-white/10 text-zinc-400 hover:border-cyan-500/30 hover:text-cyan-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-lg bg-[#1a1a1a]" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-zinc-500 py-12">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-zinc-500 py-12">
            No hay proyectos en esta categoría todavía.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

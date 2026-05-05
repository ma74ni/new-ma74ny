import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { TechBadge } from './TechBadge';
import type { Project } from '@/types/project.types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group bg-[#111111] border border-white/8 rounded-lg overflow-hidden hover:-translate-y-1 hover:border-cyan-500/20 transition-all duration-200">
      <div className="aspect-video bg-[#1a1a1a] overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-700">
            <span className="text-4xl">💻</span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold leading-tight">{project.title}</h3>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver proyecto ${project.title}`}
              className="text-zinc-500 hover:text-cyan-400 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        <p className="text-zinc-500 text-sm line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </article>
  );
}

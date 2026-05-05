'use client';

import { useState, useEffect } from 'react';
import { getProjects } from '@/services/projects.service';
import type { Project, ProjectCategory } from '@/types/project.types';

type FilterCategory = ProjectCategory | 'all';

export function useProjects(category: FilterCategory = 'all') {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProjects()
      .then((all) => {
        const filtered =
          category === 'all' ? all : all.filter((p) => p.category === category);
        setProjects(filtered);
      })
      .catch(() => setError('No se pudieron cargar los proyectos.'))
      .finally(() => setLoading(false));
  }, [category]);

  return { projects, loading, error };
}

export type ProjectCategory = 'web' | 'mobile' | 'saas' | 'ai';

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  category: ProjectCategory;
  url?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

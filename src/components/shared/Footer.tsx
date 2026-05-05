import { Code, Github, Linkedin, Briefcase } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white font-semibold font-display">
            <Code className="h-4 w-4 text-cyan-400" />
            Diego Paredes
          </div>

          <p className="text-zinc-600 text-sm text-center">
            © {year} ma74ny.com — Construido con Next.js &amp; Claude
          </p>

          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-600 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-600 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.upwork}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Upwork"
              className="text-zinc-600 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
            >
              <Briefcase className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

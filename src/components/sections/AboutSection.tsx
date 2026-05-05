import { CheckCircle } from 'lucide-react';
import { TechBadge } from '@/components/shared/TechBadge';
import { TECH_STACK } from '@/lib/constants';

const STATS = [
  { value: '8+',  label: 'Años de experiencia' },
  { value: '50+', label: 'Proyectos entregados' },
  { value: '3',   label: 'Países atendidos' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <div className="space-y-6">
            <div>
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
                Sobre mí
              </span>
              <h2 className="text-4xl font-bold font-display text-white mt-2 leading-tight">
                Construyo con propósito,<br />entrego con resultados.
              </h2>
            </div>

            <p className="text-zinc-400 leading-relaxed">
              Soy Diego Paredes, desarrollador Full Stack con más de 8 años de experiencia
              construyendo aplicaciones web y móviles. Trabajo con startups y empresas en
              Latinoamérica para convertir ideas en productos escalables y bien diseñados.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">
                Disponible para proyectos
              </span>
            </div>
          </div>

          {/* Tech stack column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Stack tecnológico</h3>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

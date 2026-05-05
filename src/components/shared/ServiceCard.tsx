import type { LucideProps } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { ServiceItem } from '@/types/service.types';

type IconComponent = React.ComponentType<LucideProps>;

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = (Icons as Record<string, unknown>)[service.icon] as IconComponent | undefined;

  return (
    <div className="group bg-[#111111] border border-white/8 rounded-lg p-6 hover:-translate-y-1 hover:border-cyan-500/20 hover:shadow-[0_0_24px_rgba(6,182,212,0.08)] transition-all duration-200">
      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
        {Icon && <Icon className="h-5 w-5 text-cyan-400" />}
      </div>

      <h3 className="text-white font-semibold mb-2">{service.title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed mb-4">{service.description}</p>
      <p className="text-cyan-400 font-semibold text-sm">
        Desde ${service.priceFrom.toLocaleString('es-EC')}
      </p>
    </div>
  );
}

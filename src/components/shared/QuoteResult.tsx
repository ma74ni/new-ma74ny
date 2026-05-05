import { CheckCircle, Clock, DollarSign, Code } from 'lucide-react';
import { TechBadge } from './TechBadge';
import type { QuoteResult as QuoteResultType } from '@/types/quote.types';

interface QuoteResultProps {
  result: QuoteResultType;
}

export function QuoteResult({ result }: QuoteResultProps) {
  return (
    <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
          <Code className="h-4 w-4 text-cyan-400" />
        </div>
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Tipo de proyecto</p>
          <p className="text-white font-semibold">{result.projectType}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#111111] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-cyan-400" />
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Inversión</span>
          </div>
          <p className="text-white font-bold text-lg">
            ${result.priceRange.min.toLocaleString()} – ${result.priceRange.max.toLocaleString()}
          </p>
          <p className="text-xs text-zinc-600">{result.priceRange.currency}</p>
        </div>

        <div className="bg-[#111111] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Tiempo</span>
          </div>
          <p className="text-white font-bold text-lg">
            {result.estimatedWeeks.min}–{result.estimatedWeeks.max} semanas
          </p>
          <p className="text-xs text-zinc-600">estimado</p>
        </div>
      </div>

      <div>
        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Stack recomendado</p>
        <div className="flex flex-wrap gap-2">
          {result.recommendedStack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Alcance incluido</p>
        <ul className="space-y-2">
          {result.scope.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
              <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-zinc-600 border-t border-white/5 pt-4">{result.disclaimer}</p>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { useQuoter } from '@/hooks/useQuoter';
import { QuoteResult } from '@/components/shared/QuoteResult';
import { Button } from '@/components/ui/button';

const MAX_CHARS = 1000;

export function QuoterSection() {
  const [description, setDescription] = useState('');
  const { state, result, error, cooldownSecs, generateQuote, reset } = useQuoter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim().length >= 20) {
      void generateQuote(description.trim());
    }
  };

  const mins = Math.floor(cooldownSecs / 60);
  const secs = cooldownSecs % 60;
  const cooldownLabel = `${mins}:${String(secs).padStart(2, '0')}`;

  const whatsappMsg = result
    ? encodeURIComponent(
        `Hola Diego, acabo de usar el cotizador y me interesa hablar sobre mi proyecto: ${result.projectType}`,
      )
    : '';
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}?text=${whatsappMsg}`;

  return (
    <section id="quoter" className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Cotizador IA
          </span>
          <h2 className="text-4xl font-bold font-display text-white mt-2">
            Cotiza tu proyecto en segundos
          </h2>
          <p className="text-zinc-400 mt-4">
            Describe tu idea y la IA estimará alcance, stack y precio al instante.
          </p>
        </div>

        {/* Form */}
        {(state === 'idle' || state === 'error') && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Necesito una tienda online para vender productos artesanales, con carrito de compras, pagos con tarjeta y panel de administración para gestionar inventario..."
                rows={6}
                maxLength={MAX_CHARS}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
                aria-label="Descripción del proyecto"
              />
              <span className="absolute bottom-3 right-3 text-xs text-zinc-600 select-none">
                {description.length}/{MAX_CHARS}
              </span>
            </div>

            {state === 'error' && error && (
              <p className="text-sm text-red-400 text-center" role="alert">
                {error.code === 'RATE_LIMITED'
                  ? 'Has alcanzado el límite de cotizaciones. Inténtalo en 1 hora o contáctame directamente.'
                  : error.message}
              </p>
            )}

            {cooldownSecs > 0 && (
              <p className="text-sm text-zinc-500 text-center">
                Podrás generar otra cotización en{' '}
                <span className="text-cyan-400 font-mono">{cooldownLabel}</span>
              </p>
            )}
            <Button
              type="submit"
              disabled={description.trim().length < 20 || cooldownSecs > 0}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full py-3 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generar cotización
            </Button>
          </form>
        )}

        {/* Loading */}
        {state === 'loading' && (
          <div
            className="flex flex-col items-center justify-center py-16 gap-4"
            aria-live="polite"
            aria-busy="true"
          >
            <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
            <p className="text-zinc-400">Analizando tu proyecto...</p>
          </div>
        )}

        {/* Result */}
        {state === 'result' && result && (
          <div className="space-y-6 animate-fade-in-up">
            <QuoteResult result={result} />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-full focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Hablar con Diego
                </a>
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="flex-1 border-white/10 text-zinc-400 hover:text-white rounded-full bg-transparent focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                Nueva cotización
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

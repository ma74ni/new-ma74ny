'use client';

import { useState } from 'react';
import type { QuoteResult, QuoteError } from '@/types/quote.types';

type QuoterState = 'idle' | 'loading' | 'result' | 'error';

export function useQuoter() {
  const [state, setState] = useState<QuoterState>('idle');
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState<QuoteError | null>(null);

  async function generateQuote(description: string) {
    setState('loading');
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      const data = await res.json() as QuoteResult | QuoteError;

      if (!res.ok) {
        setError(data as QuoteError);
        setState('error');
        return;
      }

      setResult(data as QuoteResult);
      setState('result');
    } catch {
      setError({ code: 'UNKNOWN', message: 'Error de conexión. Inténtalo de nuevo.' });
      setState('error');
    }
  }

  function reset() {
    setState('idle');
    setResult(null);
    setError(null);
  }

  return { state, result, error, generateQuote, reset };
}

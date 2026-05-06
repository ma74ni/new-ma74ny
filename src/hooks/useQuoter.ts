'use client';

import { useState, useEffect, useRef } from 'react';
import type { QuoteResult, QuoteError } from '@/types/quote.types';

const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes
const STORAGE_KEY = 'ma74ny_quoter_last';

type QuoterState = 'idle' | 'loading' | 'result' | 'error';

function getRemainingMs(): number {
  if (typeof window === 'undefined') return 0;
  const last = localStorage.getItem(STORAGE_KEY);
  if (!last) return 0;
  return Math.max(0, COOLDOWN_MS - (Date.now() - Number(last)));
}

export function useQuoter() {
  const [state, setState] = useState<QuoterState>('idle');
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState<QuoteError | null>(null);
  const [cooldownSecs, setCooldownSecs] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startCountdown() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const rem = getRemainingMs();
      if (rem <= 0) {
        setCooldownSecs(0);
        clearInterval(timerRef.current!);
      } else {
        setCooldownSecs(Math.ceil(rem / 1000));
      }
    }, 1000);
  }

  useEffect(() => {
    const remaining = getRemainingMs();
    if (remaining > 0) {
      setCooldownSecs(Math.ceil(remaining / 1000));
      startCountdown();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  async function generateQuote(description: string) {
    if (getRemainingMs() > 0) return;

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

      localStorage.setItem(STORAGE_KEY, String(Date.now()));
      setCooldownSecs(Math.ceil(COOLDOWN_MS / 1000));
      startCountdown();

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

  return { state, result, error, cooldownSecs, generateQuote, reset };
}

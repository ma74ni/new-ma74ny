import type { QuoteRequest, QuoteResult } from '@/types/quote.types';

export interface IQuoterService {
  generateQuote(request: QuoteRequest): Promise<QuoteResult>;
}

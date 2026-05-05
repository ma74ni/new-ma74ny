export interface QuoteRequest {
  description: string;
}

export interface QuoteResult {
  projectType: string;
  recommendedStack: string[];
  scope: string[];
  priceRange: {
    min: number;
    max: number;
    currency: 'USD';
  };
  estimatedWeeks: {
    min: number;
    max: number;
  };
  disclaimer: string;
}

export interface QuoteError {
  code: 'RATE_LIMITED' | 'INVALID_INPUT' | 'AI_ERROR' | 'UNKNOWN';
  message: string;
}

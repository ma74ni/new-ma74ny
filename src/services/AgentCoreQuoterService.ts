import type { IQuoterService } from './IQuoterService';
import type { QuoteRequest, QuoteResult } from '@/types/quote.types';

// Replaces AnthropicQuoterService when AgentCore backend is ready.
// Swap by changing QUOTER_PROVIDER env var — zero code changes elsewhere.
export class AgentCoreQuoterService implements IQuoterService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.apiUrl = process.env.AGENTCORE_API_URL ?? '';
    this.apiKey = process.env.AGENTCORE_API_KEY ?? '';
  }

  async generateQuote(request: QuoteRequest): Promise<QuoteResult> {
    const response = await fetch(`${this.apiUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
      body: JSON.stringify({ message: request.description }),
    });

    if (!response.ok) {
      throw new Error(`AgentCore error: ${response.status}`);
    }

    const data = await response.json() as QuoteResult;
    return data;
  }
}

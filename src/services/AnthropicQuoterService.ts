import Anthropic from '@anthropic-ai/sdk';
import type { IQuoterService } from './IQuoterService';
import type { QuoteRequest, QuoteResult } from '@/types/quote.types';
import { PRICING_RANGES } from '@/lib/constants';

export class AnthropicQuoterService implements IQuoterService {
  private readonly client: Anthropic;

  constructor() {
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  async generateQuote(request: QuoteRequest): Promise<QuoteResult> {
    const systemPrompt = `You are a software project estimator for Diego Paredes, a Full Stack Developer based in Ecuador.

Your job is to analyze a project description and return a structured estimate in valid JSON only.
No markdown, no explanation, just the JSON object.
All text fields (projectType, scope items, disclaimer) must be written in Spanish.

Pricing reference (USD):
${JSON.stringify(PRICING_RANGES, null, 2)}

Rules:
- recommendedStack: array of 3–6 technologies
- scope: array of 4–6 specific features included
- priceRange: always in USD, use the pricing reference above
- estimatedWeeks: realistic timeline including design, dev, testing
- projectType: short label (max 6 words)

Return ONLY a valid JSON object matching this exact shape:
{
  "projectType": "string",
  "recommendedStack": ["string"],
  "scope": ["string"],
  "priceRange": { "min": number, "max": number, "currency": "USD" },
  "estimatedWeeks": { "min": number, "max": number },
  "disclaimer": "string"
}`;

    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: request.description }],
    });

    const block = response.content[0];
    const raw = block.type === 'text' ? block.text : '';
    const text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    return JSON.parse(text) as QuoteResult;
  }
}

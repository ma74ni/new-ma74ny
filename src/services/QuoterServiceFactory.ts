import type { IQuoterService } from './IQuoterService';

// OCP: adding a new provider = new file + new case here. No other changes.
export function createQuoterService(): IQuoterService {
  const provider = process.env.QUOTER_PROVIDER ?? 'anthropic';

  switch (provider) {
    case 'agentcore': {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { AgentCoreQuoterService } = require('./AgentCoreQuoterService') as typeof import('./AgentCoreQuoterService');
      return new AgentCoreQuoterService();
    }
    case 'anthropic':
    default: {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { AnthropicQuoterService } = require('./AnthropicQuoterService') as typeof import('./AnthropicQuoterService');
      return new AnthropicQuoterService();
    }
  }
}

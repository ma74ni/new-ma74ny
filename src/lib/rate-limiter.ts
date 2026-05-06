import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let ratelimit: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, '1 h'),
      prefix: 'quoter',
    });
  }
  return ratelimit;
}

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean }> {
  const limiter = getLimiter();
  if (!limiter) return { allowed: true };
  const { success } = await limiter.limit(ip);
  return { allowed: success };
}

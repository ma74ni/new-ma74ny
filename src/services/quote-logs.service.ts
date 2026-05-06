import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function saveQuoteLog(description: string, projectType: string): Promise<void> {
  const entry = JSON.stringify({
    description,
    projectType,
    createdAt: new Date().toISOString(),
  });
  await redis.lpush('quote_logs', entry);
  await redis.ltrim('quote_logs', 0, 499); // keep last 500 entries
}

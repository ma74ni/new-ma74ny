import { NextRequest, NextResponse } from 'next/server';
import { QuoteRequestSchema } from '@/lib/validators';
import { createQuoterService } from '@/services/QuoterServiceFactory';
import { checkRateLimit } from '@/lib/rate-limiter';
import { saveQuoteLog } from '@/services/quote-logs.service';

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for') ??
    req.headers.get('x-real-ip') ??
    'anonymous';

  const { allowed } = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { code: 'RATE_LIMITED', message: 'Too many requests. Please try again in an hour.' },
      { status: 429, headers: { 'Retry-After': '3600' } },
    );
  }

  const body: unknown = await req.json().catch(() => null);
  const parsed = QuoteRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { code: 'INVALID_INPUT', message: parsed.error.errors[0]?.message ?? 'Input inválido.' },
      { status: 400 },
    );
  }

  try {
    const service = createQuoterService();
    const result = await service.generateQuote(parsed.data);
    void saveQuoteLog(parsed.data.description, result.projectType).catch(() => null);
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { code: 'AI_ERROR', message: 'No se pudo generar la cotización. Inténtalo de nuevo.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

# SUPER PROMPT — ma74ny.com Portfolio Website
> Paste this entire document into Bolt, Cursor, or any AI code generation tool.

---

## PROJECT OVERVIEW

Build a professional portfolio and client acquisition website for **Diego Paredes**, a Full Stack Developer & Digital Consultant based in Guayaquil, Ecuador. The site features an **AI-powered project quoter** that estimates cost, stack, and timeline from a plain-text project description.

**Repository:** `https://github.com/ma74ni/new-ma74ny`
**Deploy target:** Netlify (netlify.toml already exists in repo)
**Live domain:** ma74ny.com

---

## TECH STACK

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript (strict mode — `noImplicitAny: true`, `strictNullChecks: true`)
- **Styling:** Tailwind CSS + shadcn/ui components
- **Data:** Firebase Firestore (projects collection)
- **Email:** Resend API (contact form)
- **Analytics:** Vercel Analytics
- **AI:** Anthropic API (`claude-sonnet-4-20250514`) via Next.js API Route — temporary implementation until AgentCore backend is ready

---

## ARCHITECTURE & FOLDER STRUCTURE

Follow Clean Architecture and SOLID principles strictly. Each layer has one responsibility.

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, analytics)
│   ├── page.tsx                  # Single-page composition (imports all sections)
│   ├── robots.ts                 # SEO robots
│   ├── sitemap.ts                # Auto-generated sitemap
│   └── api/
│       ├── quote/
│       │   └── route.ts          # POST /api/quote — AI quoter endpoint
│       └── contact/
│           └── route.ts          # POST /api/contact — email sender
│
├── components/
│   ├── sections/                 # One component per page section (SRP)
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── QuoterSection.tsx     # AI quoter UI
│   │   └── ContactSection.tsx
│   ├── ui/                       # shadcn/ui components (auto-generated, do not modify)
│   └── shared/                   # Reusable presentational components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── TechBadge.tsx
│       ├── ProjectCard.tsx
│       ├── ServiceCard.tsx
│       └── QuoteResult.tsx
│
├── services/                     # Business logic layer (ISP + DIP)
│   ├── IQuoterService.ts         # Interface — never import concrete implementations directly
│   ├── AnthropicQuoterService.ts # Temporary: calls Anthropic API directly
│   ├── AgentCoreQuoterService.ts # Future: calls AgentCore backend (swap with no other changes)
│   ├── QuoterServiceFactory.ts   # Factory — reads env var to pick implementation
│   ├── firebase.ts               # Firebase client initialization
│   └── projects.service.ts       # Firestore queries for projects
│
├── hooks/
│   ├── useProjects.ts            # Fetch + filter projects from Firestore
│   └── useQuoter.ts              # Quoter state machine (idle → loading → result → error)
│
├── types/
│   ├── project.types.ts          # Project, ProjectCategory
│   ├── quote.types.ts            # QuoteRequest, QuoteResult, QuoteError
│   └── service.types.ts          # ServiceItem, PricingTier
│
├── lib/
│   ├── rate-limiter.ts           # IP-based rate limiting for /api/quote
│   ├── validators.ts             # Zod schemas for all API inputs
│   ├── constants.ts              # PRICING_RANGES, TECH_STACK, SOCIAL_LINKS
│   └── utils.ts                  # cn() from shadcn + other pure utilities
│
└── config/
    └── site.config.ts            # All site-wide config: name, description, links, email
```

---

## SOLID PRINCIPLES — MANDATORY

### Single Responsibility (SRP)
- Each section component renders ONE section only. No section imports another section.
- `route.ts` files handle HTTP only — delegate all logic to services.
- `useQuoter.ts` manages state only — does not call APIs directly.

### Open/Closed (OCP)
- `IQuoterService` is the extension point. Adding AgentCore support = new file, zero changes to existing code.
- `ProjectCard` accepts a `Project` prop — extending project fields does not break the card.

### Liskov Substitution (LSP)
- `AnthropicQuoterService` and `AgentCoreQuoterService` must be interchangeable. Both implement `IQuoterService` exactly.

### Interface Segregation (ISP)
- `IQuoterService` has exactly ONE method: `generateQuote(request: QuoteRequest): Promise<QuoteResult>`
- Do not bloat interfaces. If a new capability is needed, create a new interface.

### Dependency Inversion (DIP)
- Components depend on hooks. Hooks depend on service interfaces. Never import a concrete service in a component.
- `QuoterSection` → `useQuoter` hook → `IQuoterService` → `AnthropicQuoterService` (resolved by factory).

---

## SERVICE LAYER — AI QUOTER

### `types/quote.types.ts`
```typescript
export interface QuoteRequest {
  description: string; // User's plain-text project description
}

export interface QuoteResult {
  projectType: string;           // e.g., "Web App with Admin Panel"
  recommendedStack: string[];    // e.g., ["Next.js", "PostgreSQL", "Stripe"]
  scope: string[];               // 4–6 bullet points of included features
  priceRange: {
    min: number;
    max: number;
    currency: 'USD';
  };
  estimatedWeeks: {
    min: number;
    max: number;
  };
  disclaimer: string;            // "This is an estimate. Final price depends on detailed requirements."
}

export interface QuoteError {
  code: 'RATE_LIMITED' | 'INVALID_INPUT' | 'AI_ERROR' | 'UNKNOWN';
  message: string;
}
```

### `services/IQuoterService.ts`
```typescript
import type { QuoteRequest, QuoteResult } from '@/types/quote.types';

export interface IQuoterService {
  generateQuote(request: QuoteRequest): Promise<QuoteResult>;
}
```

### `services/AnthropicQuoterService.ts`
```typescript
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
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: request.description }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return JSON.parse(text) as QuoteResult;
  }
}
```

### `services/AgentCoreQuoterService.ts` (future — do not wire up yet, just scaffold)
```typescript
import type { IQuoterService } from './IQuoterService';
import type { QuoteRequest, QuoteResult } from '@/types/quote.types';

// This service will replace AnthropicQuoterService when AgentCore backend is ready.
// It calls the AgentCore public Chat endpoint using an API Key.
// Swap is done by changing QUOTER_PROVIDER env var — zero code changes elsewhere.
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

    const data = await response.json();
    return data as QuoteResult;
  }
}
```

### `services/QuoterServiceFactory.ts`
```typescript
import type { IQuoterService } from './IQuoterService';

// OCP: adding a new provider = add a case here + new service file. No other changes.
export function createQuoterService(): IQuoterService {
  const provider = process.env.QUOTER_PROVIDER ?? 'anthropic';

  switch (provider) {
    case 'agentcore': {
      const { AgentCoreQuoterService } = require('./AgentCoreQuoterService');
      return new AgentCoreQuoterService();
    }
    case 'anthropic':
    default: {
      const { AnthropicQuoterService } = require('./AnthropicQuoterService');
      return new AnthropicQuoterService();
    }
  }
}
```

---

## API ROUTES — SECURITY FIRST

### `app/api/quote/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createQuoterService } from '@/services/QuoterServiceFactory';
import { checkRateLimit } from '@/lib/rate-limiter';

const QuoteRequestSchema = z.object({
  description: z
    .string()
    .min(20, 'Please describe your project in at least 20 characters.')
    .max(1000, 'Description must be under 1000 characters.')
    .trim(),
});

export async function POST(req: NextRequest) {
  // 1. Rate limiting — max 3 requests per IP per hour
  const ip = req.headers.get('x-forwarded-for') ?? req.ip ?? 'anonymous';
  const rateLimitResult = await checkRateLimit(ip);
  
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { code: 'RATE_LIMITED', message: 'Too many requests. Please try again in an hour.' },
      { status: 429, headers: { 'Retry-After': '3600' } }
    );
  }

  // 2. Input validation
  const body = await req.json().catch(() => null);
  const parsed = QuoteRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { code: 'INVALID_INPUT', message: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  // 3. Business logic via service (DIP)
  try {
    const service = createQuoterService();
    const result = await service.generateQuote(parsed.data);
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { code: 'AI_ERROR', message: 'Could not generate quote. Please try again.' },
      { status: 500 }
    );
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
```

### `app/api/contact/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const ContactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  message: z.string().min(10).max(2000).trim(),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  await resend.emails.send({
    from: 'contact@ma74ny.com',
    to: 'ma74ny@gmail.com',
    subject: `New contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  return NextResponse.json({ message: 'Message sent successfully.' }, { status: 200 });
}
```

---

## SECURITY CONFIGURATION

### `next.config.ts`
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://firebasestorage.googleapis.com",
              "connect-src 'self' https://*.googleapis.com https://*.anthropic.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
```

### Environment variables — `.env.local` (never commit this file)
```bash
# AI Provider (switch to 'agentcore' when backend is ready)
QUOTER_PROVIDER=anthropic

# Anthropic — temporary
ANTHROPIC_API_KEY=sk-ant-...

# AgentCore — future (scaffold now, leave empty)
AGENTCORE_API_URL=
AGENTCORE_API_KEY=

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

# Email
RESEND_API_KEY=

# Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=+593XXXXXXXXX
NEXT_PUBLIC_EMAIL=ma74ny@gmail.com
```

---

## CONSTANTS — `lib/constants.ts`

```typescript
export const PRICING_RANGES = {
  landing_page:       { min: 500,   max: 800,   label: 'Landing Page' },
  corporate_website:  { min: 1200,  max: 2000,  label: 'Corporate Website' },
  ecommerce:          { min: 2000,  max: 4000,  label: 'E-commerce' },
  web_app:            { min: 3500,  max: 8000,  label: 'Custom Web App' },
  mobile_app:         { min: 5000,  max: 12000, label: 'Mobile App (React Native)' },
  saas:               { min: 8000,  max: 20000, label: 'SaaS / Platform' },
  maintenance:        { min: 150,   max: 400,   label: 'Monthly Maintenance', unit: '/mo' },
} as const;

export const TECH_STACK = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS',
  'React Native', 'PostgreSQL', 'Firebase', 'Prisma',
  'Tailwind CSS', 'Anthropic API', 'Stripe', 'Docker',
] as const;

export const SERVICES = [
  {
    id: 'landing',
    title: 'Landing Page',
    description: 'Conversión optimizada, diseño a medida, SEO básico incluido.',
    priceFrom: 500,
    icon: 'Globe',
  },
  {
    id: 'webapp',
    title: 'Aplicación Web',
    description: 'Sistemas a medida con panel de administración, autenticación y APIs.',
    priceFrom: 3500,
    icon: 'Monitor',
  },
  {
    id: 'mobile',
    title: 'App Móvil',
    description: 'iOS y Android con React Native. Un solo código, dos plataformas.',
    priceFrom: 5000,
    icon: 'Smartphone',
  },
  {
    id: 'saas',
    title: 'SaaS / Plataforma',
    description: 'Arquitectura multi-tenant, suscripciones, integraciones y escalabilidad.',
    priceFrom: 8000,
    icon: 'Server',
  },
  {
    id: 'ai',
    title: 'Integración de IA',
    description: 'Agentes, chatbots y automatizaciones con Anthropic Claude API.',
    priceFrom: 1500,
    icon: 'Bot',
  },
  {
    id: 'maintenance',
    title: 'Mantenimiento',
    description: 'Soporte mensual, actualizaciones, monitoreo y mejoras continuas.',
    priceFrom: 150,
    icon: 'Wrench',
  },
] as const;

export const SOCIAL_LINKS = {
  github:   'https://github.com/ma74ni',
  linkedin: 'https://linkedin.com/in/ma74ni',
  upwork:   'https://upwork.com/freelancers/ma74ni',
  whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
  email:    `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
} as const;
```

---

## PAGE SECTIONS

Build the page as a single `app/page.tsx` that composes all sections in order:

```tsx
// app/page.tsx
import { HeroSection }     from '@/components/sections/HeroSection';
import { AboutSection }    from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { QuoterSection }   from '@/components/sections/QuoterSection';
import { ContactSection }  from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <QuoterSection />
      <ContactSection />
    </main>
  );
}
```

### Section specs:

**HeroSection**
- Full-height section with typing animation cycling through: "Full Stack Developer", "Consultor Digital", "Especialista en IA"
- Name: Diego Paredes
- Tagline: "Convierto ideas en productos digitales reales."
- Two CTAs: "Ver proyectos" (scroll to #projects) and "Cotizar proyecto" (scroll to #quoter) — both as anchor links, no JS navigation
- Social links: GitHub, LinkedIn, Upwork, WhatsApp
- Subtle grid or noise background texture — dark theme

**AboutSection**
- Two-column layout (text + tech stack)
- Short bio paragraph (2–3 lines, write placeholder, I'll fill it in)
- Stats grid: years of experience, projects delivered, countries served
- Tech stack as visual badges using `TechBadge` component
- "Disponible para proyectos" green availability badge

**ProjectsSection** (id="projects")
- Fetch projects from Firebase Firestore collection `projects` using `useProjects` hook
- Fields per project: `id`, `title`, `description`, `stack: string[]`, `category`, `url?`, `imageUrl?`, `featured: boolean`
- Category filter tabs: All, Web, Mobile, SaaS, IA
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- ProjectCard: image (with Next.js `Image`), title, 2-line description, stack badges, optional "Ver proyecto" link
- Show skeleton loading state while Firestore loads
- Empty state message if no projects

**ServicesSection**
- Grid of `ServiceCard` components from `SERVICES` constant
- Each card: icon (lucide-react), title, description, "Desde $X" price
- Hover: subtle scale + border glow animation
- CTA at bottom: "¿No encuentras lo que necesitas? Cuéntame tu proyecto →" → scrolls to quoter

**QuoterSection** (id="quoter")
- Large heading: "Cotiza tu proyecto en segundos"
- Subheading: "Describe tu idea y la IA estimará alcance, stack y precio al instante."
- Textarea (min 20, max 1000 chars) with character counter
- Submit button: "Generar cotización" with spinner during loading
- Results: animated fade-in card showing all `QuoteResult` fields in a clean layout
- After result: CTA "Hablar con Diego" → opens WhatsApp with pre-filled message: `Hola Diego, acabo de usar el cotizador y me interesa hablar sobre mi proyecto: [projectType]`
- Error states: show human-readable messages for each error code
- Rate limit message: "Has alcanzado el límite de cotizaciones. Inténtalo en 1 hora o contáctame directamente."

**ContactSection** (id="contact")
- Simple form: name, email, message
- Form validation with react-hook-form + Zod (client-side mirrors server-side schema)
- Success toast on send
- Direct links below form: WhatsApp, email, LinkedIn, Upwork
- "Respondo en menos de 24 horas" availability note

---

## UX/UI REQUIREMENTS

- **Mobile-first** — every section looks correct at 375px before adding tablet/desktop styles
- **Keyboard navigation** — all interactive elements reachable and operable via keyboard
- **Focus styles** — visible focus rings on all focusable elements (do not suppress `outline`)
- **Color contrast** — all text meets WCAG AA (4.5:1 for body, 3:1 for large text)
- **Loading states** — every async operation shows a skeleton or spinner, never a blank space
- **Error states** — every form and async call has a visible, actionable error message
- **Smooth scrolling** — `scroll-behavior: smooth` in global CSS, navbar links use anchor IDs
- **Scroll-to-top** — floating button appears after scrolling 500px
- **Reduced motion** — wrap all animations in `@media (prefers-reduced-motion: no-preference)`
- **aria-labels** — all icon-only buttons have `aria-label`
- **No layout shift** — images use explicit width/height or aspect-ratio containers

---

## DESIGN SYSTEM

### Theme: Dark + Neon Cyan
- Background: `#0a0a0a` (primary), `#111111` (cards), `#1a1a1a` (elevated)
- Foreground: `#ffffff` (primary), `#a1a1aa` (muted), `#71717a` (subtle)
- Accent: `#06b6d4` (cyan-500) — used for highlights, CTAs, glows
- Success: `#22c55e` — used for availability badge
- Border: `rgba(255,255,255,0.08)` default, `rgba(6,182,212,0.3)` hover/focus
- All colors as CSS custom properties in `globals.css`

### Typography
- Display/headings: `Space Grotesk` (Google Fonts) — bold, technical feel
- Body: `DM Sans` — readable, clean
- Monospace (code snippets in quote result): `JetBrains Mono`

### Spacing scale: 4px base (Tailwind defaults work)
### Border radius: `rounded-lg` (8px) for cards, `rounded-full` for badges and buttons

### Animations (CSS only where possible)
- Page load: staggered fade-in-up for hero elements (0ms, 100ms, 200ms, 300ms delays)
- Typing effect in hero: CSS with `@keyframes` or a tiny JS implementation
- Scroll reveal: `IntersectionObserver` with CSS transitions (no heavy libraries)
- Card hover: `transform: translateY(-4px)` + `transition: 0.2s ease`
- Quoter result: fade-in-up on appearance

---

## SEO & METADATA

### `app/layout.tsx` metadata:
```typescript
export const metadata: Metadata = {
  title: 'Diego Paredes — Desarrollador Full Stack & Consultor Digital | Ecuador',
  description: 'Desarrollo de aplicaciones web y móviles a medida. Especialista en React, Next.js y soluciones con IA. Desde $500. Guayaquil, Ecuador.',
  keywords: ['desarrollador web Ecuador', 'freelance React Next.js', 'app móvil Guayaquil', 'desarrollo software IA', 'full stack developer Ecuador'],
  authors: [{ name: 'Diego Paredes', url: 'https://ma74ny.com' }],
  openGraph: {
    title: 'Diego Paredes — Desarrollador Full Stack',
    description: 'Convierto ideas en productos digitales reales. Cotiza tu proyecto ahora.',
    url: 'https://ma74ny.com',
    siteName: 'ma74ny.com',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diego Paredes — Full Stack Developer',
    description: 'Custom web and mobile development. AI-powered quoter available.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://ma74ny.com'),
};
```

---

## FIREBASE SETUP — `services/firebase.ts`

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:        process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:     process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
```

Firestore collection `projects` — each document:
```json
{
  "title": "string",
  "description": "string",
  "stack": ["string"],
  "category": "web | mobile | saas | ai",
  "url": "string | null",
  "imageUrl": "string | null",
  "featured": "boolean",
  "order": "number"
}
```

---

## RATE LIMITER — `lib/rate-limiter.ts`

Use an in-memory Map for development. In production, swap for Redis or Upstash.

```typescript
const requests = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3;

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requests.get(ip);

  if (!record || now > record.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}
```

---

## NETLIFY CONFIGURATION

Ensure `netlify.toml` at repo root contains:
```toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
  PNPM_VERSION = "9"
```

All environment variables must be set in Netlify dashboard under Site Settings → Environment Variables.

---

## CODE QUALITY RULES

- No `any` in TypeScript — use `unknown` with type narrowing
- No `console.log` — use `console.error` only in error boundaries and catch blocks
- All async functions wrapped in try/catch with typed errors
- No magic strings — use constants or enums
- Every exported function and interface has a JSDoc comment
- Imports sorted: external → internal → relative (use `@/` alias for `src/`)
- No inline styles — use Tailwind classes only
- No `!important` in CSS
- All user-facing text in Spanish except code identifiers
- Conventional commits for git messages (feat:, fix:, chore:, etc.)

---

## DELIVERABLES CHECKLIST

- [ ] All 6 sections rendered and responsive
- [ ] AI quoter working end-to-end (textarea → API → result card)
- [ ] Firebase projects loading with skeleton and filter
- [ ] Contact form sending email via Resend
- [ ] Security headers present in all responses
- [ ] `IQuoterService` interface + both implementations scaffolded
- [ ] `QUOTER_PROVIDER` env var switches between implementations
- [ ] Rate limiting on `/api/quote`
- [ ] Input validation (Zod) on both API routes
- [ ] SEO metadata complete
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No ESLint errors
- [ ] Netlify build succeeds
- [ ] All environment variables documented in `.env.example`

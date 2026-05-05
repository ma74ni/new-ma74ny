# ma74ny.com — Portfolio & Cotizador IA

Sitio web profesional de **Diego Paredes**, Full Stack Developer & Consultor Digital basado en Guayaquil, Ecuador. Incluye un cotizador de proyectos impulsado por la API de Anthropic.

**Live:** [ma74ny.com](https://ma74ny.com) · **Deploy:** Netlify

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript (modo strict) |
| Estilos | Tailwind CSS + shadcn/ui |
| Base de datos | Firebase Firestore |
| Email | Resend API |
| IA | Anthropic API (`claude-sonnet-4-20250514`) |
| Package manager | pnpm |

---

## Inicio rápido

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# → Editar .env.local con tus claves

# 3. Servidor de desarrollo
pnpm dev
# Abre http://localhost:9002
```

---

## Variables de entorno

Copia `.env.example` a `.env.local` y completa cada valor:

| Variable | Descripción |
|---|---|
| `ANTHROPIC_API_KEY` | Clave de la API de Anthropic |
| `QUOTER_PROVIDER` | `anthropic` (default) o `agentcore` |
| `RESEND_API_KEY` | Clave de Resend para envío de emails |
| `NEXT_PUBLIC_FIREBASE_*` | Credenciales del proyecto Firebase |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número con código de país, ej. `+593XXXXXXXXX` |
| `NEXT_PUBLIC_EMAIL` | Email de contacto público |
| `AGENTCORE_API_URL` / `AGENTCORE_API_KEY` | Futuro backend AgentCore (dejar vacíos) |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── api/quote/route.ts      # POST — cotizador IA (rate-limited)
│   ├── api/contact/route.ts    # POST — formulario de contacto
│   ├── layout.tsx              # Fonts, metadata, SEO
│   ├── page.tsx                # Composición de secciones
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── sections/               # HeroSection, AboutSection, ProjectsSection...
│   ├── shared/                 # Navbar, Footer, TechBadge, ProjectCard...
│   └── ui/                     # shadcn/ui (no modificar)
├── services/                   # Capa de negocio (SOLID)
│   ├── IQuoterService.ts       # Interfaz del cotizador
│   ├── AnthropicQuoterService.ts
│   ├── AgentCoreQuoterService.ts
│   └── QuoterServiceFactory.ts # Lee QUOTER_PROVIDER para elegir implementación
├── hooks/                      # useProjects, useQuoter
├── types/                      # project.types, quote.types, service.types
├── lib/                        # constants, validators (Zod), rate-limiter
└── config/site.config.ts
```

---

## Scripts

```bash
pnpm dev          # Servidor de desarrollo (puerto 9002)
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

---

## Firebase — colección `projects`

Cada documento en la colección `projects` de Firestore debe tener esta estructura:

```json
{
  "title": "Nombre del proyecto",
  "description": "Descripción breve",
  "stack": ["Next.js", "Firebase"],
  "category": "web | mobile | saas | ai",
  "url": "https://...",
  "imageUrl": "https://...",
  "featured": true,
  "order": 1
}
```

---

## Cambiar proveedor del cotizador

El cotizador usa la **Interfaz `IQuoterService`** — cambiar de Anthropic a AgentCore no requiere tocar ningún componente:

```bash
# .env.local
QUOTER_PROVIDER=agentcore
AGENTCORE_API_URL=https://tu-backend.com
AGENTCORE_API_KEY=tu-clave
```

---

## Deploy — Netlify

Todas las variables de entorno deben configurarse en **Netlify → Site Settings → Environment Variables**. El `netlify.toml` en la raíz gestiona el build y el plugin de Next.js.

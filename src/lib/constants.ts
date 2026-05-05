export const PRICING_RANGES = {
  landing_page:      { min: 500,   max: 800,   label: 'Landing Page' },
  corporate_website: { min: 1200,  max: 2000,  label: 'Corporate Website' },
  ecommerce:         { min: 2000,  max: 4000,  label: 'E-commerce' },
  web_app:           { min: 3500,  max: 8000,  label: 'Custom Web App' },
  mobile_app:        { min: 5000,  max: 12000, label: 'Mobile App (React Native)' },
  saas:              { min: 8000,  max: 20000, label: 'SaaS / Platform' },
  maintenance:       { min: 150,   max: 400,   label: 'Monthly Maintenance', unit: '/mo' },
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
  whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}`,
  email:    `mailto:${process.env.NEXT_PUBLIC_EMAIL ?? 'ma74ny@gmail.com'}`,
} as const;

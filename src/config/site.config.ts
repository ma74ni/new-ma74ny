export const siteConfig = {
  name: 'Diego Paredes',
  title: 'Diego Paredes — Desarrollador Full Stack & Consultor Digital | Ecuador',
  description:
    'Desarrollo de aplicaciones web y móviles a medida. Especialista en React, Next.js y soluciones con IA. Desde $500. Guayaquil, Ecuador.',
  url: 'https://ma74ny.com',
  locale: 'es_EC',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'ma74ny@gmail.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
  social: {
    github:   'https://github.com/ma74ni',
    linkedin: 'https://linkedin.com/in/ma74ni',
    upwork:   'https://upwork.com/freelancers/ma74ni',
  },
} as const;

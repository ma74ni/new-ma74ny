import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Navbar }      from '@/components/shared/Navbar';
import { Footer }      from '@/components/shared/Footer';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { Toaster }     from '@/components/ui/toaster';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets:  ['latin'],
  variable: '--font-display',
  display:  'swap',
});

const dmSans = DM_Sans({
  subsets:  ['latin'],
  variable: '--font-body',
  display:  'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-code',
  display:  'swap',
});

export const metadata: Metadata = {
  title: 'Diego Paredes — Desarrollador Full Stack & Consultor Digital | Ecuador',
  description:
    'Desarrollo de aplicaciones web y móviles a medida. Especialista en React, Next.js y soluciones con IA. Desde $500. Guayaquil, Ecuador.',
  keywords: [
    'desarrollador web Ecuador',
    'freelance React Next.js',
    'app móvil Guayaquil',
    'desarrollo software IA',
    'full stack developer Ecuador',
  ],
  authors: [{ name: 'Diego Paredes', url: 'https://ma74ny.com' }],
  openGraph: {
    title:       'Diego Paredes — Desarrollador Full Stack',
    description: 'Convierto ideas en productos digitales reales. Cotiza tu proyecto ahora.',
    url:         'https://ma74ny.com',
    siteName:    'ma74ny.com',
    locale:      'es_EC',
    type:        'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Diego Paredes — Full Stack Developer',
    description: 'Custom web and mobile development. AI-powered quoter available.',
  },
  robots:       { index: true, follow: true },
  metadataBase: new URL('https://ma74ny.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        spaceGrotesk.variable,
        dmSans.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="font-body antialiased bg-background text-foreground">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}

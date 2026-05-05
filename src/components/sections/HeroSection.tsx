'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, MessageCircle, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SOCIAL_LINKS } from '@/lib/constants';

const ROLES = ['Full Stack Developer', 'Consultor Digital', 'Especialista en IA'];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Gradient fade bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
      {/* Cyan glow center */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-28 max-w-5xl">
        {/* Availability badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Disponible para proyectos
          </span>
        </div>

        {/* Main heading */}
        <div className="text-center space-y-6">
          <h1
            className="text-5xl md:text-7xl font-bold font-display text-white leading-tight"
            style={{ animationDelay: '0ms' }}
          >
            Diego Paredes
          </h1>

          {/* Typing animation */}
          <div className="h-10 md:h-14 flex items-center justify-center">
            <span
              aria-live="polite"
              className={`text-xl md:text-3xl font-semibold text-cyan-400 transition-all duration-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
            >
              {ROLES[roleIndex]}
            </span>
          </div>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Convierto ideas en productos digitales reales.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button
            asChild
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full px-8 focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <a href="#projects">
              Ver proyectos
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 rounded-full px-8 bg-transparent focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <a href="#quoter">Cotizar proyecto</a>
          </Button>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL_LINKS.upwork}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Upwork"
            className="p-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <Briefcase className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="p-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

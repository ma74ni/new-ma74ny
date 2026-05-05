'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MessageCircle, Linkedin, Briefcase } from 'lucide-react';
import { ContactSchema, type ContactInput } from '@/lib/validators';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SOCIAL_LINKS } from '@/lib/constants';

const DIRECT_LINKS = [
  {
    href: SOCIAL_LINKS.whatsapp,
    icon: MessageCircle,
    label: 'WhatsApp',
    sub: 'Respuesta rápida',
    external: true,
  },
  {
    href: SOCIAL_LINKS.email,
    icon: Mail,
    label: 'ma74ny@gmail.com',
    sub: 'Email directo',
    external: false,
  },
  {
    href: SOCIAL_LINKS.linkedin,
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'Perfil profesional',
    external: true,
  },
  {
    href: SOCIAL_LINKS.upwork,
    icon: Briefcase,
    label: 'Upwork',
    sub: 'Freelance platform',
    external: true,
  },
] as const;

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast({
        title: 'Mensaje enviado',
        description: 'Te responderé en menos de 24 horas.',
      });
      reset();
    } catch {
      toast({
        title: 'Error al enviar',
        description: 'Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Contacto
          </span>
          <h2 className="text-4xl font-bold font-display text-white mt-2">
            Hablemos de tu proyecto
          </h2>
          <p className="text-zinc-400 mt-4">Respondo en menos de 24 horas.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-zinc-300">
                Nombre
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Tu nombre"
                className="bg-[#111111] border-white/10 text-white placeholder:text-zinc-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
              />
              {errors.name && (
                <p className="text-xs text-red-400" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="tu@email.com"
                className="bg-[#111111] border-white/10 text-white placeholder:text-zinc-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
              />
              {errors.email && (
                <p className="text-xs text-red-400" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-zinc-300">
                Mensaje
              </Label>
              <Textarea
                id="message"
                {...register('message')}
                placeholder="Cuéntame sobre tu proyecto..."
                rows={5}
                className="bg-[#111111] border-white/10 text-white placeholder:text-zinc-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 resize-none"
              />
              {errors.message && (
                <p className="text-xs text-red-400" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </Button>
          </form>

          {/* Direct links */}
          <div className="space-y-4">
            <p className="text-zinc-400">También puedes contactarme directamente:</p>
            <div className="space-y-3">
              {DIRECT_LINKS.map(({ href, icon: Icon, label, sub, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 p-4 rounded-lg border border-white/8 text-zinc-300 hover:border-cyan-500/30 hover:text-cyan-400 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <Icon className="h-5 w-5 flex-shrink-0 group-hover:text-cyan-400" />
                  <div>
                    <div className="font-medium text-sm">{label}</div>
                    <div className="text-xs text-zinc-500">{sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

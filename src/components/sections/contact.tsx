import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-3xl px-4 text-center md:px-6">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            📞 Contacto
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            ¿Tienes una idea o proyecto en mente? 🚀 Hablemos y construyamos tu
            próxima solución digital.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="mailto:diegoparedes.dev@gmail.com">
                <Mail className="mr-2 h-4 w-4" /> Escríbeme ahora
              </a>
            </Button>
            <div className="flex items-center gap-2">
               <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/ma74ni" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                </a>
               </Button>
                <Button variant="outline" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                </a>
                </Button>
            </div>
          </div>
           <p className="text-sm text-muted-foreground">
            Email: diegoparedes.dev@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}

import { Button } from '@/components/ui/button';
import { ArrowDown, MessageCircle } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
      <div className="container mx-auto px-4 text-center md:px-6">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Diego Paredes – Desarrollador de Software Fullstack
          </h1>
          <h2 className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Construyo aplicaciones modernas, escalables y seguras con React,
            NodeJS, Laravel y más.
          </h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#projects">
                <ArrowDown className="mr-2 h-5 w-5" /> Ver mis proyectos
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">
                <MessageCircle className="mr-2 h-5 w-5" /> Contáctame
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

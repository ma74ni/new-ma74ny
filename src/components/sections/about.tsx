import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const strengths = [
  'Desarrollo web y móvil con React, React Native, Vue, Laravel, NodeJS y WordPress.',
  'Integración de bases de datos SQL y NoSQL (MySQL, Firebase).',
  'Creación de aplicaciones optimizadas para rendimiento, escalabilidad y SEO.',
  'Experiencia en proyectos corporativos, fintech, marketing y software a medida.',
];

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto grid max-w-5xl items-center gap-8 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            👨‍💻 Sobre mí
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Soy Diego Paredes, Tecnólogo en Administración de Sistemas
            Informáticos con más de 8 años de experiencia como Desarrollador de
            Software. He trabajado en proyectos para empresas como Red de
            Instituciones Financieras de Desarrollo y PubliPromueve, y
            actualmente me desempeño como Freelance Software Developer ayudando a
            startups, negocios y equipos a transformar sus ideas en soluciones
            digitales.
          </p>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Mis fortalezas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

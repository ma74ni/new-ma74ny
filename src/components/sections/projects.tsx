import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    title: '🌤️ Aplicación de Clima',
    description: 'Aplicación web y backend para consultar información meteorológica en tiempo real.',
    technologies: ['React', 'NodeJS', 'API REST', 'MySQL'],
    backendRepo: 'https://github.com/ma74ni',
    frontendRepo: 'https://github.com/ma74ni',
    image: PlaceHolderImages.find(img => img.id === 'climate-app'),
  },
];

export function Projects() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          📂 Proyectos Destacados
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 w-full md:h-auto">
                    {project.image && (
                        <Image
                            src={project.image.imageUrl}
                            alt={project.image.description}
                            fill
                            className="object-cover"
                            data-ai-hint={project.image.imageHint}
                        />
                    )}
                </div>
                <div className="flex flex-col p-6">
                  <CardHeader>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Tecnologías:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <Button asChild variant="outline">
                      <a href={project.backendRepo} target="_blank" rel="noopener noreferrer">
                        <Code className="mr-2 h-4 w-4" /> Repositorio Backend
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={project.frontendRepo} target="_blank" rel="noopener noreferrer">
                        <Code className="mr-2 h-4 w-4" /> Repositorio Frontend
                      </a>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

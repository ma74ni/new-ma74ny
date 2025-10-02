import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: 'Freelance Software Developer',
    company: 'Actualidad',
    description: 'Desarrollo de aplicaciones web y móviles para clientes de diversos sectores.',
  },
  {
    role: 'Desarrollador de Software',
    company: 'Red de Instituciones Financieras de Desarrollo (RFD)',
    description: 'Desarrollo de herramientas digitales para el sector financiero.',
  },
  {
    role: 'Desarrollador de Software',
    company: 'PubliPromueve',
    description: 'Implementación de soluciones tecnológicas para campañas de marketing y gestión de clientes.',
  },
];

export function Experience() {
  return (
    <section id="experience" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          🌍 Experiencia Profesional
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`mb-8 flex items-center w-full ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                }`}
              >
                <div
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className="hidden md:block absolute bg-primary p-2 rounded-full z-10">
                    <Briefcase className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div
                    className={`p-6 rounded-lg shadow-md bg-card w-full max-w-md ${
                      index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                    }`}
                  >
                    <p className="text-sm font-semibold text-primary">{exp.company}</p>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

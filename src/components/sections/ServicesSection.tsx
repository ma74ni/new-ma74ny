import { ServiceCard } from '@/components/shared/ServiceCard';
import { SERVICES } from '@/lib/constants';

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Servicios
          </span>
          <h2 className="text-4xl font-bold font-display text-white mt-2">
            ¿En qué puedo ayudarte?
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Soluciones digitales a medida desde el diseño hasta el deploy.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <p className="text-center text-zinc-400 mt-12">
          ¿No encuentras lo que necesitas? Cuéntame tu proyecto{' '}
          <a
            href="#quoter"
            className="text-cyan-400 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
          >
            →
          </a>
        </p>
      </div>
    </section>
  );
}

import { useState } from 'react';
import ServiceCard from './ServiceCard';
import ComingSoonModal from './ComingSoonModal';
import Aurora from './Aurora';
import { SERVICES, type Service } from '@/data/services';

type Props = {
  onOpenInstitute: () => void;
};

export default function Services({ onOpenInstitute }: Props) {
  const [soon, setSoon] = useState<Service | null>(null);

  const handleClick = (service: Service) => {
    if (service.available) onOpenInstitute();
    else setSoon(service);
  };

  return (
    <section id="services" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Aurora Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Aurora
          colorStops={["#0A0A0A", "#3D7A00", "#76F500"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.6}
        />
      </div>

      <div className="absolute top-1/3 right-0 w-80 h-80 bg-vortex-green/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="reveal text-vortex-green font-mono text-xs tracking-[0.3em] uppercase mb-5">
            // What We Do
          </p>
          <h2 className="reveal font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
            Main <span className="text-vortex-green text-glow">Services</span>
          </h2>
          <p className="reveal mt-6 text-lg text-vortex-gray/70" data-reveal-delay="100">
            Six verticals engineered around AI — from education and software to
            robotics, automation, and startup incubation.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>

      <ComingSoonModal
        title={soon?.title ?? ''}
        open={soon !== null}
        onClose={() => setSoon(null)}
      />
    </section>
  );
}

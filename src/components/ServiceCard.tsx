import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/data/services';

type Props = {
  service: Service;
  index: number;
  onClick: (service: Service) => void;
};

export default function ServiceCard({ service, index, onClick }: Props) {
  const Icon = service.icon;
  return (
    <button
      onClick={() => onClick(service)}
      className="reveal group relative text-left h-full w-full overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-2 hover:border-vortex-green/40 hover:shadow-glow"
      data-reveal-delay={(index % 3) * 100}
      aria-label={`${service.title} — ${service.available ? 'View programs' : 'Coming soon'}`}
    >
      {/* Low opacity background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 transition-all duration-500 group-hover:opacity-25 group-hover:scale-105 pointer-events-none" 
        style={{ backgroundImage: `url(${service.bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-vortex-black/90 via-vortex-black/60 to-vortex-black/40 pointer-events-none" />

      {/* hover gradient sweep */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-vortex-green/10 via-transparent to-transparent pointer-events-none" />

      {/* status dot */}
      <div className="absolute top-6 right-6 flex items-center gap-1.5">
        <span
          className={`w-2 h-2 rounded-full ${
            service.available ? 'bg-vortex-green shadow-glow-sm animate-pulse' : 'bg-vortex-gray/30'
          }`}
        />
        <span className="text-[10px] font-mono uppercase tracking-wider text-vortex-gray/50">
          {service.available ? 'Live' : 'Soon'}
        </span>
      </div>

      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-vortex-green/10 border border-vortex-green/20 grid place-items-center transition-all duration-500 group-hover:bg-vortex-green/20 group-hover:scale-110 group-hover:rotate-6">
          <Icon className="w-7 h-7 text-vortex-green" strokeWidth={1.5} />
        </div>

        <h3 className="mt-6 font-display font-semibold text-white text-xl leading-snug">
          {service.title}
        </h3>
        <p className="mt-3 text-sm text-vortex-gray/70 leading-relaxed">
          {service.description}
        </p>

        <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-vortex-green">
          {service.available ? 'View Programs' : 'Coming Soon'}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </button>
  );
}

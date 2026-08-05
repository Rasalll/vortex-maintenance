import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check } from 'lucide-react';
import ComingSoonModal from './ComingSoonModal';
import Aurora from './Aurora';
import { SERVICES, type Service } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onOpenInstitute: () => void;
};

export default function Services({ onOpenInstitute }: Props) {
  const [soon, setSoon] = useState<Service | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleClick = (service: Service) => {
    if (service.available) onOpenInstitute();
    else setSoon(service);
  };

  // Scroll-triggered row animations — play once only
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade up
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            }
          }
        );
      }

      // Row 1 — slides in from LEFT, staggered
      if (row1Ref.current) {
        const cards = row1Ref.current.querySelectorAll<HTMLElement>('.service-card');
        gsap.fromTo(cards,
          { opacity: 0, x: -80 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row1Ref.current,
              start: 'top 80%',
              once: true,
            }
          }
        );
      }

      // Row 2 — slides in from RIGHT, staggered
      if (row2Ref.current) {
        const cards = row2Ref.current.querySelectorAll<HTMLElement>('.service-card');
        gsap.fromTo(cards,
          { opacity: 0, x: 80 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row2Ref.current,
              start: 'top 80%',
              once: true,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1 = SERVICES.slice(0, 3);
  const row2 = SERVICES.slice(3, 6);

  return (
    <section id="services" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <Aurora
          colorStops={["#0A0A0A", "#4C1D95", "#8B5CF6"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Floating ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-vortex-purple/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-vortex-purple/4 blur-[140px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20" style={{ opacity: 0 }}>
          <p className="text-vortex-purple font-mono text-xs tracking-[0.3em] uppercase mb-5">
            // What We Do
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
            Main <span className="text-vortex-purple text-glow">Services</span>
          </h2>
          <p className="mt-6 text-lg text-vortex-gray/70">
            Six verticals engineered around AI — from education and software to
            robotics, automation, and startup incubation.
          </p>
        </div>

        {/* Row 1 — slides in from LEFT */}
        <div ref={row1Ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {row1.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={handleClick}
            />
          ))}
        </div>

        {/* Row 2 — slides in from RIGHT */}
        <div ref={row2Ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {row2.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={handleClick}
            />
          ))}
        </div>

        {/* Bottom Marquee Strip */}
        <div className="reveal mt-20 relative w-full overflow-hidden py-6 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm rounded-2xl">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
            {[...SERVICES, ...SERVICES].map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={`${service.id}-${index}`}
                  className="flex items-center gap-4 px-4 py-2.5 rounded-full hover:bg-vortex-purple/8 transition-all duration-300 cursor-pointer shrink-0" style={{ background: 'rgba(255,255,255,0.04)' }}
                  onClick={() => handleClick(service)}
                >
                  <img
                    src={service.bgImage}
                    alt={service.title}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <span className="font-display font-medium text-white text-sm">{service.title}</span>
                  <div className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 shrink-0" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <span className={`w-1.5 h-1.5 rounded-full ${service.available ? 'bg-vortex-purple shadow-glow-sm' : 'bg-white/20'}`} />
                    <span className="text-[9px] font-mono text-vortex-gray/50 uppercase tracking-wider">
                      {service.available ? 'LIVE' : 'SOON'}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-vortex-purple/15 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-vortex-purple" />
                  </div>
                </div>
              );
            })}
          </div>
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

/* ─────────────── Service Card ─────────────── */
function ServiceCard({ service, onClick }: { service: Service; onClick: (s: Service) => void }) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: -10, duration: 0.35, ease: 'power2.out' });
    gsap.to(cardRef.current.querySelector('.card-bg'), { scale: 1.08, duration: 0.6, ease: 'power2.out' });
    gsap.to(cardRef.current.querySelector('.card-icon'), { rotate: 6, scale: 1.1, duration: 0.35, ease: 'power2.out' });
    gsap.to(cardRef.current.querySelectorAll('.card-slide'), { y: -4, duration: 0.35, ease: 'power2.out', stagger: 0.04 });
    gsap.to(cardRef.current.querySelector('.card-arrow'), { x: 3, y: -3, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: 0, duration: 0.45, ease: 'power3.out' });
    gsap.to(cardRef.current.querySelector('.card-bg'), { scale: 1, duration: 0.5, ease: 'power2.out' });
    gsap.to(cardRef.current.querySelector('.card-icon'), { rotate: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
    gsap.to(cardRef.current.querySelectorAll('.card-slide'), { y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.03 });
    gsap.to(cardRef.current.querySelector('.card-arrow'), { x: 0, y: 0, duration: 0.35, ease: 'power3.out' });
  };

  const handleMouseDown = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { scale: 0.98, duration: 0.15, ease: 'power2.in' });
  };

  const handleMouseUp = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
  };

  return (
    <div
      ref={cardRef}
      className="service-card group relative rounded-3xl overflow-hidden cursor-pointer h-[380px] transition-all duration-300"
      style={{
        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        willChange: 'transform',
      }}
      onClick={() => onClick(service)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Background Image */}
      <div
        className="card-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${service.bgImage})`, willChange: 'transform' }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-vortex-black via-vortex-black/70 to-vortex-black/30" />
      <div className="absolute inset-0 bg-gradient-to-br from-vortex-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Hover glow ring — shadow-based, no visible border */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1.5px rgba(139,92,246,0.45), inset 0 0 40px rgba(139,92,246,0.12), 0 0 60px rgba(139,92,246,0.15)' }}
      />

      {/* Card Content — glass panel at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Status badge — top right */}
        <div className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ background: 'rgba(11,11,11,0.7)', backdropFilter: 'blur(12px)' }}>
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            service.available
              ? 'bg-vortex-purple shadow-glow-sm animate-pulse'
              : 'bg-white/25'
          }`} />
          <span className="text-[10px] font-mono uppercase tracking-widest font-medium text-white/70">
            {service.available ? 'LIVE' : 'SOON'}
          </span>
        </div>

        {/* Icon — top left */}
        <div className="absolute top-5 left-5">
          <div className="card-icon w-11 h-11 rounded-2xl backdrop-blur-md grid place-items-center" style={{ background: 'rgba(11,11,11,0.65)' }}>
            <Icon className="w-5 h-5 text-vortex-purple" strokeWidth={1.5} />
          </div>
        </div>

        {/* Glass bottom panel — borderless depth */}
        <div className="relative rounded-2xl p-5 backdrop-blur-md bg-vortex-black/55 group-hover:bg-vortex-black/65 transition-colors duration-300" style={{ boxShadow: '0 -1px 0 0 rgba(255,255,255,0.04) inset' }}>
          {/* Title */}
          <h3 className="card-slide font-display font-semibold text-white text-base sm:text-lg leading-snug group-hover:text-vortex-purple transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="card-slide mt-2.5 text-sm text-vortex-gray/60 leading-relaxed line-clamp-2">
            {service.description}
          </p>

          {/* Feature pills */}
          <div className="card-slide mt-3.5 flex flex-wrap gap-2">
            {service.features.slice(0, 3).map((f, i) => (
              <span
                key={i}
                className="text-[10px] font-mono text-vortex-gray/45 rounded-full px-2.5 py-1 leading-none"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                {f.split(' ').slice(0, 2).join(' ')}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="card-slide mt-4 flex items-center gap-2">
            <span className="text-sm font-semibold text-vortex-purple">
              {service.available ? 'View Programs' : 'Learn More'}
            </span>
            <ArrowUpRight
              className="card-arrow w-4 h-4 text-vortex-purple"
              style={{ willChange: 'transform' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

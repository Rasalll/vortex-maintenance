import { useRef, useState } from 'react';
import {
  useMotionValue,
  motion,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import ComingSoonModal from './ComingSoonModal';
import { SERVICES, type Service } from '@/data/services';

type Props = { onOpenInstitute: () => void };

export default function Services({ onOpenInstitute }: Props) {
  const [soon, setSoon] = useState<Service | null>(null);

  const handleClick = (s: Service) => {
    if (s.available) onOpenInstitute();
    else setSoon(s);
  };

  return (
    <section id="services" className="bg-slate-950 text-white py-24 px-4 sm:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-vortex-purple/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* ── 1. Section Header ── */}
        <div className="text-center mb-16">
          <p className="text-vortex-purple font-mono text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
            What We Do
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-6xl lg:text-7xl leading-tight tracking-tight">
            Main <span className="text-vortex-purple text-glow">Services</span>
          </h2>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Six verticals engineered around AI — hover over each service to preview our technology ecosystem.
          </p>
        </div>

        {/* ── 2. Interactive Hover Links List ── */}
        <div className="border-t border-slate-800">
          {SERVICES.map((service, index) => (
            <ServiceHoverLink
              key={service.id}
              service={service}
              index={index}
              onClick={() => handleClick(service)}
            />
          ))}
        </div>
      </div>


      {/* Coming Soon Modal */}
      <ComingSoonModal
        title={soon?.title ?? ''}
        open={soon !== null}
        onClose={() => setSoon(null)}
      />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ServiceHoverLink
   ══════════════════════════════════════════════════════════ */
function ServiceHoverLink({
  service,
  index,
  onClick,
}: {
  service: Service;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const top = useTransform(mouseYSpring, [0.5, -0.5], ['40%', '60%']);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ['60%', '75%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 py-8 transition-colors duration-500 hover:border-vortex-purple/60 cursor-pointer"
    >
      {/* ── Left Content: Title + Description + Tags ── */}
      <div className="relative z-10 max-w-3xl pr-4">

        {/* Title Character Animation */}
        <motion.h3
          variants={{
            initial: { x: 0 },
            whileHover: { x: 12 },
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-300 transition-colors duration-300 group-hover:text-white mb-3 leading-snug"
        >
          {service.title}
        </motion.h3>

        {/* Subheading / Description */}
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 max-w-2xl group-hover:text-slate-300 transition-colors duration-300">
          {service.description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature, fi) => (
            <span
              key={fi}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 rounded-full px-3 py-1 border border-slate-800 bg-slate-900/60 group-hover:border-vortex-purple/30 group-hover:text-slate-300 transition-all duration-300"
            >
              <Check className="w-3 h-3 text-vortex-purple shrink-0" />
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* ── Hover Cursor Image ── */}
      <motion.img
        style={{
          top,
          left,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={{
          initial: { scale: 0, rotate: '-12.5deg', opacity: 0 },
          whileHover: { scale: 1, rotate: '6deg', opacity: 1 },
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        src={service.bgImage}
        alt={`Preview for ${service.title}`}
        className="pointer-events-none absolute z-20 h-36 w-48 rounded-2xl object-cover shadow-2xl shadow-vortex-purple/30 border-2 border-white/90 md:h-52 md:w-72 hidden md:block"
      />

      {/* ── Right CTA Icon ── */}
      <motion.div
        variants={{
          initial: {
            x: '25%',
            opacity: 0.5,
          },
          whileHover: {
            x: '0%',
            opacity: 1,
          },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative z-10 pt-4 md:pt-0 flex items-center gap-2 shrink-0 text-slate-400 group-hover:text-vortex-purple"
      >
        <span className="text-xs font-mono font-semibold uppercase tracking-wider hidden sm:inline group-hover:text-white transition-colors duration-300">
          {service.available ? 'Explore' : 'Notify Me'}
        </span>
        <div className="w-12 h-12 rounded-full border border-slate-800 group-hover:border-vortex-purple/60 group-hover:bg-vortex-purple/20 flex items-center justify-center transition-all duration-300">
          <ArrowUpRight className="text-2xl text-slate-300 group-hover:text-vortex-purple transition-colors duration-300" />
        </div>
      </motion.div>
    </motion.div>
  );
}

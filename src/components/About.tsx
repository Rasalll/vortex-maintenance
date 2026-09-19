import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const CARD_DATA = [
  {
    id: 'institute',
    label: 'AI Education',
    title: 'Technology Institute',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'solutions',
    label: 'Software & Cloud',
    title: 'AI IT Solutions',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'automation',
    label: 'Robotics & IoT',
    title: 'Automation Products',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Subtle scroll parallax for the overlapping cards */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const card1Y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 overflow-hidden bg-white border-b border-slate-100"
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-vortex-purple/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-50/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN: Text Content (55% width / 7 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow Label Row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-6">
              {/* Rounded Eyebrow Pill Badge */}
              

              {/* Small Muted Section Number */}
            
            </div>

            {/* Main Heading */}
            <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.15] tracking-tight max-w-[650px]">
              Building technology for a{' '}
              <span className="text-vortex-purple text-glow bg-gradient-to-r from-vortex-purple to-purple-600 bg-clip-text text-transparent">
                smarter future.
              </span>
            </h2>

            {/* Single Concise Body Paragraph */}
            <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-[600px]">
              VORTEX Global Technologies brings together AI-powered education,
              software solutions, automation, and emerging technologies to build
              practical solutions for a smarter future.
            </p>
          </motion.div>

          {/* ── RIGHT COLUMN: 3 Overlapping Cards Visual (45% width / 5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.1 }}
            className="lg:col-span-5 relative w-full flex items-center justify-center"
          >
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] h-[380px] sm:h-[440px] my-4">

              {/* Card 1: Back Layer (Top Right) */}
              <motion.div
                style={{ y: card1Y }}
                className="absolute top-0 right-0 w-[78%] h-[65%] rounded-3xl overflow-hidden border border-slate-200/70 bg-white shadow-lg z-10 group"
              >
                <img
                  src={CARD_DATA[0].image}
                  alt={CARD_DATA[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono text-vortex-purple-light uppercase tracking-widest font-semibold block mb-0.5">
                    {CARD_DATA[0].label}
                  </span>
                  <h4 className="font-display text-sm sm:text-base font-bold text-white">
                    {CARD_DATA[0].title}
                  </h4>
                </div>
              </motion.div>

              {/* Card 2: Middle Layer (Top Left) */}
              <motion.div
                style={{ y: card2Y }}
                className="absolute top-[20%] left-0 w-[80%] h-[65%] rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-xl z-20 group"
              >
                <img
                  src={CARD_DATA[1].image}
                  alt={CARD_DATA[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono text-vortex-purple-light uppercase tracking-widest font-semibold block mb-0.5">
                    {CARD_DATA[1].label}
                  </span>
                  <h4 className="font-display text-sm sm:text-base font-bold text-white">
                    {CARD_DATA[1].title}
                  </h4>
                </div>
              </motion.div>

              {/* Card 3: Front Focus Layer (Bottom Right) */}
              <motion.div
                style={{ y: card3Y }}
                className="absolute top-[40%] right-[4%] w-[84%] h-[62%] rounded-3xl overflow-hidden border border-purple-200/90 bg-white shadow-2xl shadow-vortex-purple/20 z-30 group"
              >
                <img
                  src={CARD_DATA[2].image}
                  alt={CARD_DATA[2].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] font-mono text-vortex-purple-light uppercase tracking-widest font-bold block mb-1">
                    {CARD_DATA[2].label}
                  </span>
                  <h4 className="font-display text-base sm:text-lg font-bold text-white">
                    {CARD_DATA[2].title}
                  </h4>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

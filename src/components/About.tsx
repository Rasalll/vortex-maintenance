import { ArrowUpRight, GraduationCap, Code2, Zap, Bot, Rocket, Cpu } from 'lucide-react';
import CardSwap from './CardSwap';

/* ─── Vertical showcase data ─────────────────────────────────────────────── */
const VERTICALS = [
  {
    category: 'Education',
    title: 'AI Integrated\nTechnology Institute',
    tagline: 'Train the next generation of AI professionals.',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    accent: 'from-violet-500/30',
  },
  {
    category: 'Software',
    title: 'AI Integrated\nIT Solutions',
    tagline: 'Building intelligent software for businesses.',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    accent: 'from-purple-500/30',
  },
  {
    category: 'Automation',
    title: 'AI / IoT &\nRobotics Lab',
    tagline: 'Smart automation and embedded systems.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    accent: 'from-indigo-500/30',
  },
  {
    category: 'Innovation',
    title: 'AI Era of\nDigital Marketing',
    tagline: 'Data-driven campaigns powered by AI.',
    icon: Bot,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    accent: 'from-fuchsia-500/30',
  },
  {
    category: 'Startups',
    title: 'Startup\nIncubation',
    tagline: 'Helping great ideas become real companies.',
    icon: Rocket,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    accent: 'from-purple-600/30',
  },
  {
    category: 'Future Tech',
    title: 'Automation\nProducts',
    tagline: 'Products that eliminate repetitive work.',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    accent: 'from-violet-600/30',
  },
];

/* ─── Individual vertical card ───────────────────────────────────────────── */
function VerticalCard({ v }: { v: typeof VERTICALS[0] }) {
  const Icon = v.icon;
  return (
    <div
      className="group w-full h-full rounded-[24px] overflow-hidden relative"
      style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.18)' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${v.image})` }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-vortex-black via-vortex-black/75 to-vortex-black/35" />
      <div className={`absolute inset-0 bg-gradient-to-br ${v.accent} via-transparent to-transparent`} />
      <div className="absolute inset-0 bg-gradient-to-br from-vortex-purple/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Hover glow ring */}
      <div
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1.5px rgba(139,92,246,0.5), inset 0 0 40px rgba(139,92,246,0.1)' }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-7">
        {/* Top row */}
        <div className="flex items-start justify-between">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-2xl grid place-items-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{ background: 'rgba(11,11,11,0.7)', backdropFilter: 'blur(14px)', boxShadow: '0 0 0 1px rgba(139,92,246,0.25)' }}
          >
            <Icon className="w-5 h-5 text-vortex-purple" strokeWidth={1.5} />
          </div>

          {/* Category label */}
          <div
            className="rounded-full px-3.5 py-1.5"
            style={{ background: 'rgba(11,11,11,0.65)', backdropFilter: 'blur(12px)' }}
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-vortex-purple font-medium">
              {v.category}
            </span>
          </div>
        </div>

        {/* Bottom content panel */}
        <div
          className="rounded-2xl p-5 transition-all duration-300 group-hover:translate-y-[-4px]"
          style={{ background: 'rgba(11,11,11,0.6)', backdropFilter: 'blur(16px)' }}
        >
          <h3 className="font-display font-bold text-white text-xl sm:text-2xl leading-tight whitespace-pre-line">
            {v.title}
          </h3>
          <p className="mt-2 text-sm text-vortex-gray/65 leading-relaxed">
            {v.tagline}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-semibold text-vortex-purple">Explore</span>
            <ArrowUpRight
              className="w-3.5 h-3.5 text-vortex-purple transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── About section ───────────────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-vortex-purple/5 blur-[100px] rounded-full" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: heading + text (unchanged) ─────────────────────────── */}
          <div>
            <h2 className="reveal font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              An AI-integrated <br />
              <span className="text-vortex-purple text-glow">technology company</span>
            </h2>
            <p className="reveal mt-7 text-lg text-vortex-gray/80 leading-relaxed max-w-xl" data-reveal-delay="100">
              VORTEX Global Technologies sits at the intersection of education,
              software solutions, and future technologies. We build intelligent
              products, automate the way businesses operate, and train the next
              generation of creators with an AI-integrated curriculum.
            </p>
            <p className="reveal mt-4 text-base text-vortex-gray/60 leading-relaxed max-w-xl" data-reveal-delay="200">
              From an AI-integrated technology institute to robotics labs, digital
              marketing, and startup incubation — everything we do is engineered
              for a smarter, more autonomous future.
            </p>
          </div>

          {/* ── Right: CardSwap ecosystem showcase ───────────────────────── */}
          <div className="reveal flex items-center justify-center lg:justify-end" data-reveal-delay="150">
            {/* Desktop / tablet size */}
            <div className="hidden sm:block">
              <CardSwap
                width={460}
                height={400}
                cardDistance={45}
                verticalDistance={55}
                delay={3000}
                pauseOnHover={true}
                easing="linear"
              >
                {VERTICALS.map((v) => (
                  <VerticalCard key={v.category} v={v} />
                ))}
              </CardSwap>
            </div>

            {/* Mobile size */}
            <div className="sm:hidden w-full">
              <CardSwap
                width={320}
                height={340}
                cardDistance={30}
                verticalDistance={40}
                delay={3000}
                pauseOnHover={true}
                easing="linear"
                className="mx-auto"
              >
                {VERTICALS.map((v) => (
                  <VerticalCard key={v.category} v={v} />
                ))}
              </CardSwap>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

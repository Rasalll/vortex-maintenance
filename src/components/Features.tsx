import { BrainCircuit, Users, FolderGit2, Wrench, Rocket, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BrainCircuit,
    title: 'AI Integrated Curriculum',
    description: 'Every program is built around AI tools and workflows from day one.',
  },
  {
    icon: Users,
    title: 'Expert Mentors',
    description: 'Learn directly from engineers and creators working on real products.',
  },
  {
    icon: FolderGit2,
    title: 'Real World Projects',
    description: 'Build a portfolio with live, production-grade projects — not toy demos.',
  },
  {
    icon: Wrench,
    title: '100% Practical Learning',
    description: 'Hands-on, project-first methodology. You build, then you ship.',
  },
  {
    icon: Rocket,
    title: 'Future Ready Skills',
    description: 'Skills engineered for the AI era — automation, robotics, and beyond.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'A culture that rewards curiosity, experimentation, and bold ideas.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-72 bg-vortex-green/5 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="reveal text-vortex-green font-mono text-xs tracking-[0.3em] uppercase mb-5">
            // Why VORTEX
          </p>
          <h2 className="reveal font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
            Learning <span className="text-vortex-green text-glow">Features</span>
          </h2>
          <p className="reveal mt-6 text-lg text-vortex-gray/70" data-reveal-delay="100">
            What makes a VORTEX education different — built for the AI era, end to end.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="reveal group relative overflow-hidden rounded-3xl glass-light p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-vortex-green/30 hover:bg-white/[0.06]"
                data-reveal-delay={(i % 3) * 100}
              >
                {/* number watermark */}
                <span className="absolute -top-2 right-3 font-display font-bold text-7xl text-white/[0.03] select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-vortex-green/10 border border-vortex-green/20 grid place-items-center transition-all duration-500 group-hover:bg-vortex-green/20 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-vortex-green" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-white text-lg">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-vortex-gray/70 leading-relaxed">
                    {f.description}
                  </p>
                </div>

                {/* bottom glow line */}
                <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-vortex-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

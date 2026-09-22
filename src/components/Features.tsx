const FEATURES: { title: string; description: string }[] = [
  {
    title: 'AI Integrated Curriculum',
    description: 'Every program is built around AI tools and workflows from day one.',
  },
  {
    title: 'Expert Mentors',
    description: 'Learn directly from engineers and creators working on real products.',
  },
  {
    title: 'Real World Projects',
    description: 'Build a portfolio with live, production-grade projects — not toy demos.',
  },
  {
    title: '100% Practical Learning',
    description: 'Hands-on, project-first methodology. You build, then you ship.',
  },
  {
    title: 'Future Ready Skills',
    description: 'Skills engineered for the AI era — automation, robotics, and beyond.',
  },
  {
    title: 'Innovation First',
    description: 'A culture that rewards curiosity, experimentation, and bold ideas.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-72 bg-vortex-purple/5 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="reveal text-vortex-purple font-mono text-xs tracking-[0.3em] uppercase mb-5">
            Why VORTEX
          </p>
          <h2 className="reveal font-display font-bold text-slate-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
            Learning <span className="text-vortex-purple text-glow">Features</span>
          </h2>
          <p className="reveal mt-6 text-lg text-slate-600" data-reveal-delay="100">
            What makes a VORTEX education different — built for the AI era, end to end.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 overflow-x-clip px-1 pb-4">
          {FEATURES.map((f, i) => {
            return (
              <div
                key={f.title}
                className="reveal feature-stack group"
                data-reveal-delay={(i % 3) * 100}
              >
                <span className="feature-stack-layer" aria-hidden="true" />
                <article className="feature-card flex h-full flex-col justify-between border border-slate-200/80 bg-white p-8 relative overflow-hidden">
                  {/* Big Service Number */}
                  <span className="absolute -top-1 right-3 font-display font-bold text-7xl text-slate-900/[0.06] select-none pointer-events-none transition-colors duration-300 group-hover:text-vortex-purple">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10 pt-2">
                    <h3 className="font-display font-bold text-slate-900 text-xl leading-snug transition-colors duration-300 group-hover:text-vortex-purple">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {f.description}
                    </p>
                  </div>

                  {/* bottom glow line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vortex-purple/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

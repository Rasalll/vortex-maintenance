import { Eye, Sparkles } from 'lucide-react';

export default function Vision() {
  return (
    <section id="vision" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="reveal relative overflow-hidden rounded-[2rem] glass border border-vortex-purple/15 p-10 sm:p-16 text-center">
          {/* glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-72 bg-vortex-purple/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

          <div className="relative">
            

            <h2 className="font-display font-bold text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Learn Today.
              <br />
              <span className="text-gradient animate-gradient-x text-glow">
                Lead Tomorrow.
              </span>
            </h2>

            <p className="mt-8 max-w-2xl mx-auto text-lg text-vortex-gray/80 leading-relaxed">
              Empowering the next generation with AI-integrated skills and
              cutting-edge technologies to build a smarter future.
            </p>

            <div className="mt-10 inline-flex items-center gap-2 text-vortex-purple/70 text-sm font-mono">
              <Sparkles className="w-4 h-4" />
              VORTEX Global Technologies
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

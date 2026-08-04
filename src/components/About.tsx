import { Brain, Code2, Rocket, Bot, Zap, Building2 } from 'lucide-react';

const PILLARS = [
  { icon: Brain, label: 'Education' },
  { icon: Code2, label: 'Software' },
  { icon: Zap, label: 'Automation' },
  { icon: Bot, label: 'Innovation' },
  { icon: Rocket, label: 'Startups' },
  { icon: Building2, label: 'Future Tech' },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-vortex-green/5 blur-[100px] rounded-full" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: heading + text */}
          <div>
            <p className="reveal text-vortex-green font-mono text-xs tracking-[0.3em] uppercase mb-5">
              // About Us
            </p>
            <h2 className="reveal font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              An AI-integrated <br />
              <span className="text-vortex-green text-glow">technology company</span>
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

            {/* Pillars */}
            <div className="reveal mt-10 flex flex-wrap gap-3" data-reveal-delay="300">
              {PILLARS.map((p) => (
                <span
                  key={p.label}
                  className="group inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 text-sm text-vortex-gray transition-all duration-300 hover:text-vortex-green hover:border-vortex-green/30"
                >
                  <p.icon className="w-4 h-4 text-vortex-green transition-transform duration-300 group-hover:scale-125" />
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: stat / visual card */}
          <div className="reveal relative" data-reveal-delay="150">
            <div className="relative glass rounded-3xl p-8 sm:p-10">
              {/* glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-vortex-green/20 via-transparent to-transparent pointer-events-none" />

              <div className="relative grid grid-cols-2 gap-6">
                {[
                  { value: 'AI', label: 'Integrated Curriculum' },
                  { value: '6+', label: 'Core Service Verticals' },
                  { value: '100%', label: 'Practical Learning' },
                  { value: 'Future', label: 'Ready Skills' },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className="group relative rounded-2xl bg-vortex-charcoal/60 border border-white/5 p-6 transition-all duration-300 hover:border-vortex-green/30 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <p className="font-display text-3xl sm:text-4xl font-bold text-gradient">
                      {s.value}
                    </p>
                    <p className="mt-2 text-sm text-vortex-gray/70">{s.label}</p>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-glow-sm pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* decorative orbiting dot */}
              <div className="absolute -top-3 -right-3 w-6 h-6">
                <div className="w-2 h-2 rounded-full bg-vortex-green shadow-glow animate-orbit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

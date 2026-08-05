import { GraduationCap, ArrowLeft, CheckCircle2, ArrowUpRight, Sparkles, BookOpen, Clock, Users, Award } from 'lucide-react';
import { PROGRAMS, type Program } from '@/data/programs';

type Props = {
  onBack: () => void;
};

export default function InstitutePage({ onBack }: Props) {
  return (
    <div className="relative min-h-screen bg-vortex-black text-vortex-gray pt-24 pb-32">
      {/* Background Orbs & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-vortex-green/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-vortex-green/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Navigation / Back Header */}
        <div className="mb-10">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 rounded-full glass px-5 py-2.5 text-sm font-medium text-vortex-gray transition-all duration-300 hover:text-white hover:border-vortex-green/40 hover:shadow-glow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-vortex-green transition-transform duration-300 group-hover:-translate-x-1" />
            Back to All Services
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden glass border border-vortex-green/20 p-8 sm:p-14 lg:p-16 mb-16">
          {/* Subtle Grid & Image Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vortex-black via-vortex-black/80 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
           

            <h1 className="font-display font-bold text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              AI Integrated <br />
              <span className="text-vortex-green text-glow">Technology Institute</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-vortex-gray/80 leading-relaxed">
              A next-generation learning institute with an AI-integrated curriculum spanning creative design, web & mobile engineering, DevOps, marketing, and robotics. Built around 100% practical, real-world project delivery.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 rounded-full bg-vortex-green px-7 py-3.5 text-sm font-semibold text-vortex-black transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                <GraduationCap className="w-4 h-4" />
                Explore 6 Programs
              </a>
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-vortex-green/40 hover:bg-white/10"
              >
                Return to Services
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="relative z-10 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-vortex-green/10 border border-vortex-green/20 grid place-items-center shrink-0">
                <BookOpen className="w-5 h-5 text-vortex-green" />
              </div>
              <div>
                <div className="text-white font-bold text-xl leading-none font-display">6 Core</div>
                <div className="text-vortex-gray/60 text-xs mt-1">Specialized Tracks</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-vortex-green/10 border border-vortex-green/20 grid place-items-center shrink-0">
                <Clock className="w-5 h-5 text-vortex-green" />
              </div>
              <div>
                <div className="text-white font-bold text-xl leading-none font-display">Flexible</div>
                <div className="text-vortex-gray/60 text-xs mt-1">Class Schedules</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-vortex-green/10 border border-vortex-green/20 grid place-items-center shrink-0">
                <Users className="w-5 h-5 text-vortex-green" />
              </div>
              <div>
                <div className="text-white font-bold text-xl leading-none font-display">Direct</div>
                <div className="text-vortex-gray/60 text-xs mt-1">Industry Mentorship</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-vortex-green/10 border border-vortex-green/20 grid place-items-center shrink-0">
                <Award className="w-5 h-5 text-vortex-green" />
              </div>
              <div>
                <div className="text-white font-bold text-xl leading-none font-display">100%</div>
                <div className="text-vortex-gray/60 text-xs mt-1">Practical Execution</div>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Grid Section */}
        <div id="programs" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
          
            <h2 className="font-display font-bold text-white text-3xl sm:text-5xl tracking-tight">
              All Learning <span className="text-vortex-green text-glow">Programs</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-vortex-gray/70">
              Select a specialized track tailored to build high-income skills in the AI era.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((p: Program) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="group relative flex flex-col justify-between rounded-3xl glass p-8 transition-all duration-500 hover:-translate-y-2 hover:border-vortex-green/40 hover:shadow-glow"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-vortex-green/10 border border-vortex-green/20 grid place-items-center transition-all duration-500 group-hover:bg-vortex-green/20 group-hover:scale-110">
                        <Icon className="w-7 h-7 text-vortex-green" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-mono font-medium uppercase tracking-wider text-vortex-green bg-vortex-green/10 px-3 py-1 rounded-full border border-vortex-green/20">
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-white text-xl leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm text-vortex-gray/70 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-vortex-green">
                    <span>Practical Projects Included</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why VORTEX Institute Section */}
        <div className="rounded-[2.5rem] glass border border-white/10 p-8 sm:p-14">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-vortex-green font-mono text-xs tracking-[0.3em] uppercase mb-3">
                // Methodology
              </p>
              <h2 className="font-display font-bold text-white text-3xl sm:text-4xl tracking-tight">
                Why Study at <span className="text-vortex-green">VORTEX Institute?</span>
              </h2>
              <p className="mt-4 text-base text-vortex-gray/70 leading-relaxed">
                Traditional education focuses on passive theory. VORTEX focuses on active creation, teaching you how to use AI tools as force multipliers in your daily workflow.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: 'AI Workflow Integration',
                    desc: 'Master AI-driven IDEs, code generation, design automation, and content intelligence tools.',
                  },
                  {
                    title: 'Real-world Client Projects',
                    desc: 'Work on actual live client applications instead of simulated classroom assignments.',
                  },
                  {
                    title: '1-on-1 Senior Mentorship',
                    desc: 'Receive direct line code reviews and technical feedback from experienced developers.',
                  },
                  {
                    title: 'Career & Placement Support',
                    desc: 'Build an exceptional Github & portfolio proof of work that lands real opportunities.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-vortex-green shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold text-base leading-tight">{item.title}</h4>
                      <p className="text-sm text-vortex-gray/60 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-vortex-charcoal/80 border border-white/10 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-vortex-green/10 via-transparent to-transparent pointer-events-none" />
              <GraduationCap className="w-16 h-16 text-vortex-green mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="font-display font-bold text-white text-2xl">
                Ready to Join VORTEX Academy?
              </h3>
              <p className="mt-3 text-sm text-vortex-gray/70 leading-relaxed max-w-md mx-auto">
                Transform your technology career with our practical, AI-integrated curriculum.
              </p>
              <button
                onClick={onBack}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-vortex-green px-8 py-3.5 text-sm font-semibold text-vortex-black transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                Back to All Services
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

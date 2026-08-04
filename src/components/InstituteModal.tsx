import { useEffect } from 'react';
import { X, GraduationCap, CheckCircle2, ArrowRight, Sparkles, BookOpen, Clock, Users, Award } from 'lucide-react';
import { PROGRAMS, type Program } from '@/data/programs';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InstituteModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-vortex-black/90 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Main Full Page Modal Container */}
      <div className="relative w-full max-w-5xl my-auto max-h-[92vh] flex flex-col rounded-3xl glass border border-vortex-green/30 shadow-glow-lg animate-scale-in overflow-hidden z-10">
        
        {/* Sticky Header */}
        <div className="shrink-0 glass border-b border-white/10 px-6 sm:px-10 py-5 flex items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-vortex-green/15 border border-vortex-green/30 grid place-items-center shrink-0">
              <GraduationCap className="w-6 h-6 text-vortex-green" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-vortex-green font-mono text-[11px] tracking-[0.25em] uppercase flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                VORTEX ACADEMY
              </p>
              <h2 className="font-display font-bold text-white text-xl sm:text-2xl leading-tight">
                AI Integrated Technology Institute
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full glass-light grid place-items-center text-vortex-gray hover:text-vortex-green hover:border-vortex-green/40 transition-all shrink-0"
            aria-label="Close page"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-10">

          {/* Hero Banner Section */}
          <div className="relative rounded-2xl overflow-hidden glass-light border border-vortex-green/20 p-8 sm:p-10">
            <div className="absolute inset-0 bg-gradient-to-r from-vortex-green/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium text-vortex-black bg-vortex-green mb-4">
                Next-Gen Education
              </span>
              <h3 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight">
                Learn with AI. Build Real Projects. <span className="text-vortex-green text-glow">Lead the Industry.</span>
              </h3>
              <p className="mt-4 text-vortex-gray/80 text-base sm:text-lg leading-relaxed">
                Our institute bridges the gap between traditional learning and future AI tech. Master high-demand skills with hands-on mentorship and 100% practical curriculum.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-vortex-green" />
                <div>
                  <div className="text-white font-bold text-lg leading-none">6+</div>
                  <div className="text-vortex-gray/60 text-xs mt-1">Core Programs</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-vortex-green" />
                <div>
                  <div className="text-white font-bold text-lg leading-none">Flexible</div>
                  <div className="text-vortex-gray/60 text-xs mt-1">Schedules</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-vortex-green" />
                <div>
                  <div className="text-white font-bold text-lg leading-none">1-on-1</div>
                  <div className="text-vortex-gray/60 text-xs mt-1">Mentorship</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-vortex-green" />
                <div>
                  <div className="text-white font-bold text-lg leading-none">100%</div>
                  <div className="text-vortex-gray/60 text-xs mt-1">Practical</div>
                </div>
              </div>
            </div>
          </div>

          {/* Programs Section */}
          <div>
            <div className="mb-6">
              <h4 className="font-display font-bold text-white text-2xl">
                Featured <span className="text-vortex-green">Programs</span>
              </h4>
              <p className="text-vortex-gray/70 text-sm mt-1">
                Explore our specialized AI-integrated tech courses designed for career growth.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROGRAMS.map((p: Program, i) => (
                <ProgramCard key={p.id} program={p} index={i} />
              ))}
            </div>
          </div>

          {/* Practical Highlights / Why Us */}
          <div className="rounded-2xl bg-vortex-charcoal/80 border border-white/10 p-6 sm:p-8">
            <h4 className="font-display font-bold text-white text-xl mb-4">
              Why Study at VORTEX Institute?
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-vortex-green shrink-0 mt-0.5" />
                <p className="text-sm text-vortex-gray/80 leading-relaxed">
                  <strong className="text-white">AI Workflow Integration:</strong> Learn how to leverage modern AI tools to code, design, and automate 5x faster.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-vortex-green shrink-0 mt-0.5" />
                <p className="text-sm text-vortex-gray/80 leading-relaxed">
                  <strong className="text-white">Real-world Client Projects:</strong> Build portfolio-ready production apps during your training.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-vortex-green shrink-0 mt-0.5" />
                <p className="text-sm text-vortex-gray/80 leading-relaxed">
                  <strong className="text-white">Expert Guidance:</strong> Work directly with seasoned industry engineers and digital strategists.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-vortex-green shrink-0 mt-0.5" />
                <p className="text-sm text-vortex-gray/80 leading-relaxed">
                  <strong className="text-white">Career Assistance:</strong> Resume reviews, mock interviews, and direct referral opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="shrink-0 glass border-t border-white/10 px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-vortex-gray/70 text-center sm:text-left">
            Interested in enrolling? Get in touch with our admissions team.
          </p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full bg-vortex-green px-6 py-2.5 text-sm font-semibold text-vortex-black transition-all duration-300 hover:shadow-glow hover:scale-105"
          >
            Close Details
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgramCard({ program }: { program: Program; index: number }) {
  const Icon = program.icon;
  return (
    <div className="group relative rounded-2xl bg-vortex-charcoal/60 border border-white/10 p-6 flex flex-col justify-between transition-all duration-300 hover:border-vortex-green/40 hover:-translate-y-1 hover:bg-vortex-charcoal/90">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-12 h-12 rounded-xl bg-vortex-green/10 border border-vortex-green/20 grid place-items-center transition-all duration-300 group-hover:bg-vortex-green/20 group-hover:scale-110">
            <Icon className="w-6 h-6 text-vortex-green" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-vortex-green bg-vortex-green/10 px-2.5 py-1 rounded-full border border-vortex-green/20">
            {program.badge}
          </span>
        </div>

        <h5 className="font-display font-semibold text-white text-lg leading-snug">
          {program.title}
        </h5>

        <p className="mt-2.5 text-sm text-vortex-gray/70 leading-relaxed">
          {program.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-vortex-green font-medium">
        <span>Curriculum Included</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  );
}

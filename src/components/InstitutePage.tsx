import { GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PROGRAMS, type Program } from '@/data/programs';
import { Timeline } from '@/components/ui/timeline';

type Props = {
  onBack: () => void;
};

const TIMELINE_DATA = [
  {
    title: "Phase 1: Foundations",
    content: (
      <div>
        <h4 className="text-xl font-bold text-slate-900 mb-2 font-display">Core Engineering &amp; AI Integration</h4>
        <p className="mb-6 text-sm text-slate-600 leading-relaxed">
          Master Modern Web Engineering, Responsive System Design, Git Version Control, and Developer Workflows integrated with AI assistants.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-semibold text-vortex-green text-sm mb-1">01. Web Architecture</div>
            <div className="text-xs text-slate-600">TypeScript, React, Tailwind CSS &amp; UI Systems</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-semibold text-vortex-green text-sm mb-1">02. AI-Driven Tooling</div>
            <div className="text-xs text-slate-600">Code Generation, Prompt Engineering &amp; AI Workflows</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Phase 2: Full-Stack",
    content: (
      <div>
        <h4 className="text-xl font-bold text-slate-900 mb-2 font-display">Backend Services &amp; Mobile Delivery</h4>
        <p className="mb-6 text-sm text-slate-600 leading-relaxed">
          Build scalable APIs, database schemas, cross-platform mobile apps, and automated cloud deployment pipelines.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-semibold text-vortex-green text-sm mb-1">03. Node &amp; Cloud DevOps</div>
            <div className="text-xs text-slate-600">RESTful APIs, PostgreSQL, Supabase &amp; CI/CD Pipelines</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-semibold text-vortex-green text-sm mb-1">04. Mobile App Suite</div>
            <div className="text-xs text-slate-600">React Native, Android &amp; iOS App Deployment</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Phase 3: AI & IoT",
    content: (
      <div>
        <h4 className="text-xl font-bold text-slate-900 mb-2 font-display">Intelligent Automation &amp; Hardware Lab</h4>
        <p className="mb-6 text-sm text-slate-600 leading-relaxed">
          Deep dive into custom AI Agents, RAG document search, sensor networks, robotics microcontrollers, and AI Digital Marketing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-semibold text-vortex-green text-sm mb-1">05. AI Agent &amp; LLMs</div>
            <div className="text-xs text-slate-600">Custom Agents, Vector Databases &amp; Automation</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-semibold text-vortex-green text-sm mb-1">06. IoT &amp; Robotics Lab</div>
            <div className="text-xs text-slate-600">Hardware Controllers, Vision AI &amp; Smart Sensors</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Phase 4: Execution",
    content: (
      <div>
        <h4 className="text-xl font-bold text-slate-900 mb-2 font-display">Production Delivery &amp; Career Placement</h4>
        <p className="mb-6 text-sm text-slate-600 leading-relaxed">
          Deliver real client projects, build a verified GitHub portfolio proof of work, and receive 1-on-1 industry placement support.
        </p>
        <div className="p-6 rounded-2xl bg-vortex-green/10 border border-vortex-green/30 text-slate-900">
          <div className="font-bold text-base text-vortex-green mb-1">🚀 100% Practical Client Delivery</div>
          <div className="text-xs text-slate-600 leading-relaxed">
            Graduates deploy live software products and receive direct placement referral access to leading technology hubs in Kerala and beyond.
          </div>
        </div>
      </div>
    ),
  },
];

export default function InstitutePage({ onBack }: Props) {
  return (
    <div className="relative min-h-screen bg-vortex-black text-slate-900 pt-24 pb-32">
      {/* Background Orbs & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-vortex-green/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-vortex-green/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Navigation / Back Header */}
        <div className="mb-10">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 rounded-full glass px-5 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:text-slate-900 hover:border-vortex-green/40 hover:shadow-glow-sm hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 text-vortex-green transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Main Website
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative mb-16 grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] py-8 sm:py-12 lg:py-16">
          <div className="relative z-10 max-w-3xl">
            <h1 className="font-display font-bold text-slate-900 text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              AI Integrated <br />
              <span className="text-vortex-green text-glow-green">Technology Institute</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              A next-generation learning institute in Manjeri with an AI-integrated curriculum spanning creative design, web &amp; mobile engineering, DevOps, marketing, and robotics.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 rounded-full bg-vortex-green px-7 py-3.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:shadow-glow-green hover:scale-105"
              >
                <GraduationCap className="w-4 h-4" />
                Explore 6 Programs
              </a>
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-full glass border border-slate-200 px-7 py-3.5 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-vortex-green/40 hover:bg-white"
              >
                Back to Home
              </button>
            </div>
          </div>

          <div className="relative flex h-[16rem] sm:h-[20rem] lg:h-[26rem] items-center justify-center lg:justify-end">
            <img
              src="/logos/webp/vortex-green-onlyv.png"
              alt=""
              aria-hidden="true"
              className="h-full w-auto max-w-full object-contain object-center pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Programs Grid Section */}
        <div id="programs" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-5xl tracking-tight">
              All Learning <span className="text-vortex-green text-glow-green">Programs</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Select a specialized track tailored to build high-income skills in the AI era.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 overflow-x-clip px-1 pb-3">
            {PROGRAMS.map((p: Program) => (
                <div key={p.id} className="program-stack">
                  <span className="program-stack-layer" aria-hidden="true" />
                  <article className="program-card flex h-full flex-col justify-between border border-slate-200/80 bg-white p-8">
                    <div>
                      <h3 className="font-display font-bold text-slate-900 text-xl leading-snug">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </article>
                </div>
            ))}
          </div>
        </div>

    
        {/* <Timeline data={TIMELINE_DATA} /> */}

        {/* Why VORTEX Institute Section */}
        <div className="rounded-[2.5rem] glass border border-slate-200 p-8 sm:p-14">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
             
              <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-4xl tracking-tight">
                Why Study at <span className="text-vortex-green">VORTEX Institute?</span>
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
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
                    desc: 'Build an exceptional Github &amp; portfolio proof of work that lands real opportunities.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-vortex-green shrink-0 mt-1" />
                    <div>
                      <h4 className="text-slate-900 font-semibold text-base leading-tight">{item.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-vortex-green/10 via-transparent to-transparent pointer-events-none" />
              <GraduationCap className="w-16 h-16 text-vortex-green mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="font-display font-bold text-slate-900 text-2xl">
                Ready to Join VORTEX Academy?
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Transform your technology career with our practical, AI-integrated curriculum in Manjeri.
              </p>
              <button
                onClick={onBack}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-vortex-green px-8 py-3.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:shadow-glow-green hover:scale-105"
              >
                Back to Main Website
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

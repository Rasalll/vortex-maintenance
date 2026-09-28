import React, { useEffect } from 'react';
import { ArrowLeft, Code2, Cpu, Globe, Server, Layers, Phone, MessageCircle } from 'lucide-react';
import SpecularButton from './SpecularButton';

interface ITSolutionsPageProps {
  onBack: () => void;
}

export default function ITSolutionsPage({ onBack }: ITSolutionsPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const whatsappMessage = encodeURIComponent('Hi VORTEX, I want to know more about your AI Integrated IT Solutions');
  const whatsappUrl = `https://wa.me/918606101333?text=${whatsappMessage}`;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 pt-44 pb-20 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-vortex-purple/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        {/* Hero Section */}
        <div className="relative mb-16 grid items-center gap-10 py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:py-12">
          <div className="max-w-3xl text-left">
            <h1 className="font-display font-bold text-slate-900 text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              AI Integrated <br />
              <span className="text-vortex-purple text-glow">IT Solutions</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              Intelligent software, web, and mobile solutions engineered around AI-driven development workflows for businesses and scaling enterprises.
            </p>

            <div className="mt-8 flex flex-wrap justify-start gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-vortex-purple px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                Discuss Your Project
              </a>
              <a
                href="tel:+918606101333"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-vortex-purple/50 hover:bg-slate-50"
              >
                <Phone className="w-4 h-4 text-vortex-purple" />
                Call Direct
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <img
              src="/logos/webp/vortex-v-purple.png"
              alt="VORTEX Global Technologies icon"
              className="h-auto w-[min(90vw,42rem)] max-w-none object-contain"
            />
          </div>
        </div>

        {/* Core Pillars Section — Learning Features Stacked Card Style */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
           
            <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-5xl tracking-tight">
              Our Technology <span className="text-vortex-purple text-glow">Pillars</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500">
              We leverage modern AI tooling and robust system architectures to deliver high-performance digital products.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 overflow-x-clip px-1 pb-4">
            {[
              {
                title: 'Custom Software Architecture',
                desc: 'Scalable, secure backend architectures built to handle enterprise workload demands.',
              },
              {
                title: 'AI-Driven Workflows',
                desc: 'Integrating Machine Learning models and AI capabilities directly into web & mobile systems.',
              },
              {
                title: 'Web & Mobile App Delivery',
                desc: 'Responsive, lightning-fast cross-platform applications with seamless UX design.',
              },
              {
                title: 'Optimized Cloud DevOps',
                desc: 'Automated CI/CD pipelines, containerized deployments, and cloud monitoring.',
              },
            ].map((p) => (
              <div key={p.title} className="card-purple-stack group">
                <span className="card-purple-stack-layer" aria-hidden="true" />
                <article className="card-purple flex h-full flex-col justify-between p-8 relative overflow-hidden">
                  <div className="relative z-10 pt-2">
                    <h3 className="font-helvetica font-bold text-white text-xl leading-snug transition-colors duration-300 group-hover:text-violet-300">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm text-white leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                </article>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-vortex-purple/5 via-transparent to-vortex-purple/5 pointer-events-none" />
          <h2 className="font-display font-bold text-slate-900 text-2xl sm:text-4xl tracking-tight">
            Ready to Build Your Next IT Solution?
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-base sm:text-lg">
            Connect with our engineering team to discuss custom requirements, architecture design, or project quotes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-vortex-purple px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <SpecularButton
              size="md"
              radius={999}
              tint="#f8fafc"
              tintOpacity={0.5}
              blur={8}
              textColor="#334155"
              lineColor="#ffffff"
              baseColor="#7c3aed"
              intensity={0.85}
              thickness={1.4}
              followMouse
              proximity={250}
              onClick={onBack}
              className="min-h-[48px]"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 text-vortex-purple" />
                Back to Services
              </span>
            </SpecularButton>
          </div>
        </div>

      </div>
    </div>
  );
}

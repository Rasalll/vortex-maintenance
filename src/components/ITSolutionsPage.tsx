import React, { useEffect } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import SpecularButton from './SpecularButton';
import ITSolutionsCmsSections from './ITSolutionsCmsSections';
import { FlowButton } from './ui/flow-button';
import FourTileBackground from './ui/FourTileBackground';

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
    <div className="relative min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-vortex-purple/8 rounded-full blur-[180px] pointer-events-none" />
      <FourTileBackground image="/grid-black-scaled-e1765885682958.webp" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        {/* Hero Section */}
        <div className="relative mb-16 grid items-start gap-10 py-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:py-8">
          <div className="relative z-10 max-w-3xl text-left">
            <h1 className="font-display font-bold text-slate-900 text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              AI Integrated <br />
              <span className="text-vortex-purple text-glow">IT Solutions</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              Intelligent software, web, and mobile solutions engineered around AI-driven development workflows for businesses and scaling enterprises.
            </p>

            <div className="mt-8 flex flex-wrap justify-start gap-4">
              <FlowButton text="Discuss Your Project" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" />Discuss Your Project</span>
              </FlowButton>
              <FlowButton text="Back to Services" onClick={onBack}>
                <span className="inline-flex items-center gap-2"><ArrowLeft className="h-4 w-4" />Back to Services</span>
              </FlowButton>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center lg:justify-end lg:self-center">
            <img
              src="/logos/webp/vortex-v-purple.png"
              alt="VORTEX Global Technologies icon"
              className="h-auto w-[min(90vw,42rem)] max-w-none object-contain brightness-110"
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
                image: '/technology-pillars-images/Scalable%20Software%20Architecture%20Banner.png',
              },
              {
                title: 'AI-Driven Workflows',
                image: '/technology-pillars-images/AI-Driven%20Workflow%20Workspace.png',
              },
              {
                title: 'Web & Mobile App Delivery',
                image: '/technology-pillars-images/Web-Mobile-App-Delivery-Showcase.png',
              },
            ].map((p) => (
              <div key={p.title} className="card-purple-stack group">
                <span className="card-purple-stack-layer" aria-hidden="true" />
                <article className="card-purple h-full overflow-hidden">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover object-left" />
                </article>
              </div>
            ))}
          </div>
        </div>

        <ITSolutionsCmsSections />

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

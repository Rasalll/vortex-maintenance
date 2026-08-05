import { useEffect, useState } from 'react';
import { ArrowDown, Cpu } from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function Hero() {
  const mouse = useMousePosition();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
      >
        <source src="/src/public/video/14141391_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-vortex-black/50 pointer-events-none" />

      {/* Animated background orbs — purple */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full bg-vortex-purple/20 blur-[120px] animate-pulse-glow"
          style={{ transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] rounded-full bg-vortex-purple/10 blur-[140px] animate-float-slow"
          style={{ transform: `translate(${mouse.x * -40}px, ${mouse.y * -40}px)` }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full border border-vortex-purple/10 animate-spin-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[26rem] rounded-full border border-vortex-purple/10 animate-spin-slow" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-vortex-black/60 via-transparent to-vortex-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 text-center pt-24 pb-20">
        {/* Company name */}
        <h1
          className={`font-display font-bold tracking-tight text-white text-5xl sm:text-7xl lg:text-8xl leading-[1.05] transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="block text-gradient animate-gradient-x">VORTEX</span>
          <span className="block text-2xl sm:text-4xl lg:text-5xl font-medium text-vortex-gray mt-3 tracking-[0.15em]">
            GLOBAL TECHNOLOGIES
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={`mt-8 font-display text-xl sm:text-3xl font-semibold text-white transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Learn Today. <span className="text-vortex-purple text-glow">Lead Tomorrow.</span>
        </p>

        {/* Subtitle */}
        <p
          className={`mt-5 max-w-2xl mx-auto text-base sm:text-lg text-vortex-gray/80 leading-relaxed transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Empowering the next generation with AI-integrated skills and cutting-edge
          technologies to build a smarter future.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={() => scrollTo('services')}
            className="group inline-flex items-center gap-2 rounded-full bg-vortex-purple px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-glow hover:scale-105"
          >
            <Cpu className="w-4 h-4" />
            Explore Services
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-vortex-purple/40 hover:bg-white/10"
          >
            About VORTEX
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-vortex-gray/60 hover:text-vortex-purple transition-colors"
        aria-label="Scroll to about"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}

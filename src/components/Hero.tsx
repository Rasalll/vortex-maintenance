import { useEffect, useState } from 'react';
import { ArrowDown, Cpu } from 'lucide-react';
import { useMousePosition } from '@/hooks/useMousePosition';
import Antigravity from './Antigravity';
import SplitText from './SplitText';

export default function Hero() {
  const mouse = useMousePosition();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-slate-900 pt-20 pb-12 lg:pt-24 lg:pb-16 grid-bg"
    >
      {/* 3D Antigravity Interactive Particles Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Antigravity
          count={220}
          magnetRadius={7}
          ringRadius={8}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.8}
          lerpSpeed={0.06}
          color="#7c3aed"
          autoAnimate={true}
          particleVariance={1}
        />
      </div>

      {/* Background Ambient Radial Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-vortex-purple/10 blur-[150px] animate-pulse-glow"
          style={{ transform: `translate(${mouse.x * 25 - 50}% , ${mouse.y * 25 - 50}%)` }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full border border-vortex-purple/15 animate-spin-slower pointer-events-none" />
      </div>

      {/* Center Main Content Layout */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center w-full">
        <div
          className={`flex flex-col items-center justify-center transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Animated SplitText Headline */}
          <SplitText
            tag="h1"
            text="Empowering a Smarter Tomorrow"
            className="font-display font-bold text-slate-900 text-5xl sm:text-7xl lg:text-8xl leading-[1.05] tracking-tight"
            delay={40}
            duration={0.7}
            ease="power3.out"
            from={{ opacity: 0, y: 45 }}
            to={{ opacity: 1, y: 0 }}
            highlightWords={{
              Smarter: 'text-vortex-purple text-glow',
            }}
          />

          {/* Supporting Text */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Empowering the next generation with AI-integrated skills and cutting-edge technologies to build a smarter future.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4.5 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('services')}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-vortex-purple px-9 py-4.5 text-base sm:text-lg font-semibold text-white transition-all duration-300 hover:shadow-glow hover:scale-[1.03] w-full sm:w-auto shadow-md shadow-vortex-purple/20"
            >
              <Cpu className="w-[21px] h-[21px] text-white shrink-0" strokeWidth={2} />
              Explore Services
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="inline-flex items-center justify-center gap-3 rounded-full glass border border-slate-200/80 px-9 py-4.5 text-base sm:text-lg font-semibold text-slate-900 transition-all duration-300 hover:border-vortex-purple/40 hover:bg-white hover:shadow-sm w-full sm:w-auto"
            >
              About VORTEX
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-500 hover:text-vortex-purple transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-medium">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-vortex-purple" />
      </button>
    </section>
  );
}

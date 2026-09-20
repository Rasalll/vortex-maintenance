import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Globe, Instagram } from 'lucide-react';

const  CONTACT = [
  { icon: Phone, label: 'Phone', value: '+91 8606 101 333', href: 'tel:+918606101333' },
  { icon: MapPin, label: 'Location', value: 'Nelliparambu, Manjeri – 676122', href: 'https://maps.google.com/?q=Nelliparambu+Manjeri+676122' },
  { icon: Globe, label: 'Website', value: 'vortexglobaltechnologies.in', href: 'https://vortexglobaltechnologies.in' },
  { icon: Instagram, label: 'Instagram', value: '@vortex_t_hub', href: 'https://instagram.com/vortex_t_hub' },
];

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'features', label: 'Why VORTEX' },
  { id: 'vision', label: 'Vision' },
];

const DURATION = 0.25;
const STAGGER = 0.025;

function FlipLink({
  children,
  href,
  hoverColor = 'text-vortex-purple',
}: {
  children: string;
  href: string;
  hoverColor?: string;
}) {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="relative block overflow-hidden whitespace-nowrap text-5xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white transition-colors duration-300"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split('').map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: '-100%',
              },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className="inline-block text-white"
            key={i}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split('').map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: '100%',
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className={`inline-block ${hoverColor}`}
            key={i}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
}

export function RevealLinks() {
  return (
    <section className="w-full grid place-content-center bg-slate-950 py-24 sm:py-32 px-4 sm:px-8 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-vortex-purple/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 grid place-content-center text-center">
        {/* Contact Header - Clean typography without pill badge */}
        <div className="mb-14 text-center">
         
          <h2 className="font-display font-bold text-white text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
            Get In <span className="text-vortex-purple text-glow">Touch</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Choose your preferred channel to connect with VORTEX Global Technologies.
          </p>
        </div>

        {/* Flip Links */}
        <div className="grid place-content-center gap-4 text-center">
          <FlipLink href="https://instagram.com/vortex_t_hub" hoverColor="text-[#E1306C]">Instagram</FlipLink>
          <FlipLink href="https://www.linkedin.com/company/vortex-global-technologies" hoverColor="text-[#0A66C2]">Linkedin</FlipLink>
          <FlipLink href="https://facebook.com" hoverColor="text-[#1877F2]">Facebook</FlipLink>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* Full-Width RevealLinks Section */}
      <RevealLinks />

      <footer id="contact" className="relative pt-20 pb-10 overflow-hidden border-t border-slate-200 bg-white">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-vortex-purple/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Main grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="reveal md:col-span-1">
              <div className="flex items-center gap-3">
                <img
                  src="/src/public/logos/vortexx-logo-horizontal-blue-violet.png"
                  alt="VORTEX Global Technologies"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <p className="mt-5 text-sm text-slate-600 leading-relaxed max-w-xs">
                An AI-integrated technology company focused on education, software,
                innovation, automation, startups, and future technologies.
              </p>
            </div>

            {/* Nav */}
            <div className="reveal" data-reveal-delay="100">
              <p className="text-vortex-purple font-mono text-[11px] tracking-[0.25em] uppercase mb-5 font-semibold">
                Navigate
              </p>
              <ul className="space-y-3">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => go(n.id)}
                      className="text-sm text-slate-600 hover:text-vortex-purple transition-colors"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="reveal" data-reveal-delay="200">
              <p className="text-vortex-purple font-mono text-[11px] tracking-[0.25em] uppercase mb-5 font-semibold">
                Get in Touch
              </p>
              <ul className="space-y-4">
                {CONTACT.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="group flex items-start gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        <span className="mt-0.5 w-9 h-9 shrink-0 rounded-lg bg-vortex-purple/10 border border-vortex-purple/20 grid place-items-center transition-all duration-300 group-hover:bg-vortex-purple/20 group-hover:scale-110">
                          <Icon className="w-4 h-4 text-vortex-purple" strokeWidth={1.5} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-medium">
                            {c.label}
                          </span>
                          <span className="block group-hover:text-vortex-purple transition-colors break-words font-medium">
                            {c.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-mono">
              © {new Date().getFullYear()} VORTEX Global Technologies. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 font-mono">
              Learn Today. <span className="text-vortex-purple font-semibold">Lead Tomorrow.</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

import { Hexagon, Phone, MapPin, Globe, Instagram, ArrowUpRight } from 'lucide-react';

const CONTACT = [
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

export default function Footer() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer id="contact" className="relative pt-28 pb-10 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-vortex-green/5 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* CTA banner */}
        <div className="reveal relative overflow-hidden rounded-3xl glass border border-vortex-green/20 p-8 sm:p-12 mb-16 text-center">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-60 bg-vortex-green/15 blur-[100px] rounded-full" />
          <div className="relative">
            <h3 className="font-display font-bold text-white text-3xl sm:text-4xl">
              Ready to build the <span className="text-vortex-green">future?</span>
            </h3>
            <p className="mt-4 text-vortex-gray/70 max-w-xl mx-auto">
              Join VORTEX Global Technologies and learn the AI-integrated skills that
              power tomorrow.
            </p>
            <button
              onClick={() => go('services')}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-vortex-green px-7 py-3.5 text-sm font-semibold text-vortex-black transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              Explore Programs
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="reveal md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="relative">
                <Hexagon className="w-8 h-8 text-vortex-green" strokeWidth={1.5} />
                <span className="absolute inset-0 grid place-items-center text-vortex-black font-bold text-xs">
                  V
                </span>
              </span>
              <span className="font-display font-bold text-white text-lg">
                VORTEX Technology Hub
              </span>
            </div>
            <p className="mt-5 text-sm text-vortex-gray/60 leading-relaxed max-w-xs">
              An AI-integrated technology company focused on education, software,
              innovation, automation, startups, and future technologies.
            </p>
          </div>

          {/* Nav */}
          <div className="reveal" data-reveal-delay="100">
            <p className="text-vortex-green font-mono text-[11px] tracking-[0.25em] uppercase mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => go(n.id)}
                    className="text-sm text-vortex-gray/70 hover:text-vortex-green transition-colors"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="reveal" data-reveal-delay="200">
            <p className="text-vortex-green font-mono text-[11px] tracking-[0.25em] uppercase mb-5">
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
                      className="group flex items-start gap-3 text-sm text-vortex-gray/70 hover:text-white transition-colors"
                    >
                      <span className="mt-0.5 w-9 h-9 shrink-0 rounded-lg bg-vortex-green/10 border border-vortex-green/20 grid place-items-center transition-all duration-300 group-hover:bg-vortex-green/20 group-hover:scale-110">
                        <Icon className="w-4 h-4 text-vortex-green" strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-vortex-gray/40">
                          {c.label}
                        </span>
                        <span className="block group-hover:text-vortex-green transition-colors break-words">
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
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-vortex-gray/50 font-mono">
            © {new Date().getFullYear()} VORTEX Global Technologies. All rights reserved.
          </p>
          <p className="text-xs text-vortex-gray/50 font-mono">
            Learn Today. <span className="text-vortex-green">Lead Tomorrow.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

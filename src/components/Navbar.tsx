import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'features', label: 'Why VORTEX' },
  { id: 'vision', label: 'Vision' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'pt-2 sm:pt-3 pb-2' : 'pt-4 sm:pt-4 pb-2'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-2 transition-all duration-500 ${
            scrolled
              ? 'glass border border-slate-200/80 shadow-md shadow-slate-900/5'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Logo Brand */}
          <button onClick={() => go('home')} className="flex items-center text-left focus:outline-none group py-0.5">
            <img
              src="/src/public/logos/vortexx-logo-horizontal-blue-violet.png"
              alt="VORTEX Global Technologies"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center justify-center gap-1 sm:gap-1.5">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`relative px-4 sm:px-4.5 py-2.5 text-[17px] transition-colors duration-300 ${
                  active === link.id
                    ? 'text-vortex-purple font-semibold'
                    : 'text-slate-900 font-medium hover:text-vortex-purple'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-vortex-purple shadow-glow-sm rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-900 p-2.5 hover:bg-slate-100/80 rounded-xl transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            open ? 'max-h-96 mt-3' : 'max-h-0'
          }`}
        >
          <div className="glass rounded-2xl p-4 flex flex-col gap-1 border border-slate-200/80 shadow-lg">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`text-left px-5 py-3.5 rounded-xl text-[17px] font-medium transition-colors ${
                  active === link.id
                    ? 'text-vortex-purple bg-vortex-purple/10 font-semibold'
                    : 'text-slate-900 hover:text-vortex-purple hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

import { useEffect, useState } from 'react';
import { Menu, X, Hexagon } from 'lucide-react';
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
    const onScroll = () => setScrolled(window.scrollY > 24);
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
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <nav
          className={`flex items-center justify-center rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled ? 'glass shadow-glow-sm' : 'bg-transparent'
          }`}
        >
          {/* Desktop links */}
          <div className="hidden md:flex items-center justify-center gap-1">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  active === link.id ? 'text-vortex-green' : 'text-vortex-gray hover:text-white'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-vortex-green shadow-glow-sm" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            open ? 'max-h-96 mt-3' : 'max-h-0'
          }`}
        >
          <div className="glass rounded-2xl p-4 flex flex-col gap-1">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active === link.id
                    ? 'text-vortex-green bg-vortex-green/10'
                    : 'text-vortex-gray hover:text-white hover:bg-white/5'
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

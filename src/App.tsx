import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Vision from '@/components/Vision';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import InstitutePage from '@/components/InstitutePage';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function getInitialRoute(): 'home' | 'institute' {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (path === '/institute' || path === '/institute/' || hash === '#/institute') {
    return 'institute';
  }
  return 'home';
}

function App() {
  const [activePage, setActivePage] = useState<'home' | 'institute'>(getInitialRoute);
  useScrollReveal(activePage);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (activePage === 'institute') {
      document.title = 'AI Integrated Technology Institute | VORTEX Academy';
    } else {
      document.title = 'VORTEX Global Technologies | AI & Software Company in Manjeri, Malappuram';
    }
  }, [activePage]);

  const showInstitute = () => {
    if (window.location.pathname !== '/institute') {
      window.history.pushState({ page: 'institute' }, '', '/institute');
    }
    setActivePage('institute');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showHome = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({ page: 'home' }, '', '/');
    }
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-vortex-black text-vortex-gray overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        {activePage === 'home' ? (
          <>
            <Hero />
            <About />
            <Services onOpenInstitute={showInstitute} />
            <Features />
            <Vision />
          </>
        ) : (
          <InstitutePage onBack={showHome} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

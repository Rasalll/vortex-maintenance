import { useState } from 'react';
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

function App() {
  const [activePage, setActivePage] = useState<'home' | 'institute'>('home');
  useScrollReveal(activePage);

  const showInstitute = () => {
    setActivePage('institute');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showHome = () => {
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

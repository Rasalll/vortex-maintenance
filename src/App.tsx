import { useState, useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Vision from '@/components/Vision';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import InstitutePage from '@/components/InstitutePage';
import ITSolutionsPage from '@/components/ITSolutionsPage';
import AutomationProductsPage from '@/components/AutomationProductsPage';
import VortexChatbot from '@/components/chatbot/VortexChatbot';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const AdminDashboard = lazy(() => import('@/components/AdminDashboard'));

export type ActivePage = 'home' | 'institute' | 'it-solutions' | 'automation';

function getInitialRoute(): ActivePage {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path === '/institute' || path === '/institute/' || hash === '#/institute') {
    return 'institute';
  }
  if (path === '/it-solutions' || path === '/it-solutions/' || hash === '#/it-solutions') {
    return 'it-solutions';
  }
  if (path === '/automation-products' || path === '/automation-products/' || hash === '#/automation-products') {
    return 'automation';
  }
  return 'home';
}

function App() {
  const [activePage, setActivePage] = useState<ActivePage>(getInitialRoute);
  const [isAdminRoute, setIsAdminRoute] = useState(() => typeof window !== 'undefined' && window.location.pathname.toLowerCase().startsWith('/admin'));
  useScrollReveal(activePage);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getInitialRoute());
      setIsAdminRoute(window.location.pathname.toLowerCase().startsWith('/admin'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (isAdminRoute) {
      document.title = 'VORTEX CMS | Admin';
    } else if (activePage === 'institute') {
      document.title = 'AI Integrated Technology Institute | VORTEX Academy';
    } else if (activePage === 'it-solutions') {
      document.title = 'AI Integrated IT Solutions | VORTEX Enterprise Solutions';
    } else if (activePage === 'automation') {
      document.title = 'AI Integrated Automation Products | VORTEX Products';
    } else {
      document.title = 'VORTEX Global Technologies | AI & Software Company in Manjeri, Malappuram';
    }
  }, [activePage, isAdminRoute]);

  if (isAdminRoute) return <Suspense fallback={<div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-600">Loading CMS…</div>}><AdminDashboard /></Suspense>;

  const showPage = (page: ActivePage) => {
    let path = '/';
    if (page === 'institute') path = '/institute';
    if (page === 'it-solutions') path = '/it-solutions';
    if (page === 'automation') path = '/automation-products';

    if (window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showHome = () => showPage('home');

  const showServices = () => {
    showHome();
    window.setTimeout(() => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleOpenService = (serviceId: string) => {
    if (serviceId === 'institute') showPage('institute');
    else if (serviceId === 'it-solutions') showPage('it-solutions');
    else if (serviceId === 'automation') showPage('automation');
  };

  return (
    <div className="relative min-h-screen bg-vortex-black text-vortex-gray overflow-x-hidden">
      <ScrollProgress />
      <Navbar activePage={activePage} onNavigateHome={showHome} />
      <main>
        {activePage === 'home' && (
          <>
            <Hero />
            <About />
            <Services onOpenService={handleOpenService} />
            <Features />
            <Vision />
          </>
        )}
        {activePage === 'institute' && <InstitutePage onBack={showHome} />}
        {activePage === 'it-solutions' && <ITSolutionsPage onBack={showServices} />}
        {activePage === 'automation' && <AutomationProductsPage />}
      </main>
      <Footer />
      <Analytics />
      <VortexChatbot />
    </div>
  );
}

export default App;

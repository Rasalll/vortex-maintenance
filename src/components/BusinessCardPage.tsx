import { useEffect, useState } from 'react';
import { ArrowLeft, QrCode, UserRoundX } from 'lucide-react';
import { getBusinessCardProfile } from '@/data/businessCards';
import BusinessCardHeader from '@/components/business-card/BusinessCardHeader';
import ContactDetails from '@/components/business-card/ContactDetails';
import SocialLinks from '@/components/business-card/SocialLinks';
import QRCode from '@/components/business-card/QRCode';
import SaveContactButton from '@/components/business-card/SaveContactButton';

function setPageMetadata(title: string, description: string) {
  document.title = title;
  const setMeta = (selector: string, attribute: string, content: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(selector);
    if (!element) {
      element = document.createElement('meta');
      if (selector.includes('property=')) element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] ?? '');
      else element.name = selector.match(/name="([^"]+)"/)?.[1] ?? '';
      document.head.appendChild(element);
    }
    element.setAttribute(attribute, content);
  };
  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
}

export default function BusinessCardPage({ username }: { username: string }) {
  const profile = getBusinessCardProfile(username);
  const [showQrCode, setShowQrCode] = useState(false);
  const description = profile ? `${profile.name} — ${profile.designation} at ${profile.company}. Save contact details and connect.` : 'The requested VORTEX Global Technologies digital business card could not be found.';

  useEffect(() => {
    setPageMetadata(profile ? `${profile.name} | ${profile.company}` : 'Business Card Not Found | VORTEX', description);
    return () => setPageMetadata('VORTEX Global Technologies — Learn Today. Lead Tomorrow.', 'VORTEX Global Technologies is an AI-integrated technology company delivering AI education, software solutions, automation, IoT, startup incubation, and digital marketing.');
  }, [profile, description]);

  if (!profile) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 px-5 py-12"><div className="max-w-md text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-violet-100 text-violet-700"><UserRoundX size={30} /></div><h1 className="mt-6 font-display text-3xl font-bold text-slate-900">Card not found</h1><p className="mt-3 text-slate-600">We couldn't find a business card for “{username}”. Check the link and try again.</p><a href="/" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white"><ArrowLeft size={16} />Return to VORTEX</a></div></main>;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10 sm:px-8 sm:py-16">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[min(90vw,56rem)] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-200/60 to-violet-200/70 blur-3xl" />
      <div className="relative mx-auto max-w-5xl">
        <a href="/" className="mb-7 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-violet-700"><ArrowLeft size={16} />VORTEX Global Technologies</a>
        <div className="overflow-hidden rounded-[2rem] border border-white bg-white/90 shadow-2xl shadow-slate-900/10 backdrop-blur">
          <div className="h-2 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500" />
          <div className="mx-auto grid w-full max-w-3xl gap-9 p-6 sm:p-10 lg:p-14">
            <div className="min-w-0">
              <BusinessCardHeader profile={profile} />
              <div className="mx-auto mt-8 max-w-xl"><ContactDetails profile={profile} /></div>
              <div className="mx-auto mt-6 max-w-xl"><SocialLinks profile={profile} /></div>
              <div className="mx-auto mt-8 flex w-full max-w-xl items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowQrCode((visible) => !visible)}
                  aria-expanded={showQrCode}
                  className="inline-flex min-h-14 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-2 text-xs font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-300 sm:gap-2.5 sm:px-5 sm:text-base"
                >
                  <QrCode size={18} aria-hidden="true" />
                  {showQrCode ? 'Hide QR Code' : 'Show QR Code'}
                </button>
                <SaveContactButton profile={profile} variant="secondary" />
              </div>
            </div>
            {showQrCode && profile.qrImage && <div className="flex justify-center"><QRCode src={profile.qrImage} name={profile.name} /></div>}
          </div>
          <div className="border-t border-slate-100 px-6 py-4 text-center text-xs text-slate-400 sm:px-10">VORTEX Global Technologies <span aria-hidden="true">·</span> Learn Today. Lead Tomorrow.</div>
        </div>
      </div>
    </main>
  );
}

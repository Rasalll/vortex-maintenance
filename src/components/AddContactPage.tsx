import { useEffect } from 'react';
import { ArrowLeft, Building2 } from 'lucide-react';
import { getBusinessCardProfile } from '@/data/businessCards';
import ContactDetails from '@/components/business-card/ContactDetails';
import SaveContactButton from '@/components/business-card/SaveContactButton';

export default function AddContactPage({ username }: { username: string }) {
  const profile = getBusinessCardProfile(username);

  useEffect(() => {
    document.title = profile ? `Add ${profile.name} to Contacts | VORTEX` : 'Contact Not Found | VORTEX';
    const description = profile ? `Add ${profile.name} from ${profile.company} to your contacts.` : 'The requested VORTEX contact could not be found.';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [profile]);

  if (!profile) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 px-5"><section className="text-center"><h1 className="font-display text-3xl font-bold text-slate-900">Contact not found</h1><p className="mt-3 text-slate-600">This business card is unavailable.</p><a className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white" href="/">Return to VORTEX</a></section></main>;
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-8">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[min(90vw,56rem)] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-200/60 to-violet-200/70 blur-3xl" />
      <section className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white bg-white/95 p-6 shadow-2xl shadow-slate-900/10 sm:p-10">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500" />
        <a href={`/business-card/${encodeURIComponent(profile.username)}`} className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-violet-700"><ArrowLeft size={16} />Back to business card</a>
        <div className="mb-7 flex items-center gap-4">
          {profile.companyLogo ? <img src={profile.companyLogo} alt={`${profile.company} logo`} className="h-12 w-auto max-w-36 object-contain" /> : <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-100 text-violet-700"><Building2 size={22} /></span>}
          <div><h1 className="font-display text-2xl font-bold text-slate-950">Add to Contacts</h1><p className="mt-0.5 text-sm text-slate-500">Review the contact details below.</p></div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="font-display text-xl font-bold text-slate-900">{profile.name}</p>
          <p className="mt-1 text-sm text-slate-600">{profile.designation}</p>
          <p className="text-sm text-slate-600">{profile.company}</p>
        </div>
        <div className="mt-5"><ContactDetails profile={profile} /></div>
        <div className="mt-7"><SaveContactButton profile={profile} action="share" label="Save to Contacts" /></div>
        <p className="mt-3 text-center text-xs leading-relaxed text-slate-400">Choose Contacts in your phone's share options to review and save. If a contact file opens or downloads, open it to continue in your contacts app.</p>
      </section>
    </main>
  );
}

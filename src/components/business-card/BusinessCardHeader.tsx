import { Building2 } from 'lucide-react';
import type { BusinessCardProfile } from '@/data/businessCards';

export default function BusinessCardHeader({ profile }: { profile: BusinessCardProfile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {profile.companyLogo ? (
        <img src={profile.companyLogo} alt={`${profile.company} logo`} className="mb-7 h-12 w-auto object-contain sm:h-14" />
      ) : (
        <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg">
          <Building2 aria-hidden="true" />
        </div>
      )}
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-700">Digital Business Card</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{profile.name}</h1>
      <p className="mt-2 text-base font-medium text-slate-600 sm:text-lg">{profile.designation}</p>
      <p className="mt-1 text-sm text-slate-500">{profile.company}</p>
    </header>
  );
}

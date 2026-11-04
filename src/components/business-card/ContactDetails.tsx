import { AtSign, Globe2, MapPin, Phone } from 'lucide-react';
import type { BusinessCardProfile } from '@/data/businessCards';

export default function ContactDetails({ profile }: { profile: BusinessCardProfile }) {
  const details = [
    { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`, Icon: Phone },
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: AtSign },
    ...(profile.website ? [{ label: 'Website', value: profile.website.replace(/^https?:\/\//, '').replace(/\/$/, ''), href: profile.website, Icon: Globe2 }] : []),
    ...(profile.address ? [{ label: 'Address', value: profile.address, href: `https://maps.google.com/?q=${encodeURIComponent(profile.address)}`, Icon: MapPin }] : []),
  ];

  return (
    <div className="space-y-3">
      {details.map(({ label, value, href, Icon }) => (
        <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 transition hover:border-violet-300 hover:shadow-sm">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-violet-100 text-violet-700"><Icon size={19} aria-hidden="true" /></span>
          <span className="min-w-0"><span className="block text-xs font-medium uppercase tracking-wider text-slate-400">{label}</span><span className="mt-0.5 block break-all text-sm font-semibold text-slate-800">{value}</span></span>
        </a>
      ))}
    </div>
  );
}

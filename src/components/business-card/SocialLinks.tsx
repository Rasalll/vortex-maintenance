import { Instagram, Linkedin, MessageCircle } from 'lucide-react';
import type { BusinessCardProfile } from '@/data/businessCards';

export default function SocialLinks({ profile }: { profile: BusinessCardProfile }) {
  const links = [
    { label: 'Instagram', href: `https://instagram.com/${profile.instagram.replace(/^@/, '')}`, Icon: Instagram },
    ...(profile.linkedin ? [{ label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin }] : []),
    ...(profile.whatsapp ? [{ label: 'WhatsApp', href: `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`, Icon: MessageCircle }] : []),
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700">
          <Icon size={17} aria-hidden="true" />{label}
        </a>
      ))}
    </div>
  );
}

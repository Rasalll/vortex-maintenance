import { ContactRound } from 'lucide-react';
import type { BusinessCardProfile } from '@/data/businessCards';

function escapeVCard(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

export default function SaveContactButton({
  profile,
  action = 'open',
  label = 'Save Contact',
  variant = 'primary',
}: {
  profile: BusinessCardProfile;
  action?: 'open' | 'share';
  label?: string;
  variant?: 'primary' | 'secondary';
}) {
  const save = async () => {
    const [firstName, ...lastNames] = profile.name.trim().split(/\s+/);
    const fields = [
      'BEGIN:VCARD', 'VERSION:3.0', `FN:${escapeVCard(profile.name)}`,
      `N:${escapeVCard(lastNames.join(''))};${escapeVCard(firstName)};;;`,
      `ORG:${escapeVCard(profile.company)}`, `TITLE:${escapeVCard(profile.designation)}`,
      `TEL;TYPE=CELL:${escapeVCard(profile.phone)}`, `EMAIL;TYPE=INTERNET:${escapeVCard(profile.email)}`,
      ...(profile.website ? [`URL:${escapeVCard(profile.website)}`] : []),
      `X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/${profile.instagram.replace(/^@/, '')}`,
      ...(profile.linkedin ? [`X-SOCIALPROFILE;TYPE=linkedin:${escapeVCard(profile.linkedin)}`] : []),
      ...(profile.whatsapp ? [`X-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`] : []),
      ...(profile.address ? [`ADR;TYPE=WORK:;;${escapeVCard(profile.address)};;;;`] : []),
      'END:VCARD', '',
    ];
    const blob = new Blob([fields.join('\r\n')], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    if (action === 'share') {
      const contactFile = new File([blob], `${profile.username}.vcf`, { type: 'text/vcard' });
      if (navigator.canShare?.({ files: [contactFile] }) && navigator.share) {
        try {
          await navigator.share({ title: `Save ${profile.name} to Contacts`, files: [contactFile] });
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') return;
        }
      }

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 1 && /Macintosh/i.test(navigator.userAgent));
      if (!isMobile) {
        link.download = `${profile.username}.vcf`;
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        return;
      }

      // Navigating to a vCard lets mobile browsers hand it to the OS contact importer.
      window.location.href = url;
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      return;
    }

    link.download = `${profile.username}.vcf`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const layoutClass = `inline-flex min-h-14 min-w-0 ${action === 'open' ? 'flex-1' : 'w-full'} items-center justify-center gap-2 rounded-full px-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-4 sm:gap-2.5 sm:px-5 sm:text-base`;
  const styleClass = variant === 'primary'
    ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-600/20 hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-violet-300'
    : 'border border-violet-200 bg-white text-violet-700 shadow-sm hover:border-violet-300 hover:bg-violet-50 focus-visible:ring-violet-200';
  const className = `${layoutClass} ${styleClass}`;
  if (action === 'open') {
    return <a href={`/business-card/${encodeURIComponent(profile.username)}/contact`} className={className}><ContactRound size={20} aria-hidden="true" />{label}</a>;
  }
  return <button type="button" onClick={save} className={className}><ContactRound size={20} aria-hidden="true" />{label}</button>;
}

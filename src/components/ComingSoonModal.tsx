import { useEffect } from 'react';
import { X, Sparkles, Clock, Phone, MessageCircle } from 'lucide-react';

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
};

export default function ComingSoonModal({ title, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const whatsappMessage = encodeURIComponent('Hi VORTEX, I want to know more about you');
  const whatsappUrl = `https://wa.me/918606101333?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-xl border border-vortex-purple/30 shadow-2xl animate-scale-in overflow-hidden z-10 text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 grid place-items-center text-slate-600 hover:text-vortex-purple hover:bg-slate-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative px-8 py-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-vortex-purple/10 border border-vortex-purple/30 mb-5">
            <Clock className="w-7 h-7 text-vortex-purple" strokeWidth={1.5} />
          </div>

          <div className="inline-flex items-center gap-2 text-vortex-purple font-mono text-[11px] tracking-[0.25em] uppercase mb-2 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Service Launching Soon
          </div>

          <h3 className="font-display font-bold text-slate-900 text-2xl leading-tight">
            {title}
          </h3>

          <p className="mt-3 text-2xl font-display font-bold text-vortex-purple text-glow tracking-tight">
            Details Soon
          </p>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            We are actively preparing this vertical. Contact our team directly for advance details or custom requirements.
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+918606101333"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 transition-all duration-300 hover:border-vortex-purple hover:text-vortex-purple hover:shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-vortex-purple" />
              Call Direct
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-emerald-500 hover:shadow-md hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

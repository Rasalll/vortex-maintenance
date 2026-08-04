import { useEffect } from 'react';
import { X, Sparkles, Clock } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-vortex-black/85 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-3xl glass border border-vortex-green/30 shadow-glow-lg animate-scale-in overflow-hidden z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-light grid place-items-center text-vortex-gray hover:text-vortex-green transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-vortex-green/10 border border-vortex-green/30 mb-6">
            <Clock className="w-8 h-8 text-vortex-green" strokeWidth={1.5} />
          </div>

          <div className="inline-flex items-center gap-2 text-vortex-green font-mono text-[11px] tracking-[0.25em] uppercase mb-3 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Upcoming Service
          </div>

          <h3 className="font-display font-bold text-white text-2xl leading-tight">
            {title}
          </h3>

          <p className="mt-4 text-3xl font-display font-bold text-vortex-green text-glow tracking-tight">
            Upcoming
          </p>

          <p className="mt-3 text-sm text-vortex-gray/70 leading-relaxed">
            We are actively preparing this vertical. Stay tuned as we launch new AI-integrated features.
          </p>

          <button
            onClick={onClose}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-vortex-green px-7 py-3 text-sm font-semibold text-vortex-black transition-all duration-300 hover:shadow-glow hover:scale-105"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-vortex-green via-vortex-green to-vortex-green/60 shadow-glow-sm transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

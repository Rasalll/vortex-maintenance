import React, { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
} from 'motion/react';
import { twMerge } from 'tailwind-merge';

// VORTEX brand gradient — vivid purple/violet/indigo cycle
const STOPS = [
  '#7C3AED',  // vortex-purple
  '#A855F7',  // purple-500
  '#8B5CF6',  // violet-500
  '#6366F1',  // indigo-500
  '#4F46E5',  // indigo-600
  '#818CF8',  // indigo-400
  '#A78BFA',  // violet-400
  '#7C3AED',  // back to vortex-purple (seamless loop)
];

interface AIGradientBorderProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  duration?: number; // seconds per full rotation, default 3
}

export default function AIGradientBorder({
  children,
  className,
  containerClassName,
  duration = 3,
}: AIGradientBorderProps) {
  const angle = useMotionValue(0);

  const gradient = useMotionTemplate`conic-gradient(from ${angle}deg at 50% 50%, ${STOPS.join(', ')})`;

  useEffect(() => {
    const ctrl = animate(angle, 360, {
      duration,
      repeat: Infinity,
      ease: 'linear',
      repeatType: 'loop',
    });
    return () => ctrl.stop();
  }, [angle, duration]);

  return (
    <div className={twMerge('relative', containerClassName)}>

      {/* ── Outer glow bloom — large, soft, very visible ── */}
      <motion.div
        style={{ background: gradient }}
        className="absolute -inset-[3px] rounded-2xl sm:rounded-3xl opacity-60 blur-[18px]"
        aria-hidden="true"
      />

      {/* ── Solid rotating border ring ── */}
      <motion.div
        style={{ background: gradient }}
        className="absolute -inset-[3px] rounded-2xl sm:rounded-3xl"
        aria-hidden="true"
      />

      {/* ── Edge-only spill glow (masked so interior stays clean) ── */}
      <motion.div
        style={{ background: gradient }}
        className="ai-glow-spill-mask absolute -inset-[3px] rounded-2xl sm:rounded-3xl opacity-80 blur-[8px]"
        aria-hidden="true"
      />

      {/* ── Inner card — sits on top, inset reveals the border ring ── */}
      <div
        className={twMerge(
          'relative m-[3px] rounded-[calc(1rem-3px)] sm:rounded-[calc(1.5rem-3px)] bg-white/98 backdrop-blur-sm',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

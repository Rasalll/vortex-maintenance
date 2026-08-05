import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react';
import { gsap } from 'gsap';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface CardSwapProps {
  children: ReactNode[];
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  easing?: string;
  className?: string;
}

/* ─── CardSwap ───────────────────────────────────────────────────────────── */
export default function CardSwap({
  children,
  width = 520,
  height = 420,
  cardDistance = 45,
  verticalDistance = 55,
  delay = 3000,
  pauseOnHover = true,
  easing = 'linear',
  className = '',
}: CardSwapProps) {
  const cards = Array.isArray(children) ? children : [children];
  const count = cards.length;

  // We maintain an ordered index array; index 0 = front card
  const [order, setOrder] = useState<number[]>(cards.map((_, i) => i));
  const paused = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Compute transform for each stack position ─────────────────────────── */
  const getTransform = useCallback(
    (stackPos: number) => {
      // stackPos 0 = front, 1 = second, etc.
      const MAX_VISIBLE = Math.min(count, 4);
      const scale = 1 - stackPos * 0.04;
      const y = -stackPos * verticalDistance;
      const x = stackPos % 2 === 0 ? stackPos * cardDistance * 0.3 : -stackPos * cardDistance * 0.3;
      const z = -stackPos * 80;
      const rotateZ = stackPos % 2 === 0 ? stackPos * 1.5 : -stackPos * 1.5;
      const opacity = stackPos >= MAX_VISIBLE ? 0 : 1 - stackPos * 0.08;
      return { x, y, z, scale, rotateZ, opacity };
    },
    [count, cardDistance, verticalDistance]
  );

  /* ── Apply transforms to all cards ─────────────────────────────────────── */
  const applyTransforms = useCallback(
    (currentOrder: number[], animate = true) => {
      currentOrder.forEach((cardIndex, stackPos) => {
        const el = cardRefs.current[cardIndex];
        if (!el) return;
        const t = getTransform(stackPos);
        const zIndex = count - stackPos;

        if (animate) {
          gsap.to(el, {
            x: t.x,
            y: t.y,
            z: t.z,
            scale: t.scale,
            rotateZ: t.rotateZ,
            opacity: t.opacity,
            zIndex,
            duration: 0.65,
            ease: easing === 'linear' ? 'power2.inOut' : 'back.out(1.2)',
            overwrite: true,
          });
        } else {
          gsap.set(el, { x: t.x, y: t.y, z: t.z, scale: t.scale, rotateZ: t.rotateZ, opacity: t.opacity, zIndex });
        }
      });
    },
    [count, easing, getTransform]
  );

  /* ── Cycle: move front card to the back ─────────────────────────────────── */
  const cycle = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev.slice(1), prev[0]];
      applyTransforms(next, true);
      return next;
    });
  }, [applyTransforms]);

  /* ── Init & start interval ───────────────────────────────────────────────── */
  useEffect(() => {
    applyTransforms(order, false);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!paused.current) cycle();
    }, delay);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cycle, delay]);

  const handleMouseEnter = () => {
    if (pauseOnHover) paused.current = true;
  };
  const handleMouseLeave = () => {
    if (pauseOnHover) paused.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{ width, height, perspective: 1200 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          ref={(el) => (cardRefs.current[i] = el)}
          className="absolute inset-0"
          style={{
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
          }}
          onClick={() => {
            // Clicking a back card brings it forward immediately
            const stackPos = order.indexOf(i);
            if (stackPos > 0) {
              setOrder((prev) => {
                const next = [...prev];
                next.splice(stackPos, 1);
                next.unshift(i);
                applyTransforms(next, true);
                return next;
              });
            }
          }}
        >
          {card}
        </div>
      ))}
    </div>
  );
}

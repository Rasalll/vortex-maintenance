import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: { opacity?: number; y?: number; x?: number; scale?: number };
  to?: { opacity?: number; y?: number; x?: number; scale?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  highlightWords?: { [key: string]: string };
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text = '',
  className = '',
  delay = 40,
  duration = 0.8,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  tag = 'h1',
  highlightWords = {},
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const elements = containerRef.current.querySelectorAll('.split-char');
      if (!elements.length) return;

      gsap.fromTo(
        elements,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top 85%`,
            once: true,
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
        }
      );
    },
    {
      dependencies: [text, delay, duration, ease, fontsLoaded],
      scope: containerRef,
    }
  );

  const words = text.split(' ');
  const Tag = tag;

  return (
    <Tag
      ref={containerRef as any}
      className={`inline-block ${className}`}
      style={{ textAlign, overflow: 'hidden' }}
    >
      {words.map((word, wIdx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
        const highlightClass = highlightWords[cleanWord] || highlightWords[word] || '';

        return (
          <span
            key={`word-${wIdx}`}
            className={`inline-block whitespace-nowrap mr-[0.25em] ${highlightClass}`}
          >
            {word.split('').map((char, cIdx) => (
              <span
                key={`char-${wIdx}-${cIdx}`}
                className="split-char inline-block will-change-transform opacity-0"
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

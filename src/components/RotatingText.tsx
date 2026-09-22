import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface RotatingTextProps {
  texts?: string[];
  rotationInterval?: number;
  className?: string;
  staggerDuration?: number;
}

export default function RotatingText({
  texts = ['better', 'brighter', 'stronger', 'smarter', 'future-ready'],
  rotationInterval = 2400,
  className = '',
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!texts || texts.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts, rotationInterval]);

  const currentWord = texts[index] || texts[0] || '';

  return (
    <span
      className={`relative inline-flex items-baseline overflow-hidden align-baseline ${className}`}
      style={{ verticalAlign: 'baseline' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentWord}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

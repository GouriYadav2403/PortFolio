'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxWatermarkProps {
  text: string;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down';
}

export const ParallaxWatermark: React.FC<ParallaxWatermarkProps> = ({
  text,
  speed = 60,
  className = '',
  direction = 'down',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const distance = direction === 'down' ? speed : -speed;
  const y = useTransform(smoothProgress, [0, 1], [-distance, distance]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10 flex items-center justify-center"
    >
      <motion.span
        style={{ y }}
        className={`font-serif font-black tracking-widest uppercase opacity-[0.035] text-coffee-dark whitespace-nowrap leading-none ${className}`}
      >
        {text}
      </motion.span>
    </div>
  );
};

'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView, Variant } from 'framer-motion';

type AnimationType = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleUp';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: AnimationType;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  type = 'fadeUp',
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getVariants = () => {
    switch (type) {
      case 'fadeLeft':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
        };
      case 'fadeRight':
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
        };
      case 'scaleUp':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
        };
      case 'fadeUp':
      default:
        return {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

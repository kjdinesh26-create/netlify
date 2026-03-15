'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

type AnimationType = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleUp';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: AnimationType;
  enableScrollBlur?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  type = 'fadeUp',
  enableScrollBlur = true,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Blur increases as section leaves the viewport at the top
  const blurValue = useTransform(scrollYProgress, [0.7, 0.95], [0, 10]);
  const opacityValue = useTransform(scrollYProgress, [0.7, 0.98], [1, 0.1]);

  const getVariants = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const xOffset = isMobile ? 20 : 50;
    const yOffset = isMobile ? 20 : 40;

    switch (type) {
      case 'fadeLeft':
        return {
          initial: { opacity: 0, x: -xOffset },
          animate: { opacity: 1, x: 0 },
        };
      case 'fadeRight':
        return {
          initial: { opacity: 0, x: xOffset },
          animate: { opacity: 1, x: 0 },
        };
      case 'scaleUp':
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
        };
      case 'fadeUp':
      default:
        return {
          initial: { opacity: 0, y: yOffset },
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
      style={{ 
        willChange: 'opacity, transform, filter',
        filter: enableScrollBlur ? `blur(${blurValue}px)` : undefined,
        opacity: enableScrollBlur ? opacityValue : undefined
      }}
    >
      {children}
    </motion.div>
  );
}

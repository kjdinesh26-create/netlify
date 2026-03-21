'use client';

import { motion } from 'framer-motion';
import styles from './Background.module.css';

const techLogos = [
  { name: 'JS', top: '15%', left: '5%' },
  { name: 'Python', top: '25%', right: '10%' },
  { name: 'React', bottom: '20%', left: '15%' },
  { name: 'ML', bottom: '30%', right: '5%' },
  { name: 'Next.js', top: '60%', left: '20%' },
  { name: 'TensorFlow', top: '70%', right: '25%' },
];

import { useState, useEffect } from 'react';

export default function Background() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visibleLogos = isMobile ? techLogos.slice(0, 3) : techLogos;

  return (
    <div className={styles.wrapper}>
      {/* Static grid */}
      <div className={styles.grid} />
      
      {/* Animated noise/grain */}
      <div className={styles.noise} />

      {/* Tech stack logos */}
      {techLogos.map((tech, i) => (
        <motion.div
          key={tech.name}
          className={styles.techLogo}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          style={{ 
            top: tech.top, 
            left: tech.left, 
            right: tech.right, 
            bottom: tech.bottom,
            willChange: 'transform, opacity'
          }}
        >
          {tech.name}
        </motion.div>
      ))}

      {/* Moving blobs/orbs */}
      <motion.div 
        className={styles.blob} 
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ 
          top: '10%', 
          left: '10%', 
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15), transparent 70%)',
          willChange: 'transform'
        }}
      />
      {!isMobile && (
        <>
          <motion.div 
            className={styles.blob} 
            animate={{
              x: [0, -150, 80, 0],
              y: [0, 50, -120, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              bottom: '20%', 
              right: '15%', 
              background: 'radial-gradient(circle, rgba(123, 47, 247, 0.15), transparent 70%)',
              willChange: 'transform'
            }}
          />
          <motion.div 
            className={styles.blob} 
            animate={{
              x: [0, 80, -100, 0],
              y: [0, 150, -50, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              top: '40%', 
              left: '45%', 
              background: 'radial-gradient(circle, rgba(244, 114, 182, 0.1), transparent 70%)',
              willChange: 'transform'
            }}
          />
        </>
      )}
    </div>
  );
}

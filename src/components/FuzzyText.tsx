'use client';

import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';

interface FuzzyTextProps {
  text: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  baseFrequency?: string;
  numOctaves?: number;
  scale?: number;
  hoverScale?: number;
  className?: string;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  text,
  fontSize = '5rem',
  fontWeight = 900,
  color = '#fff',
  baseFrequency = '0.02 0.05',
  numOctaves = 3,
  scale = 2,
  hoverScale = 5,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const filterId = useId();

  return (
    <div 
      className={`fuzzy-text-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-block',
        position: 'relative',
        cursor: 'default',
        padding: '0.2em',
      }}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={isHovered ? numOctaves : 1}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isHovered ? hoverScale : scale}
            />
          </filter>
        </defs>
      </svg>

      <motion.span
        style={{
          display: 'block',
          fontSize: fontSize,
          fontWeight: fontWeight,
          color: color,
          filter: `url(#${filterId})`,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
          willChange: 'filter, transform',
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default FuzzyText;

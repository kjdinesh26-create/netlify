"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

/* --- Stage 1: Loader (Dominos) --- */
const Loader = () => {
  return (
    <LoaderWrapper>
      <div className="spinner">
        <span /> <span /> <span /> <span />
        <span /> <span /> <span /> <span />
      </div>
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000;

  .spinner {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: -75px;
  }

  .spinner span {
    position: absolute;
    top: 50%;
    left: var(--left);
    width: 35px;
    height: 7px;
    background: #ffff;
    animation: dominos 1s ease infinite;
    box-shadow: 2px 2px 3px 0px black;
  }

  .spinner span:nth-child(1) { --left: 80px; animation-delay: 0.125s; }
  .spinner span:nth-child(2) { --left: 70px; animation-delay: 0.3s; }
  .spinner span:nth-child(3) { left: 60px; animation-delay: 0.425s; }
  .spinner span:nth-child(4) { animation-delay: 0.54s; left: 50px; }
  .spinner span:nth-child(5) { animation-delay: 0.665s; left: 40px; }
  .spinner span:nth-child(6) { animation-delay: 0.79s; left: 30px; }
  .spinner span:nth-child(7) { animation-delay: 0.915s; left: 20px; }
  .spinner span:nth-child(8) { left: 10px; }

  @keyframes dominos {
    50% { opacity: 0.7; }
    75% { transform: rotate(90deg); }
    80% { opacity: 1; }
  }
`;

/* --- Stage 2: Matrix Pattern (User's Styled Version) --- */
const Pattern = () => {
  return (
    <PatternWrapper>
      <div className="matrix-container">
        {[...Array(2)].map((_, i) => (
          <div className="matrix-pattern" key={i}>
            {[...Array(20)].map((_, j) => (
              <div className="matrix-column" key={j} />
            ))}
          </div>
        ))}
      </div>
    </PatternWrapper>
  );
};

const PatternWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;

  .matrix-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
  }

  .matrix-pattern {
    position: relative;
    width: 1000px;
    height: 100%;
    flex-shrink: 0;
  }

  .matrix-column {
    position: absolute;
    top: -100%;
    width: 20px;
    height: 100%;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
    animation: fall linear infinite;
    white-space: nowrap;
  }

  .matrix-column::before {
    content: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      #ffffff 0%,
      #ffffff 5%,
      #00ff41 10%,
      #00ff41 20%,
      #00dd33 30%,
      #00bb22 40%,
      #009911 50%,
      #007700 60%,
      #005500 70%,
      #003300 80%,
      rgba(0, 255, 65, 0.5) 90%,
      transparent 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    writing-mode: vertical-lr;
    letter-spacing: 1px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ${Array.from({ length: 40 }).map((_, i) => `
    .matrix-column:nth-child(${i + 1}) {
      left: ${i * 25}px;
      animation-delay: -${(Math.random() * 4).toFixed(1)}s;
      animation-duration: ${(2.5 + Math.random() * 2).toFixed(1)}s;
    }
  `).join('')}

  .matrix-column:nth-child(odd)::before {
    content: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン123456789";
  }

  .matrix-column:nth-child(even)::before {
    content: "ガギグゲゴザジズゼゾタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  @keyframes fall {
    0% { transform: translateY(-10%); opacity: 1; }
    100% { transform: translateY(200%); opacity: 0; }
  }

  @media (max-width: 768px) {
    .matrix-column { font-size: 14px; line-height: 16px; width: 18px; }
  }
`;

/* --- Stage 3: Decrypted Text (User's Full Logic) --- */
const decryptStyles = {
  wrapper: { display: 'inline-block', whiteSpace: 'pre-wrap' as const },
  srOnly: {
    position: 'absolute' as const, width: '1px', height: '1px', padding: 0,
    margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0
  }
};

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
}

function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(true);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
  const availableChars = useMemo(() => characters.split(''), []);

  const shuffleText = useCallback((originalText: string, currentRevealed: Set<number>) => {
    return originalText.split('').map((char, i) => {
      if (char === ' ') return ' ';
      if (currentRevealed.has(i)) return originalText[i];
      return availableChars[Math.floor(Math.random() * availableChars.length)];
    }).join('');
  }, [availableChars]);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setRevealedIndices(prev => {
        if (prev.size < text.length) {
          const nextIndex = Array.from({ length: text.length }).map((_, i) => i).find(i => !prev.has(i));
          if (nextIndex === undefined) return prev;
          const newRevealed = new Set(prev);
          newRevealed.add(nextIndex);
          setDisplayText(shuffleText(text, newRevealed));
          return newRevealed;
        } else {
          clearInterval(interval);
          setIsAnimating(false);
          setDisplayText(text);
          return prev;
        }
      });
    }, speed);
    return () => clearInterval(interval);
  }, [isAnimating, text, speed, shuffleText]);

  return (
    <motion.span className={parentClassName} style={decryptStyles.wrapper}>
      <span style={decryptStyles.srOnly}>{displayText}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealed = revealedIndices.has(index) || !isAnimating;
          return (
            <span key={index} className={isRevealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}

/* --- Main Starting Page Component --- */
export default function StartingPage({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Phase 1: Domino Loader for 1s
    const timer1 = setTimeout(() => setStage(1), 1000);
    // Phase 2: Matrix + Decrypt for 2s
    const timer2 = setTimeout(onComplete, 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {stage === 0 ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Loader />
        </motion.div>
      ) : (
        <motion.div
          key="matrix"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}
        >
          <Pattern />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', padding: '0 20px' }}>
            <DecryptedText 
              text="Glad you're here" 
              className="!text-[8rem] !md:text-[20rem] font-black text-white drop-shadow-[0_0_40px_rgba(255,255,255,1)] tracking-tighter block leading-none"
              encryptedClassName="text-green-500 opacity-60 blur-[1px]"
              speed={50}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

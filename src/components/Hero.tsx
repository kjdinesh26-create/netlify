'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const roles = ['Full-Stack Developer', 'ML Enthusiast', 'Problem Solver'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentRole.substring(0, text.length - 1)
              : currentRole.substring(0, text.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.content}`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className={styles.greeting}>
                <span className={styles.wave}>👋</span> Hey there, I&apos;m
              </p>
            </motion.div>

            <motion.h1
              className={styles.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Dinesh<span className={styles.dot}>.</span>
            </motion.h1>

            <motion.div
              className={styles.roleWrapper}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className={styles.roleLabel}>I&apos;m a </span>
              <span className={styles.role}>
                {text}
                <span className={styles.cursor}>|</span>
              </span>
            </motion.div>

            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              B.Tech IT student passionate about building intelligent systems
              and crafting beautiful digital experiences.
            </motion.p>

            <motion.div
              className={styles.ctas}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <a href="#projects" className="btn-primary">
                <span>View Projects</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#contact" className="btn-secondary">
                Contact Me
              </a>
            </motion.div>
          </div>

          <motion.div 
            className={styles.heroRight}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <div className={styles.imageFrame}>
              <div className={styles.imageInnerFrame}>
                <img src="/profile.jpg" alt="Dinesh Kumar" className={styles.profileImage} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { VscHome, VscAccount, VscCode, VscProject, VscMail } from 'react-icons/vsc';
import { FaLinkedin } from 'react-icons/fa';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '#', label: 'Home', icon: <VscHome size={20} /> },
  { href: '#about', label: 'About', icon: <VscAccount size={20} /> },
  { href: '#skills', label: 'Skills', icon: <VscCode size={20} /> },
  { href: '#projects', label: 'Projects', icon: <VscProject size={20} /> },
  { href: '#contact', label: 'Contact', icon: <VscMail size={20} /> },
];

function NavItem({ href, icon, label, mouseX }: { href: string; icon: React.ReactNode; label: string; mouseX: any }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform<number, number>(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds || val === Infinity) return Infinity;
    return val - bounds.left - bounds.width / 2;
  });

  const sizeValue = useTransform(distance, [-100, 0, 100], [40, 56, 40]);
  const size = useSpring(sizeValue, {
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      className={styles.linkIcon}
      style={{ width: size, height: size }}
    >
      <div className={styles.tooltip}>{label}</div>
      {icon}
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small timeout to allow menu animation to start and avoid layout shifts
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoAccent}>&lt;</span>
          Dinesh
          <span className={styles.logoAccent}>/&gt;</span>
        </a>

        <div 
          className={styles.links}
          onPointerMove={(e) => mouseX.set(e.clientX)}
          onPointerLeave={() => mouseX.set(Infinity)}
        >
          {navLinks.map((link) => (
            <NavItem 
              key={link.href} 
              href={link.href} 
              icon={link.icon} 
              label={link.label} 
              mouseX={mouseX} 
            />
          ))}
          <motion.a
            href="https://www.linkedin.com/in/dineshkumar-k-j-95257a261/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkIcon}
            style={{ width: 40, height: 40 }}
          >
            <div className={styles.tooltip}>LinkedIn</div>
            <FaLinkedin size={20} />
          </motion.a>
        </div>

        <button
          className={styles.burger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
              >
                <span className={styles.mobileIcon}>{link.icon}</span>
                {link.label}
              </a>
            ))}
            <a
              href="https://www.linkedin.com/in/dineshkumar-k-j-95257a261/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              <span className={styles.mobileIcon}><FaLinkedin size={20} /></span>
              LinkedIn
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Background from '@/components/Background';
import AnimatedSection from '@/components/AnimatedSection';
import BackToTop from '@/components/BackToTop';
import Dock from '@/components/Dock';
import MagicBento from '@/components/MagicBento';
import StartingPage from '@/components/StartingPage';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  
  const dockItems = [
    { icon: <VscHome size={22} />, label: 'Home', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { icon: <VscArchive size={22} />, label: 'Archive', onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <VscAccount size={22} />, label: 'Profile', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <VscSettingsGear size={22} />, label: 'Settings', onClick: () => alert('Settings coming soon!') },
  ];

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <StartingPage key="splash" onComplete={() => setShowSplash(false)} />
      ) : (
        <div key="content">
          <Background />
          <Navbar />
          <BackToTop />
          <Dock 
            items={dockItems}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
          <main>
            <Hero />
            <AnimatedSection type="fadeLeft">
              <About />
            </AnimatedSection>
            <AnimatedSection type="fadeRight">
              <Skills />
            </AnimatedSection>
            <AnimatedSection type="scaleUp">
              <MagicBento 
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                glowColor="132, 0, 255"
              />
            </AnimatedSection>
            <AnimatedSection type="scaleUp">
              <Projects />
            </AnimatedSection>
            <AnimatedSection type="fadeUp">
              <Contact />
            </AnimatedSection>
          </main>
          <Footer />
        </div>
      )}
    </AnimatePresence>
  );
}

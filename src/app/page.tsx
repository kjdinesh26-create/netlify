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

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <BackToTop />
      <main>
        <Hero />
        <AnimatedSection type="fadeLeft">
          <About />
        </AnimatedSection>
        <AnimatedSection type="fadeRight">
          <Skills />
        </AnimatedSection>
        <AnimatedSection type="scaleUp">
          <Projects />
        </AnimatedSection>
        <AnimatedSection type="fadeUp">
          <Contact />
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}

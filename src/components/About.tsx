'use client';

import AnimatedSection from './AnimatedSection';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className="container">
        <AnimatedSection>
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Turning Ideas Into<br />Digital Reality
          </h2>
        </AnimatedSection>

        <div className={styles.grid}>
          <AnimatedSection delay={0.1} className={styles.textCol}>
            <p className={styles.bio}>
              I&apos;m <strong>Dinesh Kumar</strong>, a 3rd-year{' '}
              <strong>B.Tech Information Technology</strong> student driven by
              curiosity and a love for building things that live on the
              internet. From interactive web apps to machine-learning models,
              I thrive at the intersection of code and creativity.
            </p>
            <p className={styles.bio}>
              When I&apos;m not coding, you&apos;ll find me exploring new
              frameworks, contributing to open-source, or diving into the
              latest research in AI. I believe great software is built with
              equal parts logic and empathy.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Projects Built</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3rd</span>
                <span className={styles.statLabel}>Year B.Tech IT</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Tech Stacks</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className={styles.codeCol}>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span className={styles.codeDot} style={{ background: '#ff5f56' }} />
                <span className={styles.codeDot} style={{ background: '#ffbd2e' }} />
                <span className={styles.codeDot} style={{ background: '#27c93f' }} />
                <span className={styles.codeTitle}>dinesh.ts</span>
              </div>
              <pre className={styles.code}>
                <code>{`const dinesh = {
  pronouns: "he" | "him",
  education: "B.Tech IT — 3rd Year",
  code: ["JavaScript", "Python", "TypeScript"],
  interests: ["Web Dev", "ML/AI", "Open Source"],
  currentFocus: "Building cool things",
  funFact: "I debug with console.log 😄"
};`}</code>
              </pre>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

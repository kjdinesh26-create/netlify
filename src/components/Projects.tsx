'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import styles from './Projects.module.css';

const projects = [
  {
    title: 'AI Chatbot',
    description:
      'An intelligent conversational chatbot built with NLP techniques and machine learning. Features natural language understanding, context awareness, and real-time response generation.',
    tags: ['Python', 'NLP', 'Machine Learning', 'Flask'],
    status: 'Completed',
    icon: '🤖',
    image: '/chatbot-preview.png',
    gradient: 'linear-gradient(135deg, #00e5ff, #7b2ff7)',
  },
];

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className="container">
        <AnimatedSection>
          <span className="section-label">Projects</span>
          <h2 className="section-title">What I&apos;ve Built</h2>
          <p className="section-subtitle">
            Featured projects that showcase my skills and passion for
            building meaningful tech solutions.
          </p>
        </AnimatedSection>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={0.15 + i * 0.1}>
              <motion.div
                className={styles.card}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={styles.imageContainer}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className={styles.image} />
                  ) : (
                    <div className={styles.placeholderImage} />
                  )}
                  <div className={styles.cardHeaderOverlay}>
                    <div className={styles.cardIcon}>
                      <span>{project.icon}</span>
                    </div>
                    <span className={styles.status}>{project.status}</span>
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>

                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.viewMore}>
                      View Details
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}

          {/* More coming soon card */}
          <AnimatedSection delay={0.3}>
            <div className={styles.comingSoon}>
              <div className={styles.comingSoonInner}>
                <span className={styles.comingSoonIcon}>🚀</span>
                <h3 className={styles.comingSoonTitle}>More on the way</h3>
                <p className={styles.comingSoonDesc}>
                  Exciting projects in development. Stay tuned!
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

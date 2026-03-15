'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import styles from './Skills.module.css';

const skills = [
  {
    icon: '⚡',
    title: 'JavaScript',
    description:
      'Building interactive web experiences with modern ES6+, React, Next.js, and Node.js. TypeScript for type-safe development.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    color: '#f7df1e',
  },
  {
    icon: '🐍',
    title: 'Python',
    description:
      'Writing clean, efficient Python for automation, scripting, data processing, and building backend services with Flask/FastAPI.',
    tags: ['Flask', 'FastAPI', 'Pandas', 'Automation'],
    color: '#3776ab',
  },
  {
    icon: '🧠',
    title: 'Machine Learning',
    description:
      'Developing intelligent models using scikit-learn, TensorFlow & NLP techniques. Passionate about building AI-powered products.',
    tags: ['TensorFlow', 'NLP', 'scikit-learn', 'Deep Learning'],
    color: '#ff6f61',
  },
];

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <div className="container">
        <AnimatedSection>
          <span className="section-label">Skills</span>
          <h2 className="section-title">My Tech Toolbox</h2>
          <p className="section-subtitle">
            Technologies and domains I work with to bring ideas to life.
          </p>
        </AnimatedSection>

        <div className={styles.grid}>
          {skills.map((skill, i) => (
            <AnimatedSection key={skill.title} delay={0.1 + i * 0.15}>
              <motion.div
                className={`${styles.card} glass-card`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div
                  className={styles.iconWrapper}
                  style={{
                    boxShadow: `0 0 30px ${skill.color}22`,
                  }}
                >
                  <span className={styles.icon}>{skill.icon}</span>
                </div>
                <h3 className={styles.cardTitle}>{skill.title}</h3>
                <p className={styles.cardDesc}>{skill.description}</p>
                <div className={styles.tags}>
                  {skill.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className={styles.cardGlow}
                  style={{ background: skill.color }}
                />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

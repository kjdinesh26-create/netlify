import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoAccent}>&lt;</span>
            Dinesh
            <span className={styles.logoAccent}>/&gt;</span>
          </a>
          <p className={styles.tagline}>
            Building the future, one line of code at a time.
          </p>
        </div>

        <div className={styles.links}>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a
            href="https://www.linkedin.com/in/dineshkumar-k-j-95257a261/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {currentYear} Dinesh Kumar. All rights reserved.
          </p>
          <p className={styles.credit}>
            Designed &amp; built with 💙
          </p>
        </div>
      </div>
    </footer>
  );
}

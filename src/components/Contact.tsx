'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import AnimatedSection from './AnimatedSection';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (status === 'sending') return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    console.log('Contact Form - Config Check:', { 
      serviceId: serviceId ? 'Found' : 'Missing',
      templateId: templateId ? 'Found' : 'Missing',
      publicKey: publicKey ? 'Found' : 'Missing'
    });

    // Check if we should use Demo Mode
    const isDemoMode = !serviceId || serviceId === 'your_service_id' || 
                      !templateId || templateId === 'your_template_id' || 
                      !publicKey || publicKey === 'your_public_key';

    if (isDemoMode) {
      console.warn('Contact Form: Running in DEMO MODE. No real email will be sent.');
      setStatus('sending');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    setStatus('sending');

    try {
      if (publicKey) {
        console.log('Initializing EmailJS with Public Key...');
        emailjs.init(publicKey);
      }

      console.log('Sending Email with template params:', {
        from_name: formData.name,
        from_email: formData.email,
        to_name: 'Dinesh',
        recipient_email: 'kjdinesh26@gmail.com'
      });

      const result = await emailjs.send(
        serviceId || '',
        templateId || '',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Dinesh',
          recipient_email: 'kjdinesh26@gmail.com',
        }
      );

      console.log('EmailJS Success Response:', result);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error('EmailJS Error caught in handleSubmit:', error);
      
      if (error?.status) console.error('Error Status:', error.status);
      if (error?.text) console.error('Error Message:', error.text);
      
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        <div className={styles.grid}>
          <AnimatedSection className={styles.info}>
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let&apos;s Connect</h2>
            <p className={styles.description}>
              Have an idea, a question, or just want to say hi? I&apos;d love
              to hear from you. Drop me a message or connect on social media.
            </p>

            <div className={styles.socials}>
              <a
                href="https://www.linkedin.com/in/dineshkumar-k-j-95257a261/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <div>
                  <span className={styles.socialName}>LinkedIn</span>
                  <span className={styles.socialHandle}>Dinesh Kumar K J</span>
                </div>
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <div>
                  <span className={styles.socialName}>GitHub</span>
                  <span className={styles.socialHandle}>@dinesh</span>
                </div>
              </a>

              <a
                href="mailto:kjdinesh26@gmail.com"
                className={styles.socialLink}
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                <div>
                  <span className={styles.socialName}>Email</span>
                  <span className={styles.socialHandle}>kjdinesh26@gmail.com</span>
                </div>
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className={styles.formCol}>
            <form className={styles.form} onSubmit={handleSubmit}>
              {(!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID === 'service_2jt46ca') && (
                <div className={styles.demoBadge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>Demo Mode (Real emails disabled)</span>
                </div>
              )}
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className={styles.textarea}
                  rows={5}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={status === 'sending'}
              >
                <span>
                  {status === 'sending' ? 'Sending...' : 
                   status === 'success' ? 'Message Sent!' : 
                   status === 'error' ? 'Error Sending' : 'Send Message'}
                </span>
                {status === 'idle' && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                    <path d="M2 14l12-6L2 2v4.5l8 1.5-8 1.5V14z" fill="currentColor"/>
                  </svg>
                )}
                {status === 'success' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </button>
              
              {status === 'success' && (
                <p className={styles.statusSuccess}>
                  {(!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID === 'service_2jt46ca') ? 
                    'Thanks! (Demo Mode: Add real keys to receive mail)' : 
                    "Thanks for reaching out! I'll get back to you soon."}
                </p>
              )}
              {status === 'error' && (
                <p className={styles.statusError}>
                  Something went wrong. Please try again or connect on LinkedIn.
                </p>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedWebp } from './AnimatedWebp';
import { MiniConfetti } from './MiniConfetti';
import { LOADING_PHRASES } from '@/utils/constants';
import styles from '@/styles/components/LoadingPage.module.scss';

interface LoadingPageProps {
  onComplete: () => void;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phrase, setPhrase] = useState(LOADING_PHRASES[0]);
  const [phraseKey, setPhraseKey] = useState(0);

  useEffect(() => {
    document.body.style.background = 'linear-gradient(-45deg, #ff69b4, #ff1493, #ffd700, #ffb6d9, #ff69b4)';
    document.body.style.backgroundSize = '400% 400%';
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
    };
  }, []);

  useEffect(() => {
    const phrases = LOADING_PHRASES;
    let phraseIndex = 0;

    const phraseInterval = setInterval(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setPhrase(phrases[phraseIndex]);
      setPhraseKey((prev) => prev + 1);
    }, 1500);

    return () => clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 25;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { duration: 0.8 },
          layout: { duration: 0.4, ease: 'easeInOut' },
        }}
      >
        <AnimatedWebp
          show={true}
          src="/unicorn.webp"
          alt="Loading animation"
        />

        <div className={styles.phraseContainer}>
          <AnimatePresence mode="wait">
            <motion.p
              className={styles.phrase}
              key={phrase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {phrase}
            </motion.p>
          </AnimatePresence>
        </div>

        {phraseKey > 0 && <MiniConfetti key={`confetti-${phraseKey}`} />}

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progress}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />
          </div>
          <motion.span
            className={styles.progressText}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>

        <div className={styles.hearts}>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              className={styles.heart}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            >
              💕
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TimelineCard } from './TimelineCard';
import { TIMELINE_PHRASES, MOCK_TIMELINE_DATA } from '@/utils/constants';
import styles from '@/styles/components/TimelinePage.module.scss';

interface TimelinePageProps {
  onLogout?: () => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onLogout }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);

  // Set background on mount
  useEffect(() => {
    document.body.style.background = 'linear-gradient(-45deg, #d8f0d8, #e8c8e8, #c8e8d8, #d8f0d8)';
    document.body.style.backgroundSize = '300% 300%';
    document.body.style.animation = 'gradientShiftTimeline 6s ease infinite';

    // Inject keyframe animation
    const styleId = 'gradient-timeline-animation';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes gradientShiftTimeline {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
      document.body.style.animation = '';
    };
  }, []);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % TIMELINE_PHRASES.length);
    }, 2500);

    return () => clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    const applyScrollbarOffset = () => {
      if (!timelineContainerRef.current) return;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const halfOffset = Math.max(0, scrollbarWidth / 2);
      timelineContainerRef.current.style.setProperty('--scrollbar-offset', `${halfOffset}px`);
    };

    applyScrollbarOffset();
    window.addEventListener('resize', applyScrollbarOffset);

    return () => {
      window.removeEventListener('resize', applyScrollbarOffset);
    };
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.headerDecor}>
          <span className={styles.emoji}>🦄</span>
          <span className={styles.emoji}>💕</span>
          <span className={styles.emoji}>✨</span>
        </div>

        <h1 className={styles.mainTitle}>Наша история любви</h1>

        <div className={styles.subtitleContainer}>
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              className={styles.subtitle}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {TIMELINE_PHRASES[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className={styles.headerDecor}>
          <span className={styles.emoji}>🦄</span>
          <span className={styles.emoji}>💀</span>
          <span className={styles.emoji}>🐹</span>
        </div>

        {onLogout && (
          <motion.button
            className={styles.logoutButton}
            onClick={onLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            выход 👑
          </motion.button>
        )}
      </motion.div>

      <div className={styles.timelineWrapper}>
        <div className={styles.timelineContainer} ref={timelineContainerRef}>
          <motion.div
            className={styles.timelineCenter}
            initial={{ scaleY: 0.01 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
            style={{ originY: 0 }}
          />

          {/* Magic sparkles inside timeline */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className={styles.timelineSparkle}
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                top: `${15 + i * 14}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            >
              ✨
            </motion.div>
          ))}

          <motion.div
            className={styles.cardsContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {MOCK_TIMELINE_DATA.map((item, index) => (
              <TimelineCard
                key={item.id}
                {...item}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Каждое мгновение с тобой - волшебство 💕✨</p>
        <div className={styles.decorSpread}>
          <motion.img
            src="/cancer.webp"
            alt="Cancer"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.img
            src="/relationship.webp"
            alt="Relationship"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.img
            src="/lion.webp"
            alt="Lion"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

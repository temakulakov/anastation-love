'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { TimelineCard } from './TimelineCard';
import { MonthText } from './MonthText';
import { TIMELINE_PHRASES, MOCK_TIMELINE_DATA, formatMonthYear } from '@/utils/constants';
import styles from '@/styles/components/TimelinePage.module.scss';

interface TimelinePageProps {
  onLogout?: () => void;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const TIMELINE_START_DATE = new Date(2024, 2, 1); // March 1, 2024
const PX_PER_DAY = 3.2;
const MIN_GAP = 20;
const MAX_GAP = 120;

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
};

export const TimelinePage: React.FC<TimelinePageProps> = ({ onLogout }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const timelineEvents = useMemo(
    () =>
      [...MOCK_TIMELINE_DATA]
        .filter((item) => parseDate(item.date).getTime() >= TIMELINE_START_DATE.getTime())
        .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()),
    []
  );

  const timelineItems = useMemo(() => {
    if (timelineEvents.length === 0) return [];

    const firstEventDate = parseDate(timelineEvents[0].date);
    const lastEventDate = parseDate(timelineEvents[timelineEvents.length - 1].date);
    const firstMonth = new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1);

    const monthDates: Date[] = [];
    const monthPointer = new Date(firstMonth);
    while (monthPointer.getTime() <= lastEventDate.getTime()) {
      monthDates.push(new Date(monthPointer));
      monthPointer.setMonth(monthPointer.getMonth() + 1);
    }

    type Item =
      | { kind: 'month'; date: Date; label: string; monthIndex: number; gap: number }
      | { kind: 'event'; date: Date; eventIndex: number; gap: number };

    const mixedItems: Array<Omit<Item, 'gap'>> = [
      ...monthDates.map((date, monthIndex) => ({
        kind: 'month' as const,
        date,
        label: formatMonthYear(`01.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`),
        monthIndex,
      })),
      ...timelineEvents.map((event, eventIndex) => ({
        kind: 'event' as const,
        date: parseDate(event.date),
        eventIndex,
      })),
    ];

    mixedItems.sort((a, b) => {
      const diff = a.date.getTime() - b.date.getTime();
      if (diff !== 0) return diff;
      if (a.kind === b.kind) return 0;
      return a.kind === 'month' ? -1 : 1;
    });

    return mixedItems.map((item, index): Item => {
      if (index === 0) return { ...item, gap: 0 };
      const prevDate = mixedItems[index - 1].date;
      const diffDays = Math.max(1, Math.round((item.date.getTime() - prevDate.getTime()) / DAY_MS));
      const gap = Math.max(MIN_GAP, Math.min(MAX_GAP, diffDays * PX_PER_DAY));
      return { ...item, gap };
    });
  }, [timelineEvents]);

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
        <div className={styles.timelineContainer}>
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
                left: 'var(--timeline-axis-x)',
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
            {timelineItems.map((item) => (
              <div
                key={item.kind === 'month' ? `month-${item.date.getTime()}` : `event-${timelineEvents[item.eventIndex].id}`}
                className={styles.timelineItem}
                style={{ marginTop: `${item.gap}px` }}
              >
                {item.kind === 'month' ? (
                  <MonthText
                    label={item.label}
                    isLeft={item.monthIndex % 2 === 0}
                  />
                ) : (
                  <TimelineCard
                    {...timelineEvents[item.eventIndex]}
                    index={item.eventIndex}
                  />
                )}
              </div>
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
        <motion.div
          className={styles.reasonsButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link href="/reasons">
            Банк причин 💌
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

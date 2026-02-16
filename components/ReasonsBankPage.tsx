'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { REASONS_BANK } from '@/utils/constants';
import styles from '@/styles/components/ReasonsBankPage.module.scss';

export const ReasonsBankPage: React.FC = () => {
  const [reason, setReason] = useState(REASONS_BANK[0]);
  const [drawCount, setDrawCount] = useState(0);

  const glowDelay = useMemo(() => (drawCount % 5) * 0.06, [drawCount]);

  const handleDraw = () => {
    const pool = REASONS_BANK.filter((item) => item !== reason);
    const nextReason = pool[Math.floor(Math.random() * pool.length)] || REASONS_BANK[0];
    setReason(nextReason);
    setDrawCount((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.orbLayer} />
      <div className={styles.emojiCloud} aria-hidden="true">
        {['⭐', '🦄', '✨', '💖', '💫', '🌙'].map((emoji, i) => (
          <motion.span
            key={`${emoji}-${i}`}
            className={styles.rotatingEmoji}
            style={{
              left: `${8 + i * 15}%`,
              top: `${12 + (i % 3) * 26}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -10, 0],
              opacity: [0.25, 0.7, 0.25],
            }}
            transition={{
              rotate: { duration: 10 + i * 1.2, repeat: Infinity, ease: 'linear' },
              y: { duration: 2.8 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <motion.h1
          className={styles.title}
          animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
          transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
        >
          Банк Причин
        </motion.h1>

        <p className={styles.subtitle}>15 причин, почему я люблю тебя еще сильнее каждый день</p>

        <motion.div
          className={styles.reasonCard}
          key={reason}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ animationDelay: `${glowDelay}s` }}
        >
          <span className={styles.badge}>вытянуто причин: {drawCount + 1}</span>
          <AnimatePresence mode="wait">
            <motion.p
              key={reason}
              className={styles.reasonText}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
            >
              {reason}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.button
          className={styles.drawButton}
          onClick={handleDraw}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          Вытянуть причину
        </motion.button>

        <div className={styles.actions}>
          <Link href="/game" className={styles.gameLink}>
            Мини-игра 💘
          </Link>

          <Link href="/quiz" className={styles.gameLink}>
            Интерактивный тест 📝
          </Link>

          <Link href="/timeline" className={styles.backLink}>
            ← обратно к таймлайну
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

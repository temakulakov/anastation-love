'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/components/MiniConfetti.module.scss';

interface MiniConfettiProps {
  id?: string;
}

export const MiniConfetti: React.FC<MiniConfettiProps> = ({ id }) => {
  // Use useMemo to prevent recalculation on every render
  const confettis = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => i);
  }, []);

  return (
    <div className={styles.container} key={id}>
      {confettis.map((i) => {
        const randomDelay = i * 0.03;
        const randomDuration = 0.5 + Math.random() * 0.2;
        const randomX = -40 + Math.random() * 80;
        const randomRotation = Math.random() * 360;
        const confettiType = i % 3;

        return (
          <motion.div
            key={i}
            className={styles.confetti}
            initial={{
              y: 0,
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            animate={{
              y: 100,
              opacity: 0,
              rotate: randomRotation,
              scale: 0.2,
              x: randomX,
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: 'easeOut',
            }}
          >
            {confettiType === 0 && '💕'}
            {confettiType === 1 && '✨'}
            {confettiType === 2 && '💖'}
          </motion.div>
        );
      })}
    </div>
  );
};

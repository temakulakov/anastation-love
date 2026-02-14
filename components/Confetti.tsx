'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/components/Confetti.module.scss';

interface ConfettiProps {
  trigger: boolean;
}

export const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  const confettis = Array.from({ length: 50 }, (_, i) => i);

  if (!trigger) return null;

  return (
    <div className={styles.container}>
      {confettis.map((i) => {
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 2 + Math.random() * 1;
        const randomX = -100 + Math.random() * 200;
        const randomRotation = Math.random() * 720;
        const confettiType = i % 3;

        return (
          <motion.div
            key={i}
            className={styles.confetti}
            initial={{
              x: 0,
              y: -10,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: randomX,
              y: window.innerHeight + 100,
              opacity: 0,
              rotate: randomRotation,
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: 'easeIn',
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

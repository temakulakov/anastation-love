'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/components/MusicToggle.module.scss';

interface MusicToggleProps {
  isPlaying: boolean;
  onClick: () => void;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({ isPlaying, onClick }) => {
  return (
    <motion.button
      className={styles.button}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: isPlaying ? [0, -5, 0] : 0,
      }}
      transition={{
        duration: isPlaying ? 0.5 : 0,
        repeat: isPlaying ? Infinity : 0,
      }}
    >
      <span className={styles.icon}>{isPlaying ? '🎵' : '🔇'}</span>
    </motion.button>
  );
};

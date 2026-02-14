'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/components/AnimatedWebp.module.scss';

interface AnimatedWebpProps {
  show: boolean;
  src: string;
  alt: string;
}

export const AnimatedWebp: React.FC<AnimatedWebpProps> = memo(
  ({ show, src, alt }) => {
    return (
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120, damping: 15, delay: 0.3 }}
      >
        <picture>
          <source srcSet={src} type="image/webp" />
          <img
            src={src.replace('.webp', '.png')}
            alt={alt}
            className={styles.image}
            loading="eager"
          />
        </picture>
      </motion.div>
    );
  }
);

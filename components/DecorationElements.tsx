'use client';

import React from 'react';
import styles from '@/styles/components/DecorationElements.module.scss';

export const Heart = ({ delay = 0, size = 20 }) => (
  <div className={styles.heart} style={{ animationDelay: `${delay}s`, fontSize: size }}>
    💕
  </div>
);

export const Skull = ({ delay = 0, size = 20 }) => (
  <div className={styles.decoration} style={{ animationDelay: `${delay}s`, fontSize: size }}>
    💀
  </div>
);

export const Capybara = ({ delay = 0, size = 20 }) => (
  <div className={styles.decoration} style={{ animationDelay: `${delay}s`, fontSize: size }}>
    🐹
  </div>
);

export const Unicorn = ({ delay = 0, size = 20 }) => (
  <div className={styles.decoration} style={{ animationDelay: `${delay}s`, fontSize: size }}>
    🦄
  </div>
);

export const DecorativeBackground = () => {
  const hearts = Array.from({ length: 8 }, (_, i) => i);
  const skulls = Array.from({ length: 5 }, (_, i) => i);
  const capybaras = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className={styles.background}>
      {hearts.map((i) => (
        <Heart key={`heart-${i}`} delay={i * 0.1} size={Math.random() * 30 + 15} />
      ))}
      {skulls.map((i) => (
        <Skull key={`skull-${i}`} delay={i * 0.15} size={Math.random() * 25 + 12} />
      ))}
      {capybaras.map((i) => (
        <Capybara key={`capybara-${i}`} delay={i * 0.12} size={Math.random() * 28 + 14} />
      ))}
    </div>
  );
};

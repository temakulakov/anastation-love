'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/components/AdaptiveBackground.module.scss';

type BackgroundStep = 'auth' | 'loading' | 'timeline';

interface AdaptiveBackgroundProps {
  step: BackgroundStep;
}

interface PositionedEmoji {
  emoji: string;
  left: number;
  top: number;
  delay: number;
}

export const AdaptiveBackground: React.FC<AdaptiveBackgroundProps> = ({ step }) => {
  const [primaryEmojis, setPrimaryEmojis] = useState<PositionedEmoji[]>([]);
  const [secondaryEmojis, setSecondaryEmojis] = useState<PositionedEmoji[]>([]);
  const [isClient, setIsClient] = useState(false);

  const getEmojis = () => {
    if (step === 'auth' || step === 'loading') {
      return {
        primary: Array(15).fill('💕'),
        secondary: Array(10).fill('💀'),
      };
    }
    // timeline
    return {
      primary: Array(15).fill('⭐'),
      secondary: Array(10).fill('🦄'),
    };
  };

  useEffect(() => {
    setIsClient(true);
    const emojis = getEmojis();
    
    // Generate random positions only on client
    setPrimaryEmojis(
      emojis.primary.map((emoji, i) => ({
        emoji,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: i * 0.3,
      }))
    );

    setSecondaryEmojis(
      emojis.secondary.map((emoji, i) => ({
        emoji,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: i * 0.4,
      }))
    );
  }, [step]);

  if (!isClient) {
    return <div className={styles.background} />;
  }

  return (
    <div className={styles.background}>
      {/* Primary emojis (hearts or stars) */}
      {primaryEmojis.map((item, i) => (
        <div
          key={`primary-${i}`}
          className={`${styles.emoji} ${styles.primary}`}
          style={{
            animationDelay: `${item.delay}s`,
            left: `${item.left}%`,
            top: `${item.top}%`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Secondary emojis (skulls or unicorns) */}
      {secondaryEmojis.map((item, i) => (
        <div
          key={`secondary-${i}`}
          className={`${styles.emoji} ${styles.secondary}`}
          style={{
            animationDelay: `${item.delay}s`,
            left: `${item.left}%`,
            top: `${item.top}%`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};

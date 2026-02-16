'use client';

import React from 'react';
import styles from '@/styles/components/TimelinePage.module.scss';

interface MonthTextProps {
  label: string;
  isLeft: boolean;
}

export const MonthText: React.FC<MonthTextProps> = ({ label, isLeft }) => {
  return (
    <div className={`${styles.monthWrapper} ${isLeft ? styles.left : styles.right}`}>
      <div className={styles.monthContainer}>
        <span className={styles.monthText}>{label}</span>
      </div>
    </div>
  );
};

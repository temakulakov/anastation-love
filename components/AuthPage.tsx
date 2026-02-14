'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VALID_PASSWORDS } from '@/utils/constants';
import styles from '@/styles/components/AuthPage.module.scss';

interface AuthPageProps {
  onSuccess: () => void;
}

interface BgEmoji {
  left: number;
  top: number;
  duration: number;
  isHeart: boolean;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bgEmojis, setBgEmojis] = useState<BgEmoji[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generate random positions only on client
    setBgEmojis(
      Array.from({ length: 20 }).map((_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        isHeart: i % 2 === 0,
      }))
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (VALID_PASSWORDS.some((pwd) => password.toLowerCase().includes(pwd) && password.length >= 8)) {
        onSuccess();
      } else {
        setError('Неверный пароль, принцесса 👑');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={styles.container}>
      {/* Background emojis */}
      <div className={styles.bgEmojis}>
        {isClient &&
          bgEmojis.map((emoji, i) => (
            <motion.div
              key={i}
              className={styles.bgEmoji}
              style={{
                left: `${emoji.left}%`,
                top: `${emoji.top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: emoji.duration,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            >
              {emoji.isHeart ? '💕' : '💀'}
            </motion.div>
          ))}
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.decorTop}>
          <span className={styles.emoji}>👑</span>
          <span className={styles.emoji}>💕</span>
          <span className={styles.emoji}>🦄</span>
        </div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Добро пожаловать, принцесса ✨
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Введи свое волшебное слово 💕
        </motion.p>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            disabled={isLoading}
          />

          {error && (
            <motion.div
              className={styles.error}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? '⏳' : '💋'} Войти
          </motion.button>
        </motion.form>

        <div className={styles.decorBottom}>
          <span className={styles.emoji}>💀</span>
          <span className={styles.emoji}>🐹</span>
          <span className={styles.emoji}>💖</span>
        </div>

        <motion.p
          className={styles.hint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Подсказка: вспомни как я тебя называю 👑💕
        </motion.p>
      </motion.div>
    </div>
  );
};

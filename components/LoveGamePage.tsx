'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '@/styles/components/LoveGamePage.module.scss';

type GameState = 'idle' | 'playing' | 'finished';

interface Token {
  id: number;
  x: number;
  y: number;
  size: number;
  points: number;
  icon: string;
  drift: number;
}

const GAME_DURATION = 25;
const TOKENS_COUNT = 11;

const createToken = (id: number): Token => {
  const lucky = Math.random() > 0.82;
  return {
    id,
    x: 8 + Math.random() * 84,
    y: 18 + Math.random() * 66,
    size: 34 + Math.round(Math.random() * 22),
    points: lucky ? 3 : 1,
    icon: lucky ? '💎' : Math.random() > 0.5 ? '💖' : '💕',
    drift: 2.4 + Math.random() * 2.2,
  };
};

export const LoveGamePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [tokens, setTokens] = useState<Token[]>([]);
  const idRef = useRef(0);

  const targetScore = 34;

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    idRef.current = TOKENS_COUNT;
    setTokens(Array.from({ length: TOKENS_COUNT }, (_, i) => createToken(i)));
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  const handleCatch = (token: Token) => {
    if (gameState !== 'playing') return;

    setScore((prev) => prev + token.points);
    setTokens((prev) => {
      const filtered = prev.filter((item) => item.id !== token.id);
      const nextId = idRef.current++;
      return [...filtered, createToken(nextId)];
    });
  };

  const resultText = useMemo(() => {
    if (score >= targetScore) {
      return 'Ты победила! Сердце официально украдено и навсегда твоё 💘';
    }
    if (score >= 20) {
      return 'Очень близко! Ты почти поймала все сердечки, это было мило ✨';
    }
    return 'Сердечки разлетелись, но любовь всё равно победила 💕';
  }, [score]);

  return (
    <div className={styles.container}>
      <div className={styles.backdropGlow} />

      <motion.div
        className={styles.panel}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className={styles.title}>Мини-игра: Поймай любовь</h1>
        <p className={styles.subtitle}>Лови сердечки за {GAME_DURATION} секунд. Цель: {targetScore} очков.</p>

        <div className={styles.stats}>
          <span>Очки: {score}</span>
          <span>Время: {timeLeft}s</span>
        </div>

        <div className={styles.arena}>
          {tokens.map((token) => (
            <motion.button
              key={token.id}
              className={styles.token}
              onClick={() => handleCatch(token)}
              style={{
                left: `${token.x}%`,
                top: `${token.y}%`,
                width: token.size,
                height: token.size,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: token.drift,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileTap={{ scale: 0.84 }}
              whileHover={{ scale: 1.08 }}
              disabled={gameState !== 'playing'}
            >
              {token.icon}
            </motion.button>
          ))}

          {gameState !== 'playing' && (
            <div className={styles.overlay}>
              {gameState === 'idle' && (
                <motion.button
                  className={styles.startButton}
                  onClick={startGame}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Начать игру
                </motion.button>
              )}

              {gameState === 'finished' && (
                <div className={styles.resultBox}>
                  <p>{resultText}</p>
                  <motion.button
                    className={styles.startButton}
                    onClick={startGame}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Играть снова
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.links}>
          <Link href="/reasons">← Банк причин</Link>
          <Link href="/quiz">Интерактивный тест ✨</Link>
          <Link href="/timeline">К таймлайну →</Link>
        </div>
      </motion.div>
    </div>
  );
};

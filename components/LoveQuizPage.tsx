'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '@/styles/components/LoveQuizPage.module.scss';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: 'Какой вайб у нашего идеального вечера?',
    options: ['Суши, плед и любимый фильм', 'Сон в 21:00', 'Только работа', 'Скучные новости'],
    correctIndex: 0,
  },
  {
    question: 'Что делает любой день лучше за секунду?',
    options: ['Твоя улыбка', 'Пробка на дороге', 'Разряженный телефон', 'Холодный чай'],
    correctIndex: 0,
  },
  {
    question: 'Какое суперумение у нашей любви?',
    options: ['Превращать рутину в праздник', 'Терять носки', 'Опаздывать', 'Шуметь по ночам'],
    correctIndex: 0,
  },
  {
    question: 'Что я выберу всегда?',
    options: ['Обнять тебя и не отпускать', 'Спорить из-за мелочей', 'Игнорировать сообщения', 'Сидеть грустным'],
    correctIndex: 0,
  },
  {
    question: 'Финальный вопрос: мы с тобой это...',
    options: ['Команда навсегда', 'Случайные знакомые', 'Временная история', 'Никакой магии'],
    correctIndex: 0,
  },
];

export const LoveQuizPage: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = QUESTIONS[index];
  const progress = Math.round(((index + (finished ? 1 : 0)) / QUESTIONS.length) * 100);

  const result = useMemo(() => {
    if (score === QUESTIONS.length) return 'Идеально! Ты знаешь нашу любовь на максимум 💯💕';
    if (score >= 3) return 'Очень круто! Ты на одной волне с нашим сердцем ✨';
    return 'Кринж! Нужно повторить тест после обнимашек 🤍';
  }, [score]);

  const handleSelect = (optionIndex: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(optionIndex);
    if (optionIndex === current.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    if (index === QUESTIONS.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((prev) => prev + 1);
    setSelectedIndex(null);
  };

  const handleRestart = () => {
    setIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.glow} />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Интерактивный Тест</h1>
        <p className={styles.subtitle}>5 вопросов, 4 варианта, и море любви</p>

        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
          <span>{progress}%</span>
        </div>

        {!finished ? (
          <>
            <motion.h2
              key={index}
              className={styles.question}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {index + 1}. {current.question}
            </motion.h2>

            <div className={styles.options}>
              {current.options.map((option, optionIndex) => {
                const isChosen = selectedIndex === optionIndex;
                const isCorrect = optionIndex === current.correctIndex;
                const stateClass =
                  selectedIndex === null
                    ? ''
                    : isCorrect
                      ? styles.correct
                      : isChosen
                        ? styles.wrong
                        : styles.dimmed;

                return (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.optionButton} ${stateClass}`}
                    onClick={() => handleSelect(optionIndex)}
                    disabled={selectedIndex !== null}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <motion.button
              className={styles.nextButton}
              type="button"
              onClick={handleNext}
              whileHover={{ scale: selectedIndex !== null ? 1.04 : 1 }}
              whileTap={{ scale: selectedIndex !== null ? 0.97 : 1 }}
              disabled={selectedIndex === null}
            >
              {index === QUESTIONS.length - 1 ? 'Посмотреть результат' : 'Следующий вопрос'}
            </motion.button>
          </>
        ) : (
          <div className={styles.result}>
            <p className={styles.resultScore}>
              Результат: {score} / {QUESTIONS.length}
            </p>
            <p className={styles.resultText}>{result}</p>
            <motion.button
              className={styles.nextButton}
              type="button"
              onClick={handleRestart}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Пройти еще раз
            </motion.button>
          </div>
        )}

        <div className={styles.links}>
          <Link href="/game">← К мини-игре</Link>
          <Link href="/timeline">К таймлайну →</Link>
        </div>
      </motion.div>
    </div>
  );
};

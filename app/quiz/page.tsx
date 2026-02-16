'use client';

import { useEffect } from 'react';
import { LoveQuizPage } from '@/components/LoveQuizPage';
import { AdaptiveBackground } from '@/components/AdaptiveBackground';
import { MusicToggle } from '@/components/MusicToggle';
import { useBackgroundMusic } from '@/utils/useBackgroundMusic';
import { setProgress } from '@/utils/progressStore';
import '@/styles/globals.scss';

export default function QuizRoute() {
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  useEffect(() => {
    document.body.style.background = 'linear-gradient(-45deg, #ffe9f3, #ffefdf, #fbe8ff, #ffe9f3)';
    document.body.style.backgroundSize = '300% 300%';
    document.body.style.animation = 'gradientShiftQuiz 8s ease infinite';

    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShiftQuiz {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);

    setProgress('timeline');

    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
      document.body.style.animation = '';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>
      <AdaptiveBackground step="timeline" />
      <LoveQuizPage />
      <MusicToggle isPlaying={isPlaying} onClick={toggleMusic} />
    </div>
  );
}

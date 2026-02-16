'use client';

import { useEffect } from 'react';
import { ReasonsBankPage } from '@/components/ReasonsBankPage';
import { AdaptiveBackground } from '@/components/AdaptiveBackground';
import { MusicToggle } from '@/components/MusicToggle';
import { useBackgroundMusic } from '@/utils/useBackgroundMusic';
import { setProgress } from '@/utils/progressStore';
import '@/styles/globals.scss';

export default function ReasonsRoute() {
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  useEffect(() => {
    document.body.style.background = 'linear-gradient(-45deg, #ffe8f0, #ffe6cf, #ffd8ea, #ffe8f0)';
    document.body.style.backgroundSize = '300% 300%';
    document.body.style.animation = 'gradientShiftReasons 8s ease infinite';

    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShiftReasons {
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

      <ReasonsBankPage />

      <MusicToggle isPlaying={isPlaying} onClick={toggleMusic} />
    </div>
  );
}

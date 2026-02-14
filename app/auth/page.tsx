'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthPage } from '@/components/AuthPage';
import { LoadingPage } from '@/components/LoadingPage';
import { MusicToggle } from '@/components/MusicToggle';
import { AdaptiveBackground } from '@/components/AdaptiveBackground';
import { Confetti } from '@/components/Confetti';
import { useBackgroundMusic } from '@/utils/useBackgroundMusic';
import { setProgress } from '@/utils/progressStore';
import '@/styles/globals.scss';

export default function AuthRoute() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  useEffect(() => {
    document.body.style.background = 'linear-gradient(-45deg, #ffd700, #ff69b4, #ffb6e1, #ffd700)';
    document.body.style.backgroundSize = '300% 300%';
    document.body.style.animation = 'gradientShiftAuth 5s ease infinite';
    
    // Add keyframes to style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShiftAuth {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
      document.body.style.animation = '';
      document.head.removeChild(style);
    };
  }, []);

  const handleAuthSuccess = () => {
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setProgress('timeline');
      router.push('/timeline');
      setShowConfetti(false);
    }, 500);
  };

  return (
    <div>
      <AdaptiveBackground step={isLoading ? 'loading' : 'auth'} />

      {!isLoading && <AuthPage onSuccess={handleAuthSuccess} />}

      {isLoading && <LoadingPage onComplete={handleLoadingComplete} />}

      <Confetti trigger={showConfetti} />

      <MusicToggle isPlaying={isPlaying} onClick={toggleMusic} />
    </div>
  );
}

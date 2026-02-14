'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TimelinePage } from '@/components/TimelinePage';
import { AdaptiveBackground } from '@/components/AdaptiveBackground';
import { MusicToggle } from '@/components/MusicToggle';
import { useBackgroundMusic } from '@/utils/useBackgroundMusic';
import { resetProgress } from '@/utils/progressStore';
import '@/styles/globals.scss';

export default function TimelineRoute() {
  const router = useRouter();
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  useEffect(() => {
    document.body.style.background = 'linear-gradient(-45deg, #d8f0d8, #e8c8e8, #c8e8d8, #d8f0d8)';
    document.body.style.backgroundSize = '300% 300%';
    document.body.style.animation = 'gradientShiftTimeline 6s ease infinite';
    
    // Add keyframes to style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShiftTimeline {
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

  const handleLogout = () => {
    resetProgress();
    router.push('/auth');
  };

  return (
    <div>
      <AdaptiveBackground step="timeline" />

      <TimelinePage onLogout={handleLogout} />

      <MusicToggle isPlaying={isPlaying} onClick={toggleMusic} />
    </div>
  );
}

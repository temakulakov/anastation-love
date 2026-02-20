'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

type BackgroundMusicContextValue = {
  isPlaying: boolean;
  toggleMusic: () => void;
  playMusic: () => Promise<void>;
};

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(null);

export const BackgroundMusicProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/background.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    const audio = audioRef.current;
    const syncState = () => setIsPlaying(!audio.paused);
    audio.addEventListener('play', syncState);
    audio.addEventListener('pause', syncState);
    syncState();

    return () => {
      audio.removeEventListener('play', syncState);
      audio.removeEventListener('pause', syncState);
    };
  }, []);

  const playMusic = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
    } catch (err) {
      console.log('Audio play failed:', err);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      void playMusic();
    }
  };

  return (
    <BackgroundMusicContext.Provider value={{ isPlaying, toggleMusic, playMusic }}>
      {children}
    </BackgroundMusicContext.Provider>
  );
};

export const useBackgroundMusic = () => {
  const context = useContext(BackgroundMusicContext);

  if (!context) {
    throw new Error('useBackgroundMusic must be used within BackgroundMusicProvider');
  }

  return context;
};

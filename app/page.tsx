'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProgress } from '@/utils/progressStore';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const step = getProgress();
    if (step === 'timeline') {
      router.push('/timeline');
    } else {
      router.push('/auth');
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <p>Загрузка...</p>
    </div>
  );
}

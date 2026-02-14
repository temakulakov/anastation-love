type Step = 'auth' | 'timeline';

const STORAGE_KEY = 'anastation-progress';

export const getProgress = (): Step => {
  if (typeof window === 'undefined') return 'auth';
  
  const saved = localStorage.getItem(STORAGE_KEY);
  return (saved as Step) || 'auth';
};

export const setProgress = (step: Step) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, step);
};

export const resetProgress = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

import { useEffect, useState } from 'react';

export const useProgressTimer = (newOrder, setNewOrder) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (newOrder) {
      const duration = newOrder.timeout;
      const startTime = Date.now();

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        const newProgress = (remaining / duration) * 100;

        setProgress(newProgress);

        if (remaining <= 0) {
          clearInterval(interval);
          setNewOrder(null);
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [newOrder, setNewOrder]);

  return progress;
};

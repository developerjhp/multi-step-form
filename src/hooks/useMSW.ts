import { useState, useEffect } from 'react';
import { startMSW } from '@/mocks/browser';

/**
 * MSW(Mock Service Worker) 초기화를 관리하는 훅
 * 개발 환경에서만 MSW를 초기화하고, 프로덕션에서는 바로 ready 상태를 반환
 */
export function useMSW() {
  const [isReady, setIsReady] = useState(process.env.NODE_ENV === 'production');

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      startMSW()
        .then(() => {
          setIsReady(true);
        })
        .catch((error) => {
          console.error('Failed to start MSW:', error);
          setIsReady(true);
        });
    }
  }, []);

  return isReady;
}

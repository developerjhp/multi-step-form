import { useState, useEffect } from 'react';

export const DESKTOP_MIN_WIDTH = 1024;

/**
 * 현재 화면 너비가 최소 너비 이상인지 확인하는 훅
 * @param minWidth 최소 너비 (px)
 * @returns 현재 화면 너비가 최소 너비 이상인지 여부
 */
export function useIsAboveMinWidth(minWidth: number): boolean {
  const [isAboveMinWidth, setIsAboveMinWidth] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsAboveMinWidth(window.innerWidth >= minWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [minWidth]);

  return isAboveMinWidth;
}

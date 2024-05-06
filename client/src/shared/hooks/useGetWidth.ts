import React, { useEffect } from 'react';

export const useGetWidth = (
  currentWidth: number,
  setCurrentWidth: React.Dispatch<React.SetStateAction<number>>,
) => {
  useEffect(() => {
    const getWidth = () => {
      setCurrentWidth(window.innerWidth);
    };

    getWidth();
    window.addEventListener('resize', getWidth);

    return () => {
      window.removeEventListener('resize', getWidth);
    };
  }, [currentWidth]);
};

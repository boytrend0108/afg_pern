import React, { useEffect } from 'react';

export const useGetAppWidth = (
  currentWidth: number,
  setCurrentWidth: React.Dispatch<React.SetStateAction<number>>,
) => {
  useEffect(() => {
    const getWidth = () => {
      setCurrentWidth(document.body.clientWidth);
    };

    getWidth();
    window.addEventListener('resize', getWidth);

    return () => {
      window.removeEventListener('resize', getWidth);
    };
  }, [currentWidth]);
};

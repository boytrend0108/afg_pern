import { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
};

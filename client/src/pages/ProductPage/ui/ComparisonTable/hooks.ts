import { useEffect } from 'react';

export const useGetTitle = (setBtnTitle: (v: string) => void) => {
  useEffect(() => {
    const changeBtnTitle = () => {
      const width = window.innerWidth;

      switch (true) {
        case width <= 600:
          setBtnTitle('☆');
          break;

        default:
          setBtnTitle('Add to favorite');
      }
    };

    changeBtnTitle();

    window.addEventListener('resize', changeBtnTitle);

    return () => {
      window.removeEventListener('resize', changeBtnTitle);
    };
  }, []);
};

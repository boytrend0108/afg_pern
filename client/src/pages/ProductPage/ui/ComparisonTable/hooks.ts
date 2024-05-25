import { useEffect } from 'react';

export const useGetTitle = (setBtnTitle: (v: string) => void) => {
  useEffect(() => {
    const changeBtnTitle = () => {
      const width = window.innerWidth;

      switch (true) {
        case width <= 425:
          setBtnTitle('☆');
          break;

        case width <= 600:
          setBtnTitle('Add to ☆');
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

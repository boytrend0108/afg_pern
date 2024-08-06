import { useEffect } from 'react';

type Args = (v: number) => void;

export const useGetSliderWidth = (setSliderWidth: Args) => {
  useEffect(() => {
    const getSliderWidth = () => {
      const container = document.querySelector('.my-container');
      const box = document.querySelector('.MainSection__box');
      let containerPadding;
      let gap;

      if (container) {
        containerPadding = window
          .getComputedStyle(container)
          .paddingInline.slice(0, -2);
      } else {
        containerPadding = 30;
      }

      if (box) {
        gap = window.getComputedStyle(box).columnGap.slice(0, -2);
      }

      if (containerPadding && gap) {
        setSliderWidth(
          (document.body.clientWidth - +gap - +containerPadding) / 2,
        );
      }
    };

    getSliderWidth();

    window.addEventListener('resize', getSliderWidth);

    return () => {
      window.removeEventListener('resize', getSliderWidth);
    };
  }, []);
};

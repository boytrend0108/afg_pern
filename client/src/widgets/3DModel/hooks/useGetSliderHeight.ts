import React, { useEffect } from 'react';

const RATIO = 1; // maybe redundant

type Args = {
  main: React.RefObject<HTMLDivElement>;
  drop: React.RefObject<HTMLDivElement>;
  show: boolean;
};

export const useGetSliderHeight = ({ main, drop, show }: Args) => {
  useEffect(() => {
    if (main.current) {
      if (!show) {
        setTimeout(() => {
          if (main.current) {
            main.current.style.height = '0px';
          }
        }, 0);
      } else {
        if (!drop.current) {
          return;
        }

        const width = drop.current.clientWidth;

        main.current.style.height = width * RATIO + 'px';
      }
    }
  }, [show]);
};

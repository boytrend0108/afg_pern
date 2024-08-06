import React, { useEffect } from 'react';
import { CategoryType } from '../../../entities/CategoryItem';
import { ROW_HEIGHT } from '../consts';

type Props = {
  list: React.RefObject<HTMLDivElement>;
  wrapper: React.RefObject<HTMLDivElement>;
  setBattonVisible: (v: boolean) => void;
  categories: CategoryType[];
};

export const useAdjustBtnVisibility = ({
  list,
  wrapper,
  setBattonVisible,
  categories,
}: Props) => {
  useEffect(() => {
    const adjustBtnVisibility = () => {
      if (list.current && wrapper.current) {
        if (list.current.offsetHeight >= 2 * ROW_HEIGHT) {
          setBattonVisible(true);
          wrapper.current.style.height = 2 * ROW_HEIGHT + 'px';
        } else {
          setBattonVisible(false);
          wrapper.current.style.height = 'fit-content';
        }
      }
    };

    adjustBtnVisibility();

    window.addEventListener('resize', adjustBtnVisibility);

    return () => {
      window.removeEventListener('resize', adjustBtnVisibility);
    };
  }, [categories]);
};

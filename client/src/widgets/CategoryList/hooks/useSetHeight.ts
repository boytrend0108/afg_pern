import React, { useEffect } from 'react';
import { CATEGORIES } from '../../../shared/consts/categories';

export const useSetHeight = (
  list: React.MutableRefObject<null>,
  setListHeight: (v: number) => void,
) => {
  useEffect(() => {
    const getListHeight = () => {
      const categoryItem = document.querySelector('.CategoryItem');

      if (!categoryItem || !list.current) {
        return;
      }

      const columns = window
        .getComputedStyle(list.current)
        .gridTemplateColumns.split(' ').length;

      const categoryHeight = categoryItem?.clientHeight + 20;

      setListHeight(Math.ceil(CATEGORIES.length / columns) * categoryHeight);
    };

    getListHeight();

    window.addEventListener('resize', getListHeight);

    return () => {
      window.removeEventListener('resize', getListHeight);
    };
  }, []);
};

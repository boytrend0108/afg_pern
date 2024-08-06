import React, { useEffect } from 'react';
import * as Product from '../../../entities/ProductItem';

export const useGetCurrentProduct = (
  id: string | undefined,
  setWidth: (v: number) => void,
  main: React.RefObject<HTMLDivElement>,
  dispatch: (action: any) => Promise<any>,
) => {
  useEffect(() => {
    if (id) {
      dispatch(Product.getOne(id)).then(() => {
        if (main.current) {
          main.current.scrollIntoView();
        }
      });
    }

    const setViewPortWidth = () => {
      setWidth(window.innerWidth);
    };

    setViewPortWidth();

    window.addEventListener('resize', setViewPortWidth);

    return () => {
      window.removeEventListener('resize', setViewPortWidth);
    };
  }, [id]);
};

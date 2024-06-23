import { useEffect } from 'react';
import { ProductType } from '../../../../../entities/ProductItem/types';
import { BREAKPOINT } from '../../../../../shared/consts/breakPoints';

export function useAddAdvertising(
  width: number,
  products: ProductType[],
  setCurrentProd: (v: ProductType[]) => void,
) {
  useEffect(() => {
    if (width === 0) {
      return;
    }

    switch (true) {
      case width <= BREAKPOINT.TABLET:
        setCurrentProd(products.slice(1));
        break;

      case width <= BREAKPOINT.DESKTOP_S:
        setCurrentProd(products.slice(3));
        break;

      default:
        setCurrentProd(products.slice(1));
    }
  }, [width, products]);
}

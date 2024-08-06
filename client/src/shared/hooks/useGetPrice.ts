import { useEffect } from 'react';
import { ProductType } from '../../entities/ProductItem/types';
import { useAppSelector } from './reduxHooks';

export const useGetPrice = (
  product: ProductType | null,
  setPreparedPrice: (v: string) => void,
) => {
  const { currencySign, rate, currency } = useAppSelector(
    (state) => state.currency,
  );

  useEffect(() => {
    if (!product) {
      return;
    }

    setPreparedPrice(
      `${currencySign} ${Math.round(product?.price * rate[currency])}`,
    );
  }, [currency, product]);
};

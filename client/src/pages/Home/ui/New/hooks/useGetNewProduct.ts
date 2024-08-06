import { useEffect } from 'react';
import * as productItem from '../../../../../entities/ProductItem';

export function useGetNewProduct(dispatch: Function) {
  useEffect(() => {
    const search = new URLSearchParams();

    search.set('show', 'new');
    dispatch(productItem.getAll(search));
  }, []);
}

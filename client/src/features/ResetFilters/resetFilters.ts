import React from 'react';
import * as productItem from '../../entities/ProductItem';

export function resetFilters(
  setSearchParams: (v: URLSearchParams) => void,
  dispatch: any,
  setShowFilters?: (v: boolean) => void,
  ref?: React.RefObject<HTMLDivElement>,
) {
  const params = new URLSearchParams();

  setSearchParams(params);
  dispatch(productItem.getAll(params));

  if (setShowFilters) {
    setShowFilters(false);
  }

  if (ref && ref.current) {
    ref.current.scrollIntoView();
  }
}

import { ProductOptionsType } from '../../../entities/ProductItem/types';

const TOTAL_PRODUCT_OPTIONS = 30;

export const validateForm = (product: Partial<ProductOptionsType>): Boolean => {
  const formLenght = Object.keys(product).length;

  if (formLenght < TOTAL_PRODUCT_OPTIONS) {
    return false;
  }

  for (const value of Object.values(product)) {
    switch (true) {
      case typeof value === 'string':
        if (!value.trim()) {
          return false;
        }
        break;

      case typeof value === 'number':
        if (!value) {
          return false;
        }
        break;

      case typeof value === 'object':
        if (value.length < 3) {
          return false;
        }
        break;
    }
  }

  return true;
};

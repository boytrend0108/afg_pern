import { ProductOptionsType } from '../../../../entities/ProductItem/types';

export type OptionGroupe = {
  common: { [key: keyof ProductOptionsType]: string | boolean | number };
  sizes: { [key: keyof ProductOptionsType]: string | boolean | number };
  engine: { [key: keyof ProductOptionsType]: string | boolean | number };
  tires: { [key: keyof ProductOptionsType]: string | boolean | number };
  other: { [key: keyof ProductOptionsType]: string | boolean | number };
};

import {
  OptionType,
  ProductOptionsType,
} from '../../../../../entities/ProductItem/types';

export const getOptions = (data: OptionType[]) => {
  if (!data) {
    return;
  }

  const options: Partial<ProductOptionsType> = {};

  data.forEach((el: OptionType) => {
    options[el.title] = el.description;
  });

  return options;
};

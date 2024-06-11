import {
  ProductOptionsType,
  ProductType,
} from '../../../../../entities/ProductItem/types';

type OptionsType = {
  [key: keyof ProductOptionsType]: (string | number | boolean)[];
};

type PrepareOptionsProps = {
  compare: ProductType[];
  setOptions: (v: OptionsType) => void;
};

export const prepareOptions = ({
  compare,
  setOptions,
}: PrepareOptionsProps) => {
  if (!compare) {
    return;
  }

  const options: OptionsType = {};

  compare.forEach((item, i) => {
    item.product_infos.forEach((el) => {
      if (!options[el.title]) {
        options[el.title] = [];
      }

      options[el.title][i] = el.description;
    });
  });

  setOptions(options);
};

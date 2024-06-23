/* eslint-disable camelcase */
/* eslint-disable max-len */
import { ProductType } from '../../../../../entities/ProductItem/types';
import { GetFavoriteResponse } from '../../../../../features/AddToFaforites/api';

type Callback = (favorite: GetFavoriteResponse[]) => Partial<ProductType>[];

export const getPreparedFavorites: Callback = (favorites) => {
  return favorites.map((item) => {
    const {
      id,
      title,
      price,
      image,
      year,
      hours,
      category,
      brand,
      product_infos,
      product_images,
    } = item.product;

    const product = {
      id,
      title,
      price,
      year,
      hours,
      product_infos,
      product_images,
      category,
      brand,
      image,
    };

    return product;
  });
};

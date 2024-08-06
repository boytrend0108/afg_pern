import { httpClient } from '../../app/configs/httpConfig';
import { OptionType } from '../../entities/ProductItem/types';

type BodyType = {
  userId: number;
  productId: number;
};

type ResponseType = {
  result: 'string';
  message: 'string';
};

export type GetFavoriteResponse = {
  id: number;
  userId: number;
  productId: number;
  product: {
    id: number;
    title: string;
    price: number;
    year: number;
    hours: number;
    image: string;
    category: string;
    brand: string;
    product_infos: OptionType[];
    product_images: string[];
    product_image_inters: string[];
  };
};

export const addFavorite = (data: BodyType): Promise<ResponseType> => {
  return httpClient.post('/favorite/add', data);
};

export const deleteFavorite = (data: BodyType): Promise<ResponseType> => {
  const { productId, userId } = data;

  return httpClient.delete(`/favorite/delete/${productId}/${userId}`);
};

export const getFavorite = (userId: number): Promise<GetFavoriteResponse[]> => {
  return httpClient.get(`/favorite/${userId}`);
};

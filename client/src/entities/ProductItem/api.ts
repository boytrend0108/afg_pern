import { httpClient } from '../../app/configs/httpConfig';
import { ProductType, ResponseGetProducts } from './types';

export const productAPI = {
  create(categoryDTO: FormData): Promise<ProductType> {
    return httpClient.post('/product/create', categoryDTO);
  },

  getAll(): Promise<ResponseGetProducts> {
    return httpClient.get('/product');
  },

  getProductById(id: string) {
    return httpClient.get(`/product/${id}`);
  },

  delete(id: number) {
    return httpClient.delete(`/product/delete/${id}`);
  },
};

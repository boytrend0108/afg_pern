import { httpClient } from '../../app/configs/httpConfig';
import {
  BookProductResponse,
  DTOBookProduct,
  DTOSendRequest,
  ProductType,
  ResponseGetProducts,
} from './types';

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

  book(data: DTOBookProduct): Promise<BookProductResponse> {
    return httpClient.post('/reserve', data);
  },

  sendRequest(data: DTOSendRequest): Promise<string> {
    return httpClient.post('/request', data);
  },
};

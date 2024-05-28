import { httpClient } from '../../app/configs/httpConfig';
import { BrandCreateDTO, BrandCreateResponce } from './types';

export const brandAPI = {
  create(brandDTO: BrandCreateDTO): Promise<BrandCreateResponce> {
    return httpClient.post('/brand/create', brandDTO);
  },

  getAll(): Promise<BrandCreateResponce[]> {
    return httpClient.get('/brand');
  },

  delete(id: number) {
    return httpClient.delete(`/brand/delete/${id}`);
  },
};

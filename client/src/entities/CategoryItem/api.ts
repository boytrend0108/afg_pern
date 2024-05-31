import { httpClient } from '../../app/configs/httpConfig';
import { CategoryType, CategoryDeleteDTO } from './types.ts';

export const categoryAPI = {
  create(categoryDTO: FormData): Promise<CategoryType> {
    return httpClient.post('/category/create', categoryDTO);
  },

  getAll(): Promise<CategoryType[]> {
    return httpClient.get('/category');
  },

  delete(data: CategoryDeleteDTO) {
    return httpClient.delete(`/category/delete/${data.id}`);
  },
};

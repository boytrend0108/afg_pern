import { httpClient } from '../../app/configs/httpConfig';
import { CategoryCreateResponce, CategoryDeleteDTO } from './types.ts';

export const categoryAPI = {
  create(categoryDTO: FormData): Promise<CategoryCreateResponce> {
    return httpClient.post('/category/create', categoryDTO);
  },

  getAll(): Promise<CategoryCreateResponce[]> {
    return httpClient.get('/category');
  },

  delete(data: CategoryDeleteDTO) {
    return httpClient.delete(`/category/delete/${data.id}/${data.fileId}`);
  },
};

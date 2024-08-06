import localStorageService from '../../shared/services/localStorageService';
import { AppDispatch } from '../configs/storeConfig';
import { user } from '../../entities/User';

export const checkAuth = (dispatch: AppDispatch) => {
  const token = localStorageService.get('accessToken');

  if (token) {
    dispatch(user.checkAuth());
  }
};

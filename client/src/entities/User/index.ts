import userReducer from './store/userSlice';
import { register, login, logout, update, checkAuth } from './store/thunks';
import { userAPI } from './api';
import * as actions from './store/userSlice';

export const user = {
  userReducer,
  register,
  login,
  logout,
  update,
  checkAuth,
  userAPI,
  actions,
};

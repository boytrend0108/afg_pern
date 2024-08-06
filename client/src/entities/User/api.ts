import { AxiosResponse } from 'axios';
import { httpClient } from '../../app/configs/httpConfig';
import { DtoRegistration } from '../../widgets/Forms/RegistrationForm';
import {
  UserCreateResponceType,
  UserLoginResponceType,
  UserUpdateType,
} from './types';
import { DtoLogin } from '../../widgets/Forms/LoginForm/types/DtoLogin';

export const userAPI = {
  register(
    registrationDto: DtoRegistration,
  ): Promise<AxiosResponse<UserCreateResponceType>> {
    return httpClient.post(`/user/registration`, registrationDto);
  },

  activate(activationToken: string): Promise<AxiosResponse> {
    return httpClient.get(`/user/activate/${activationToken}`);
  },

  login(loginDTO: DtoLogin): Promise<UserLoginResponceType> {
    return httpClient.post('/user/login', loginDTO);
  },

  logout(): Promise<any> {
    return httpClient.post('/user/logout');
  },

  refresh(): Promise<UserLoginResponceType> {
    return httpClient.post('/user/refresh');
  },

  update(dto: UserUpdateType): Promise<UserUpdateType> {
    return httpClient.post('/user/update', dto);
  },

  checkAuth(): Promise<UserLoginResponceType> {
    return httpClient.post('/user/auth');
  },
};

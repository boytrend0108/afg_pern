import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { userAPI } from '../../entities/User/api';
import localStorageService from '../../shared/services/localStorageService';

export const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  withCredentials: true,
});

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(req: InternalAxiosRequestConfig<any>) {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    req.headers['Authorization'] = `Bearer ${JSON.parse(accessToken)}`;
  }

  return req;
}

function onResponseSuccess(res: AxiosResponse) {
  return res.data;
}

async function onResponseError(error: any) {
  const originalRequest = error.config;

  if (error.response.status !== 401) {
    throw error;
  }

  try {
    const { accessToken } = await userAPI.refresh();

    localStorageService.set('accessToken', accessToken);

    return httpClient.request(originalRequest);
  } catch (err) {
    throw err;
  }
}

import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(req: InternalAxiosRequestConfig<any>) {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    req.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return req;
}

function onResponseSuccess(res: AxiosResponse) {
  return res.data;
}

async function onResponseError(error: any) {
  const originalRequest = error.config;

  // eslint-disable-next-line no-console
  console.log(originalRequest);

  if (error.response.status !== 401) {
    throw error;
  }

  // refresh toker
}

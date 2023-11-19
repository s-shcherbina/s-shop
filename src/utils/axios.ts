import axios from 'axios';
import { IAuthResponse } from '../common/types';

export const API_URL = 'http://localhost:3001/';

const $instance = axios.create({ withCredentials: true, baseURL: API_URL });

$instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$instance.interceptors.response.use(
  (config) => config,
  async (err) => {
    if (err.response.status === 401 && err.config) {
      try {
        const user = await axios.get<IAuthResponse>(`${API_URL}auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', user.data.accessToken);
        return $instance.request(err.config);
      } catch (e: any) {
        console.error(e.response?.data?.message);
        if (e.response?.data?.message === 'Не авторизований') {
          localStorage.removeItem('token');
        }
      }
    }
    throw err;
  }
);

export default $instance;

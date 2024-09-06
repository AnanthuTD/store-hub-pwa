import { clearShopOwner } from '@/infrastructure/redux/slices/shopOwner/shopOwnerSlice';
import { store } from '@/infrastructure/redux/store';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance: AxiosInstance = axios.create(config);

// Response interceptor to handle responses and errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      // Clear shopOwner details from Redux
      store.dispatch(clearShopOwner());

      // Determine where to redirect
      let redirectPath = '';
      if (response.config.url.includes('/shopOwner/')) {
        redirectPath = '/shop/signin';
      } else if (response.config.url.includes('/admin/')) {
        redirectPath = '/admin/signin';
      } else if (response.config.url.includes('/partner/')) {
        redirectPath = '/partner/signup';
      }

      if (redirectPath)
        // Redirect to login page
        window.location.replace(`http://localhost:5173${redirectPath}`);

      // Alternatively, you can show a popup if needed
      // showPopup('Session expired. Please log in again.');

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

import axios from 'axios';
import { API_URLS } from '../constants';

// 1. Create the instance
const axiosInstance = axios.create({
  baseURL: API_URLS.BASE,
});

// 2. LOGIC: The Request Interceptor
// Every time you send a request, this "middleman" grabs the token from your browser
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token; // Attaching the "VIP Pass"
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
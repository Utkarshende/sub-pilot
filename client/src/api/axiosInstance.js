import axios from 'axios';
import { API_URLS } from '../constants';

// 1. Create the Instance
const axiosInstance = axios.create({
  baseURL: API_URLS.BASE, // Automatically adds http://localhost:8080/api to every call
});

// 2. The Request Interceptor (The "Mail Clerk")
axiosInstance.interceptors.request.use(
  (config) => {
    // Logic: Look into browser memory for the token
    const token = localStorage.getItem('token');
    
    if (token) {
      // Logic: Attach it to the 'x-auth-token' header exactly like we did in Postman
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. The Response Interceptor (The "Bouncer")
// Logic: If the server ever says "Token Expired" (401), automatically log the user out
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
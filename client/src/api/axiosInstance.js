import axios from 'axios';

// 1. We name it 'API' here
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// 2. We MUST use 'API' here too
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. And export 'API'
export default API;
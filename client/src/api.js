import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5008/api', // Match your 5008 port
});

// Add this to "mimic" your Postman Authorization header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
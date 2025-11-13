import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true, // Important: allows cookies to be sent/received
});

// Request interceptor: Add token from cookie to Authorization header
api.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const token = Cookies.get('authToken');
    
    // If token exists, add it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token attached to request:', config.url);
    } else {
      console.warn('⚠️ No auth token found in cookie for request:', config.url);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If 401 Unauthorized, token might be expired
    if (error.response?.status === 401) {
      // Remove token from cookie
      Cookies.remove('authToken');
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;


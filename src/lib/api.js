import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';

/**
 * Axios instance with default configuration
 */
const api = axios.create({
  baseURL: `${API_URL}/api/${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * Set auth token getter function
 * This should be called from _app.js or layout.js with Clerk's getToken function
 */
let getAuthTokenFn = null;

export const setAuthTokenGetter = (fn) => {
  getAuthTokenFn = fn;
};

/**
 * Request interceptor to add auth token
 */
api.interceptors.request.use(
  async (config) => {
    // Try to get token from Clerk first
    if (getAuthTokenFn) {
      try {
        const token = await getAuthTokenFn();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        }
      } catch (error) {
        console.error('Error getting Clerk token:', error);
      }
    }

    // Fallback to localStorage (for backwards compatibility)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't auto-redirect, let the page handle it
      console.warn('Unauthorized request:', error.config?.url);
    }
    return Promise.reject(error);
  }
);

export default api;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: '/auth',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  VERIFY_EMAIL: '/auth/verify-email',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Users
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  
  // Vehicles
  VEHICLES: '/vehicles',
  VEHICLE_BY_ID: (id) => `/vehicles/${id}`,
  
  // Parts
  PARTS: '/parts',
  PART_BY_ID: (id) => `/parts/${id}`,
  
  // Swaps
  SWAPS: '/swaps',
  SWAP_BY_ID: (id) => `/swaps/${id}`,
  
  // Messages
  MESSAGES: '/messages',
  CONVERSATIONS: '/messages/conversations',
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  
  // Reviews
  REVIEWS: '/reviews',
};

// Export base URL for other uses
export { API_URL, API_VERSION };

// API Configuration
// Central configuration for API base URLs and endpoints

const isDevelopment = __DEV__;

export const API_CONFIG = {
  // Base URL for API
  BASE_URL: isDevelopment 
    ? 'http://localhost:5000/api' 
    : 'https://api.ballerpro.com/api',
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // API endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
    },
    // User
    USER: {
      PROFILE: '/user/me',
      UPDATE_PROFILE: '/user/profile',
      CHANGE_PASSWORD: '/user/change-password',
    },
    // Onboarding
    ONBOARDING: {
      SAVE: '/user/onboarding',
      GET: '/user/onboarding',
    },
  },
} as const;

export default API_CONFIG;


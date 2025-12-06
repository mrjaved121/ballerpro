import axios, { AxiosInstance, AxiosError } from 'axios';

// API base URL - should be moved to config
const API_BASE_URL = __DEV__
  ? 'http://localhost:5000/api'
  : 'https://api.ballerpro.com/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Add auth token if available
        try {
          const { authService } = await import('../auth/authService');
          const token = await authService.getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          // Token not available, continue without it
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh token
            const { authService } = await import('../auth/authService');
            await authService.refreshToken();

            // Retry original request with new token
            const token = await authService.getToken();
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, clear auth
            const { authService } = await import('../auth/authService');
            await authService.clearAuth();
            // Could redirect to login here if needed
          }
        }

        return Promise.reject(error);
      }
    );
  }

  get instance(): AxiosInstance {
    return this.client;
  }
}

export const apiService = new ApiService();
export default apiService.instance;


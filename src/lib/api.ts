import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // For Laravel Sanctum cookies
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Token is handled by Sanctum cookies, but we can add additional headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear auth state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('tawhid-auth-storage');
        window.location.href = '/login';
      }
    }

    // Handle 419 CSRF token mismatch
    if (error.response?.status === 419) {
      // Refresh CSRF token and retry
      try {
        await api.get('/sanctum/csrf-cookie');
        return api(originalRequest);
      } catch {
        // If CSRF refresh fails, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (data: { phone: string; password: string }) =>
    api.post('/auth/login', data),

  register: (data: { name: string; phone: string; password: string; password_confirmation: string }) =>
    api.post('/auth/register', data),

  sendOtp: (phone: string) =>
    api.post('/auth/send-otp', { phone }),

  verifyOtp: (data: { phone: string; otp: string }) =>
    api.post('/auth/verify-otp', data),

  logout: () =>
    api.post('/auth/logout'),

  getUser: () =>
    api.get('/auth/user'),

  forgotPassword: (phone: string) =>
    api.post('/auth/forgot-password', { phone }),

  resetPassword: (data: { token: string; password: string; password_confirmation: string }) =>
    api.post('/auth/reset-password', data),
};

// Contents API
export const contentsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/contents', { params }),

  getById: (id: number) =>
    api.get(`/contents/${id}`),

  getCategories: () =>
    api.get('/categories'),
};

// Associations API
export const associationsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/associations', { params }),

  getById: (id: number | string) =>
    api.get(`/associations/${id}`),

  getContents: (id: number | string, params?: Record<string, unknown>) =>
    api.get(`/associations/${id}/contents`, { params }),

  getEvents: (id: number | string, params?: Record<string, unknown>) =>
    api.get(`/associations/${id}/events`, { params }),
};

// Events API
export const eventsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/events', { params }),

  getById: (id: number | string) =>
    api.get(`/events/${id}`),

  participate: (id: number | string) =>
    api.post(`/events/${id}/participate`),

  cancelParticipation: (id: number | string) =>
    api.delete(`/events/${id}/participate`),
};

// Questions API
export const questionsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/questions', { params }),

  getById: (id: number | string) =>
    api.get(`/questions/${id}`),

  create: (data: { title: string; content: string; category_id: number; is_anonymous?: boolean; is_public?: boolean }) =>
    api.post('/questions', data),

  getMyQuestions: () =>
    api.get('/questions/my'),
};

// Payments API
export const paymentsApi = {
  initiatePayment: (data: { provider: string; subscription_type: string }) =>
    api.post('/payments/initiate', data),

  verifyPayment: (reference: string) =>
    api.get(`/payments/verify/${reference}`),

  getHistory: () =>
    api.get('/payments/history'),
};

export default api;

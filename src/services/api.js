import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Events
export const getEvents = (params) => api.get('/api/events', { params });
export const getEvent = (id) => api.get(`/api/events/${id}`);
export const captureEmail = (data) => api.post('/api/events/capture-email', data);
export const importEvent = (id, notes) => api.post(`/api/events/${id}/import`, { notes });
export const updateEventStatus = (id, status) => api.patch(`/api/events/${id}/status`, { status });
export const getDashboardStats = () => api.get('/api/events/admin/stats');
// Verify OTP
export const verifyOTP = (data) => api.post('/events/verify-otp', data);

// Resend OTP
export const resendOTP = (data) => api.post('/events/resend-otp', data);
// Auth
export const getCurrentUser = () => api.get('/api/auth/me');
export const logout = () => api.post('/api/auth/logout');

export default api;
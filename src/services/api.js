import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public endpoints
export const getEvents = (params) => api.get('/api/events', { params });
export const getEvent = (id) => api.get(`/api/events/${id}`);
export const captureEmail = (data) => api.post('/api/events/capture-email', data);

// OTP endpoints - ADD THESE!
export const verifyOTP = (data) => api.post('/api/events/verify-otp', data);
export const resendOTP = (data) => api.post('/api/events/resend-otp', data);

// Auth endpoints
export const getCurrentUser = () => api.get('/api/auth/me');

// Admin endpoints
export const importEvent = (id, data) => api.post(`/api/events/${id}/import`, data);
export const updateEventStatus = (id, data) => api.patch(`/api/events/${id}/status`, data);
export const getDashboardStats = () => api.get('/api/events/admin/stats');

export default api;
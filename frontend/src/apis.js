import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE;
export const api = axios.create({ baseURL: BASE });

export const fetchCreators = (opts) => api.get('/creators', { params: opts }).then(r => r.data);
export const fetchCreator = (id) => api.get(`/creator/${id}`).then(r => r.data);
export const createCreator = (payload) => api.post('/creators', payload).then(r => r.data);
export const updateCreator = (id, payload) => api.put(`/creators/${id}`, payload).then(r => r.data);
export const deleteCreator = (id) => api.delete(`/creators/${id}`).then(r => r.data);
export const registerUser = (payload) => api.post('/register', payload).then(r => r.data);
export const loginUser = (payload) => api.post('/login', payload).then(r => r.data);
export const userProtectedRoute = (token) => api.get('/user-auth', { headers: { Authorization: `Bearer ${token}`}})
export const adminProtectedRoute = (token) => api.get('/user-auth', { headers: { Authorization: `Bearer ${token}`}})
export const fetchLogs = () => api.get('/all-logs').then(r => r.data);
export const createLogs = (payload) => api.post('/logs', payload).then(r => r.data);
import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE;
export const api = axios.create({ baseURL: BASE });

export const fetchCreators = (opts) => api.get('/creators', { params: opts }).then(r => r.data);
export const fetchCreator = (id) => api.get(`/creator/${id}`).then(r => r.data);
export const createCreator = (payload) => api.post('/creators', payload).then(r => r.data);
export const updateCreator = (id, payload) => api.put(`/creators/${id}`, payload).then(r => r.data);
export const deleteCreator = (id) => api.delete(`/creators/${id}`).then(r => r.data);
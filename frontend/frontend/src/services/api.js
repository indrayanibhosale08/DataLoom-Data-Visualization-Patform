// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' }); // Your backend URL

export const register = (data) => API.post('/api/auth/register', data);
export const login = (data) => API.post('/api/auth/login', data);
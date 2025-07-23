import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_HOST;

export const getLibrary = (userId) => axios.get(`${API_URL}/library/${userId}`);

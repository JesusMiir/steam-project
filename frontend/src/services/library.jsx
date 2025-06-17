import axios from 'axios';

// const API_URL = import.meta.env.BACKEND_HOST;
const API_URL = 'http://localhost:3000';

export const getLibrary = (userId) => axios.get(`${API_URL}/library/${userId}`);

import axios from 'axios';

const API_URL = 'http://63.178.69.39:3000';

export const getLibrary = (userId) => axios.get(`${API_URL}/library/${userId}`);

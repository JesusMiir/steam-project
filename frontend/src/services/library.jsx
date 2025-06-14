import axios from 'axios';

const API_URL = 'http://54.93.213.14';

export const getLibrary = (userId) => axios.get(`${API_URL}/library/${userId}`);

import axios from 'axios';

const API_URL = 'https://api.steam-project.es';

export const getLibrary = (userId) => axios.get(`${API_URL}/library/${userId}`);

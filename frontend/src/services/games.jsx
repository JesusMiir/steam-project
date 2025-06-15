import axios from 'axios';

const API_URL = 'https://api.steam-project.es';

export const getGames = () => axios.get(`${API_URL}/games`);
export const addToCart = (userId, gameId) =>
  axios.post(`${API_URL}/cart/add`, { userId, gameId });
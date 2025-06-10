import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getGames = () => axios.get(`${API_URL}/games`);
export const addToCart = (userId, gameId) =>
  axios.post(`${API_URL}/cart/add`, { userId, gameId });
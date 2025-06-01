import axios from 'axios';

const API_URL = 'http://63.178.69.39:3000';

export const getGames = () => axios.get(`${API_URL}/games`);
export const addToCart = (userId, gameId) =>
  axios.post(`${API_URL}/cart/add`, { userId, gameId });
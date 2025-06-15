import axios from 'axios';

const API_URL = 'https://api.steam-project.es';

export const getCart = (userId) => axios.get(`${API_URL}/cart/${userId}`);
export const checkoutCart = (userId) =>
    axios.post(`${API_URL}/cart/checkout/${userId}`);

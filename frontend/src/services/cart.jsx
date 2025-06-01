import axios from 'axios';

const API_URL = 'http://63.178.69.39:3000';

export const getCart = (userId) => axios.get(`${API_URL}/cart/${userId}`);
export const checkoutCart = (userId) =>
    axios.post(`${API_URL}/cart/checkout/${userId}`);

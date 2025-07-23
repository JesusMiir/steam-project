import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_HOST;

export const getCart = (userId) => axios.get(`${API_URL}/cart/${userId}`);
export const checkoutCart = (userId) =>
    axios.post(`${API_URL}/cart/checkout/${userId}`);

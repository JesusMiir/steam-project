import axios from 'axios';

// const API_URL = import.meta.env.BACKEND_HOST;
const API_URL = 'http://localhost:3000';

export const getCart = (userId) => axios.get(`${API_URL}/cart/${userId}`);
export const checkoutCart = (userId) =>
    axios.post(`${API_URL}/cart/checkout/${userId}`);

import axios from 'axios';
const BASE_URL ="http://localhost:7000";

const axiosInstance = axios.create({
    baseURL: BASE_URL, 
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export default axiosInstance;

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

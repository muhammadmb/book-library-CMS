import axios from 'axios';
import { API_URL } from './URLConstants';

export default axios.create({
    baseURL: API_URL
});

export const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
    }
});

export const axiosAuth = axios.create({
    baseURL: API_URL,
    withCredentials: true
});
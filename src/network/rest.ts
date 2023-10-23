import axios, { AxiosInstance } from 'axios';

export const api:AxiosInstance = axios.create({
    baseURL: `http://${process.env.SERVER ? process.env.SERVER : 'localhost:8000'}/`
});
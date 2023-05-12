import axios, { AxiosInstance } from 'axios';

const API_HOST_URL = '';

const BASE_URL = '';

const instance: AxiosInstance = axios.create({
  baseURL: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '' : API_HOST_URL) + BASE_URL,
  headers: {
    "Content-type": "application/json",
    "x-api-key": ""
  },
  timeout: 5000,
});

export default instance;
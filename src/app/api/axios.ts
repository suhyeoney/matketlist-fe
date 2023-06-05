import axios, { AxiosInstance } from 'axios';

const API_HOST_URL = 'https://openapi.naver.com';

const BASE_URL = '/v1';

console.log(process.env.NODE_ENV);

const instance: AxiosInstance = axios.create({
  baseURL: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '' : API_HOST_URL) + BASE_URL,
  headers: {
    "Content-type": "application/json",
    "X-Naver-Client-Id": process.env.NEXT_PUBLIC_DEV_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_DEV_SECRET_KEY
  },
  timeout: 5000,
});

export default instance;
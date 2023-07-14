import axios, { AxiosInstance } from 'axios';

const API_HOST_URL_NAVER = 'https://openapi.naver.com';
const API_HOST_URL_GOOGLE = 'https://maps.googleapis.com';

const BASE_URL_NAVER= '/v1';
const BASE_URL_GOOGLE = '';

console.log(process.env.NODE_ENV);

export const instanceForNaverApi: AxiosInstance = axios.create({
  // baseURL: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '' : API_HOST_URL_NAVER) + BASE_URL_NAVER,
  baseURL: API_HOST_URL_NAVER + BASE_URL_NAVER,
  headers: {
    "Content-type": "application/json",
    "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_DEV_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_DEV_SECRET_KEY
  },
  timeout: 5000,
});

export const instanceForGoogleApi: AxiosInstance = axios.create({
  // baseURL: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '' : API_HOST_URL_GOOGLE) + BASE_URL_GOOGLE,
  baseURL: API_HOST_URL_GOOGLE + BASE_URL_GOOGLE,
  headers: {
    "Content-type": "application/json"
  },
  timeout: 5000,
});
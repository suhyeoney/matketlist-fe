import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const BASE_URL_NAVER= '/naver';
const BASE_URL_PROFILE= '/profile';
const BASE_URL_GOOGLE = '/google';

const isServer = typeof window === 'undefined';

console.log(process.env.NODE_ENV);

export const defaultInstance: AxiosInstance = axios.create({
  // baseURL: BASE_URL_NAVER,
  headers: {
    "Content-type": "text/html;charset=utf-8",
  },
  timeout: 5000,
});

export const instanceForNaverApi: AxiosInstance = axios.create({
  baseURL: BASE_URL_NAVER,
  headers: {
    "Content-type": "application/json",
    // "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_DEV_CLIENT_ID,
    // "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_DEV_SECRET_KEY
  },
  timeout: 5000,
});

export const instanceForNaverProfileApi = (accessToken: string) => {
  return axios.create({
    baseURL: BASE_URL_PROFILE,
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + accessToken 
    },
    timeout: 5000,
  });
};

export const instanceForGoogleApi: AxiosInstance = axios.create({
  baseURL: BASE_URL_GOOGLE,
  headers: {
    "Content-type": "application/json"
  },
  timeout: 5000,
});

defaultInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => setHeader(config));
instanceForNaverApi.interceptors.request.use(async (config: InternalAxiosRequestConfig) => setHeader(config));
instanceForGoogleApi.interceptors.request.use(async (config: InternalAxiosRequestConfig) => setHeader(config));

const setHeader = async (config: InternalAxiosRequestConfig) => {
  if (isServer) {
    const { cookies } = (await import('next/headers'));
    const token = cookies().get('token')?.value;

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
  } else {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
};
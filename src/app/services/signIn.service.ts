import { get } from '@api/api';
import { instanceForNaverApi, instanceForNaverProfileApi } from '@api/axios';
import { AxiosResponse } from 'axios';

interface ResponseTokenType {
  access_token: string,
  token_type: string,
  expires_in: string,
};

const NAVER_API_HOST_URL = 'https://nid.naver.com';
const NAVER_API_AUTH_ENDPOINT = '/oauth2.0/authorize';
const NAVER_API_TOKEN_ENDPOINT = '/oauth2.0/token';
const NAVER_API_PROFILE_ENDPOINT = '/v1/nid/me';
const NAVER_CALLBACK_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/main' : 'https://matketlist.site/main';
// const NAVER_CALLBACK_URL = 'http://localhost:3000/main';


const authorizeNaverApi = () => {
  console.log(process.env.NODE_ENV);
  const requestAuthParams = {
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_NAVER_DEV_CLIENT_ID,
    state: Math.random(),
    redirect_uri: encodeURI(NAVER_CALLBACK_URL),
  };
  try {
    const url = NAVER_API_HOST_URL +
      NAVER_API_AUTH_ENDPOINT +
    `?response_type=${ requestAuthParams.response_type}` +                 
    `&client_id=${ requestAuthParams.client_id }` +   
    `&state=${ requestAuthParams.state }` +             
    `&redirect_uri=${ requestAuthParams.redirect_uri }`;
    return url;
  } catch(e) {
  }
};

const getTokenNaverApi = async (code: string, state: string) => {
  console.log(process.env.NODE_ENV);
  const requestTokenParams = {
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_NAVER_DEV_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_NAVER_DEV_SECRET_KEY,
    code: code,
    state: state,
    redirect_uri: encodeURI(NAVER_CALLBACK_URL),
  };
  try {
    const result = {
      access_token: '',
      user_id: '',
    };
    const response: AxiosResponse = await get<ResponseTokenType>(
      NAVER_API_TOKEN_ENDPOINT, 
      requestTokenParams, 
      instanceForNaverApi
    );
    const data = response.data.access_token;
    if(data) {
      result.access_token = data;
      const responseUserId = await getUserProfileApi(data);
      result.user_id = responseUserId;
      console.log('result', result);
      return result;
    }
  } catch(e) {
  }
};

const getUserProfileApi = async (accessToken: string) => {
  console.log(process.env.NODE_ENV);
  try {
    const res: AxiosResponse = await get<any>(
      NAVER_API_PROFILE_ENDPOINT, 
      {},
      instanceForNaverProfileApi(accessToken)
    );
    const data = res.data.response.id;
    return data;
  } catch(e) {
  }
};

const SignInService = {
  authorizeNaverApi,
  getTokenNaverApi,
  getUserProfileApi,
};

export default SignInService;
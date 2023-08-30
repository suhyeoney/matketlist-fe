import { AxiosResponse } from 'axios';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { _delete, get, post } from '../api/api';
import { instanceForBackend, instanceForGoogleApi, instanceForNaverApi } from '../api/axios';

interface LocalSearchParamsType {
  key: string | undefined,
  query: string,
};

interface PlaceDetailParamsType {
  key: string | undefined,
  placeid: string,
};

interface GetLocationParamsType {
  registerUserId: String,
  regionCode: String,
}

interface DeleteLocationParamsType {
  registerUserId: String,
  placeId: String,
}

const LOCATION_BASE_URL = '/api/v1/locations';

const isServer = typeof window === 'undefined';

const getLocalSearchDataApi = async(params: LocalSearchParamsType) => {
  console.log('>>>>> getLocalSearchDataApi');
  console.log(`isServer: ${ typeof window === 'undefined'}`);
  try {
    const response: AxiosResponse = await get<SearchMatjipInfo>(
      (isServer ? 'https://maps.googleapis.com' : '') +  '/maps/api/place/textsearch/json', 
      params, 
      instanceForGoogleApi
    );
    const data = response.data.results;
    return data;
  } catch(e) {
  }
};

const getPlaceDetailDataApi = async(params: PlaceDetailParamsType) => {
  console.log('>>>>> getPlaceDetailDataApi');
  try {
    const response: AxiosResponse = await get<SearchMatjipInfo>(
      (isServer ? 'https://maps.googleapis.com' : '') + '/maps/api/place/details/json', 
      params, 
      instanceForGoogleApi
    );
    const data = response.data.result;
    return data;
  } catch(e) {
  }
};

const getLocationsByRegisterUserIdApi = async(params: GetLocationParamsType) => {
  console.log('>>>>> getLocationsApi');
  try {
    const response: AxiosResponse = await get<SearchMatjipInfo>(
      (isServer ? 'http://localhost:8080' : '') +  `${ LOCATION_BASE_URL }/users`,
      params,
      instanceForBackend
    );
    const data = response.data;
    return data;
  } catch(e) {
  }
};

const addLocationApi = async(requestBody: SearchMatjipInfo) => {
  console.log('>>>>> addLocationApi');
  try {
    const response: AxiosResponse = await post<SearchMatjipInfo>(
      (isServer ? 'http://localhost:8080' : '') +  LOCATION_BASE_URL,
      requestBody,
      instanceForBackend
    );
    const data = response.data;
    return data;
  } catch(e) {
  }
};

const deleteLocationApi = async(params: DeleteLocationParamsType) => {
  console.log('>>>>> deleteLocationApi');
  try {
    const response: AxiosResponse = await _delete<DeleteLocationParamsType>(
      (isServer ? 'http://localhost:8080' : '') + 
      `${ LOCATION_BASE_URL }/users/${ params.registerUserId }/${ params.placeId }`,
      instanceForBackend
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch(e) {
  }
};

const MainService = {
  // getMatjipListApi,
  getLocalSearchDataApi,
  getPlaceDetailDataApi,
  getLocationsByRegisterUserIdApi,
  addLocationApi,
  deleteLocationApi,

};

export default MainService;
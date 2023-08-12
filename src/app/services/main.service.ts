import { AxiosResponse } from 'axios';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { get } from '../api/api';
import { instanceForGoogleApi, instanceForNaverApi } from '../api/axios';

interface LocalSearchParamsType {
  key: string | undefined,
  query: string,
  // display: number,
  // start: number,
  // sort: string
};

interface PlaceDetailParamsType {
  key: string | undefined,
  placeid: string,
};

// const getMatjipListApi = async () => {
//   try{
//     const response: AxiosResponse = await get<SearchMatjipInfo>('/matjips', '');
//     const data: any = response.data
//     return data;
//   } catch(e) {
//   }
// };

// const getLocalSearchDataApi = async (params: LocalSearchParamsType) => {
//   try {
//     const response: AxiosResponse = await get<SearchMatjipInfo>('/search/local.json', params, instanceForNaverApi);
//     const data = response.data.items;
//     console.log(data);
//   } catch(e) {
//   }
// };

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

const MainService = {
  // getMatjipListApi,
  getLocalSearchDataApi,
  getPlaceDetailDataApi,
};

export default MainService;
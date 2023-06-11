import { AxiosResponse } from 'axios';
import { SearchMatjipInfo } from '../dataTypes/Matjip';
import { get } from '../api/api';
import { instanceForGoogleApi, instanceForNaverApi } from '../api/axios';

type LocalSearchParams = {
  key: string | undefined,
  query: string,
  // display: number,
  // start: number,
  // sort: string
};

// const getMatjipListApi = async () => {
//   try{
//     const response: AxiosResponse = await get<SearchMatjipInfo>('/matjips', '');
//     const data: any = response.data
//     return data;
//   } catch(e) {
//   }
// };

// const getLocalSearchDataApi = async (params: LocalSearchParams) => {
//   try {
//     const response: AxiosResponse = await get<SearchMatjipInfo>('/search/local.json', params, instanceForNaverApi);
//     const data = response.data.items;
//     console.log(data);
//   } catch(e) {
//   }
// };

const getLocalSearchDataApi = async(params: LocalSearchParams) => {
  try {
    const response: AxiosResponse = await get<SearchMatjipInfo>(
      '/maps/api/place/textsearch/json', 
      params, 
      instanceForGoogleApi
    );
    const data = response.data.results;
    return data;
  } catch(e) {
  }
};

const MainService = {
  // getMatjipListApi,
  getLocalSearchDataApi,
};

export default MainService;
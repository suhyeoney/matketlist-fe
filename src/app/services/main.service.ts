import { AxiosResponse } from 'axios';
import { Matjip } from '../dataTypes/Matjip';
import { get } from '../api/api';

type LocalSearchParams = {
  query: string,
  display: number,
  start: number,
  sort: string
};

const getMatjipListApi = async () => {
  try{
    const response: AxiosResponse = await get<Matjip>('/matjips', '');
    const data: any = response.data.resultData.data;
    return data;
  } catch(e) {
  }
};

const getLocalSearch = async (params: LocalSearchParams) => {
  try {
    const response: AxiosResponse = await get<any>('/search/local.json', params);
    console.log(response);
  } catch(e) {
  }
};

const MainService = {
  getMatjipListApi,
  getLocalSearch,
};

export default MainService;
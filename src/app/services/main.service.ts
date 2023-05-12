import { AxiosResponse } from 'axios';
import { Matjip } from '../dataTypes/Matjip';
import { get } from '../api/api';

const getMatjipListApi = async () => {
  try{
    const response: AxiosResponse = await get<Matjip>('/matjips', '');
    const data: any = response.data.resultData.data;
    return data;
  } catch(e) {
  }
};

const MainService = {
  getMatjipListApi,
};

export default MainService;
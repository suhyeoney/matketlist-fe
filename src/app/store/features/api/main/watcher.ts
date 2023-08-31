
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { getLocalSearchData, getLocalSearchDataFailure, getLocalSearchDataSuccess, getPlaceDetailData, getPlaceDetailDataFailure, getPlaceDetailDataSuccess } from '@store/features/api/main/slice';
import { call, put, takeLatest } from 'typed-redux-saga';
import MainService from '@services/main.service';

interface LocalSearchParamsType {
  key: string | undefined,
  query: string,
};

interface PlaceDetailParamsType {
  key: string | undefined,
  placeid: string,
};

export function*getLocalSearchDataSaga(action: { payload: LocalSearchParamsType }) {
  const param = action.payload;
  try {
    const response: SearchMatjipInfo = yield call(MainService.getLocalSearchDataApi, param);
    yield put(getLocalSearchDataSuccess(response));
  } catch(error) {
    yield put(getLocalSearchDataFailure(error));
  }
}

export function*getPlaceDetailDataSaga(action: { payload: PlaceDetailParamsType }) {
  const param = action.payload;
  try {
    const response: SearchMatjipInfo = yield call(MainService.getPlaceDetailDataApi, param);
    yield put(getPlaceDetailDataSuccess(response));
  } catch(error) {
    yield put(getPlaceDetailDataFailure(error));
  }
}

export default [
  takeLatest(getLocalSearchData, getLocalSearchDataSaga),
  takeLatest(getPlaceDetailData, getPlaceDetailDataSaga),

];
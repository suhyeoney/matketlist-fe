
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { getPlaceDetailData, getPlaceDetailDataFailure, getPlaceDetailDataSuccess } from '@features/api/mainApiSlice';
import { call, put, takeEvery } from 'typed-redux-saga';
import MainService from '@services/main.service';

interface PlaceDetailParamsType {
  key: string | undefined,
  placeid: string,
};

export function*getPlaceDetailDataSaga(action: { payload: PlaceDetailParamsType }) {
  const param = action.payload;
  try {
    const response: SearchMatjipInfo = yield call(MainService.getPlaceDetailDataApi, param);
    yield put(getPlaceDetailDataSuccess(response));
    console.log('getPlaceDetailDataSuccess data result', );
  } catch(error) {
    yield put(getPlaceDetailDataFailure(error));
  }
}

export function* placeDetailDataSaga() {
  yield takeEvery(getPlaceDetailData, getPlaceDetailDataSaga);
}
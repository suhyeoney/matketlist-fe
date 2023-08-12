
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { getLocalSearchData, getLocalSearchDataFailure, getLocalSearchDataSuccess, getPlaceDetailDataFailure, getPlaceDetailDataSuccess } from '@features/api/mainApiSlice';
import { call, put, select, takeEvery } from 'typed-redux-saga';
import MainService from '@services/main.service';
import { RootState } from '@store/store';

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
    console.log('getLocalSearchDataSuccess data result', );
  } catch(error) {
    yield put(getLocalSearchDataFailure(error));
  }
}

export function* localSearchDataSaga() {
  yield takeEvery(getLocalSearchData, getLocalSearchDataSaga);
}

// saga 안에서 또다른 saga를 호출해서 시퀀스로 처리하는 case.
// export function*getLocalSearchDataSaga(action: { payload: LocalSearchParamsType }) {
//   const param1 = action.payload;
//   try {
//     const response1: SearchMatjipInfo = yield call(MainService.getLocalSearchDataApi, param1);
//     yield put(getLocalSearchDataSuccess(response1));
//     const { localSearchData } = yield select(state => state.mainApi);
//     const param2: PlaceDetailParamsType = {
//       key: action.payload.key,
//       placeid: localSearchData[0].place_id
//     };  // 임시로 첫번째 항목에 대해서만 검색 수행
//     try {
//       const response2: SearchMatjipInfo = yield call(MainService.getPlaceDetailDataApi, param2);

//       yield put(getPlaceDetailDataSuccess(response2));
      
//     } catch(error) {
//       yield put(getPlaceDetailDataFailure(error));
//     }
//   } catch(error) {
//     yield put(getLocalSearchDataFailure(error));
//   }
// }
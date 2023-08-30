import { SearchMatjipInfo } from '@dataTypes/matjip';
import { call, put, takeLatest } from 'typed-redux-saga';
import MainService from '@services/main.service';
import { addLocation, addLocationFailure, addLocationSuccess, getLocation, getLocationFailure, getLocationSuccess, removeLocation, removeLocationFailure, removeLocationSuccess } from './slice';

interface GetLocationParamsType {
  registerUserId: String,
  regionCode: String,
}

interface DeleteLocationParamsType {
  registerUserId: String,
  placeId: String,
}

export function*getLocationSaga(action: { payload: GetLocationParamsType }) {
  console.log('>>>>> getLocationSaga call...');
  const param = action.payload;
  try {
    const { data }  = yield call(MainService.getLocationsByRegisterUserIdApi, param);
    yield put(getLocationSuccess(data));
  } catch(error) {
    yield put(getLocationFailure(error));
  }
}

export function*addLocationSaga(action: { payload: SearchMatjipInfo }) {
  console.log('>>>>> addLocationSaga call...');
  const param = action.payload;
  try {
    const { resultCode } = yield call(MainService.addLocationApi, param);
    console.log(resultCode);
    yield put(addLocationSuccess(resultCode));
    yield put(getLocation({ 
      registerUserId: action.payload.registerUser,
      regionCode: '',
    }));
  } catch(error) {
    yield put(addLocationFailure(error));
  }
}

export function*removeLocationSaga(action: { payload: DeleteLocationParamsType }) {
  console.log('>>>>> removeLocationSaga call...');
  const param = action.payload;
  console.log(param);
  try {
    const { resultCode } = yield call(MainService.deleteLocationApi, param);
    yield put(removeLocationSuccess(resultCode));
    yield put(getLocation({ 
      registerUserId: action.payload.registerUserId,
      regionCode:'',
    }));
  } catch(error) {
    yield put(removeLocationFailure(error));
  }
}

export default [
  takeLatest(getLocation, getLocationSaga),
  takeLatest(addLocation, addLocationSaga),
  takeLatest(removeLocation, removeLocationSaga),

];
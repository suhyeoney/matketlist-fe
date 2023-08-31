import { accessTokenSetting, accessTokenSettingSuccess, backgroundModeToggle, backgroundModeToggleSuccess } from '@store/features/environmentVariables/slice';
import { put, takeLatest } from 'typed-redux-saga';

export function* backgroundModeToggleSaga(action: { payload: boolean }) {
  const param = action.payload;
  try {
    yield put(backgroundModeToggleSuccess(param));
  } catch(error) {
  }
}

export function* accessTokenSettingSaga(action: 
  { payload: { access_token: string, user_id: string } }) {
  const param = action.payload;
  try {
    yield put(accessTokenSettingSuccess(param));
  } catch(error) {
  }
}


export default [
  takeLatest(backgroundModeToggle, backgroundModeToggleSaga),
  takeLatest(accessTokenSetting, accessTokenSettingSaga),

];
import { backgroundModeToggle, backgroundModeToggleSuccess } from '@features/environmentVariables/environmentVariablesSlice';
import { put, takeEvery } from 'typed-redux-saga';

export function* backgroundModeToggleSaga(action: { payload: boolean }) {
  const param = action.payload;
  try {
    console.log(`connecting saga...`);
    yield put(backgroundModeToggleSuccess(param));
  } catch(error) {
    console.log(`error : ${error}`);
  }
}

export function* backgroundModeSaga() {
  yield takeEvery(backgroundModeToggle, backgroundModeToggleSaga);
}
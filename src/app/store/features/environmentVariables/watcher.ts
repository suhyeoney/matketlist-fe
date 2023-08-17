import { backgroundModeToggle, backgroundModeToggleSuccess } from '@store/features/environmentVariables/slice';
import { put, takeLatest } from 'typed-redux-saga';

export function* backgroundModeToggleSaga(action: { payload: boolean }) {
  const param = action.payload;
  try {
    yield put(backgroundModeToggleSuccess(param));
  } catch(error) {
  }
}

export default [
  takeLatest(backgroundModeToggle, backgroundModeToggleSaga),
  

];
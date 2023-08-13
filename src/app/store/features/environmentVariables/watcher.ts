import { backgroundModeToggle, backgroundModeToggleSuccess } from '@store/features/environmentVariables/slice';
import { put, takeLatest } from 'typed-redux-saga';

export function* backgroundModeToggleSaga(action: { payload: boolean }) {
  const param = action.payload;
  try {
    console.log(`connecting saga...`);
    yield put(backgroundModeToggleSuccess(param));
  } catch(error) {
    console.log(`error : ${error}`);
  }
}

export default [
  takeLatest(backgroundModeToggle, backgroundModeToggleSaga),
  

];
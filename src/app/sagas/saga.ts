import { all } from 'typed-redux-saga';
import { localSearchDataSaga } from '@sagas/sagas/main/localSearchDataSaga';
import { placeDetailDataSaga } from '@sagas/sagas/main/placeDetailDataSaga';
import { backgroundModeSaga } from '@sagas/sagas/environmentVariables/backgroundModeToggleSaga';

export function* rootSaga() {
  yield all([
    backgroundModeSaga(),
    localSearchDataSaga(),
    placeDetailDataSaga(),
  ]);
}
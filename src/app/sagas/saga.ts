import { all } from 'typed-redux-saga';
import { environmentVariablesSaga } from '@sagas/sagas/environmentVariablesSaga';

export function* rootSaga() {
  yield all([
    environmentVariablesSaga(),
  ]);
}
import { all } from 'typed-redux-saga';
import environmentVariablesWatcher from '@store/features/environmentVariables/watcher';
import mainApiWatcher from '@store/features/api/main/watcher';
import locationWatcher from '@store/features/location/watcher';

export function* rootSaga() {
  yield all([
    ...environmentVariablesWatcher,
    ...mainApiWatcher,
    ...locationWatcher,
  ]);
}
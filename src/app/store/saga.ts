import { all } from 'typed-redux-saga';
import environmentVariablesWatcher from '@store/features/environmentVariables/watcher';
import mainApiWatcher from '@store/features/api/main/watcher';

export function* rootSaga() {
  yield all([
    ...environmentVariablesWatcher,
    ...mainApiWatcher,
    
  ]);
}
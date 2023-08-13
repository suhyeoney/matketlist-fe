'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '@store/features/counter/slice';
import locationReducer from '@store/features/location/slice';
import modalControlReducer from '@store/features/modalControl/slice';
import inputControlReducer from '@store/features/inputControl/slice';
import environmentVariablesReducer from '@store/features/environmentVariables/slice';
// import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '@store/saga';
import mainApiReducer  from '@store/features/api/main/slice';

const reducers = combineReducers({
  counter: counterReducer,
  location: locationReducer,
  modalControl: modalControlReducer,
  inputControl: inputControlReducer,
  environmentVariables: environmentVariablesReducer,
  mainApi: mainApiReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'modalControl',
    'mainApi',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
  middleware: [ sagaMiddleware ]
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
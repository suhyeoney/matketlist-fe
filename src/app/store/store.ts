'use client'

import { combineReducers, configureStore, compose } from '@reduxjs/toolkit';
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
import * as Sentry from '@sentry/react';

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
    // 'location',
    'modalControl',
    'mainApi',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
 // TODO : 인핸서 옵션 확인하고 적용 
});

export const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
  middleware: [ sagaMiddleware ],
  enhancers: [ sentryReduxEnhancer ],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '@features/counter/counterSlice';
import locationReducer from '@features/location/locationSlice';
import modalControlReducer from '@features/modalControl/modalControlSlice';
import inputControlReducer from '@features/inputControl/inputControlSlice';
import environmentVariablesReducer from '@features/environmentVariables/environmentVariablesSlice';
// import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '@sagas/saga';

const reducers = combineReducers({
  counter: counterReducer,
  location: locationReducer,
  modalControl: modalControlReducer,
  inputControl: inputControlReducer,
  environmentVariables: environmentVariablesReducer,
});

const persistConfig = {
  key: 'root',
  storage
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
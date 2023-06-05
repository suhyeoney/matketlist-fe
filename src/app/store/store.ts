'use client'

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import locationReducer from '../features/location/locationSlice';
import modalControlReducer from '../features/modalControl/modalControlSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		location: locationReducer,
		modalControl: modalControlReducer,
	},
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
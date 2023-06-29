'use client'

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@features/counter/counterSlice';
import locationReducer from '@features/location/locationSlice';
import modalControlReducer from '@features/modalControl/modalControlSlice';
import inputControlReducer from '@features/inputControl/inputControlSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		location: locationReducer,
		modalControl: modalControlReducer,
		inputControl: inputControlReducer,
	},
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
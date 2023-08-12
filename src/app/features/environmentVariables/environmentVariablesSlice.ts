'use client'

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface EnvironmentVariablesState {
  backgroundMode: boolean,
  accessToken: string,
  moveToMap: boolean,
};

const initialState: EnvironmentVariablesState = {
  backgroundMode: true,
  accessToken: '',
  moveToMap: false,
}

export const environmentVariablesSlice = createSlice({
  name: 'environmentVariables',
  initialState,
  reducers: {
    // Redux-saga Test...
    backgroundModeToggle: (state, action: PayloadAction<boolean>) => {
      console.log('>>> backgroundModeToggle');
      state.backgroundMode = action.payload
    },
    backgroundModeToggleSuccess: (state, action: PayloadAction<boolean>) => {
      console.log('>>> backgroundModeToggleSuccess');
      state.backgroundMode = action.payload
    },

    accessTokenSetting: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    moveToMapToggle: (state, action: PayloadAction<boolean>) => {
      state.moveToMap = action.payload
    },
  }
});

export const { 
  backgroundModeToggle, 
  backgroundModeToggleSuccess,
  accessTokenSetting, 
  moveToMapToggle, 
} = environmentVariablesSlice.actions;

export default environmentVariablesSlice.reducer;


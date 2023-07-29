'use client'

import { createSlice } from '@reduxjs/toolkit';

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
    backgroundModeToggle: (state, action) => { state.backgroundMode = action.payload },
    accessTokenSetting: (state, action) => { state.accessToken = action.payload },
    moveToMapToggle: (state, action) => { state.moveToMap = action.payload },
  }
});

export const { backgroundModeToggle, accessTokenSetting, moveToMapToggle } = environmentVariablesSlice.actions;

export default environmentVariablesSlice.reducer;


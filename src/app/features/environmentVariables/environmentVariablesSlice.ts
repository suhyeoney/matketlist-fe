'use client'

import { createSlice } from '@reduxjs/toolkit';

export interface EnvironmentVariablesState {
  backgroundMode: boolean,
  accessToken: string,
};

const initialState: EnvironmentVariablesState = {
  backgroundMode: true,
  accessToken: '',
}

export const environmentVariablesSlice = createSlice({
  name: 'environmentVariables',
  initialState,
  reducers: {
    backgroundModeToggle: (state, action) => { state.backgroundMode = action.payload },
    accessTokenSetting: (state, action) => { state.accessToken = action.payload },

  }
});

export const { backgroundModeToggle, accessTokenSetting } = environmentVariablesSlice.actions;

export default environmentVariablesSlice.reducer;


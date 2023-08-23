'use client'

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface EnvironmentVariablesState {
  backgroundMode: boolean,
  accessToken: string,
  userId: string,
  moveToMap: boolean,
};

const initialState: EnvironmentVariablesState = {
  backgroundMode: true,
  accessToken: '',
  userId: '',
  moveToMap: false,
}

export const environmentVariablesSlice = createSlice({
  name: 'environmentVariables',
  initialState,
  reducers: {
    backgroundModeToggle: (state, action: PayloadAction<boolean>) => {
      state.backgroundMode = action.payload
    },
    backgroundModeToggleSuccess: (state, action: PayloadAction<boolean>) => {
      state.backgroundMode = action.payload
    },

    accessTokenSetting: (state, action: PayloadAction<{ access_token: string, user_id: string }>) => {
      state.accessToken = action.payload.access_token;
      state.userId = action.payload.user_id;
    },

    accessTokenSettingSuccess: (state, action: PayloadAction<{ access_token: string, user_id: string }>) => {
      state.accessToken = action.payload.access_token;
      state.userId = action.payload.user_id;
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
  accessTokenSettingSuccess,
  moveToMapToggle, 
} = environmentVariablesSlice.actions;

export default environmentVariablesSlice.reducer;


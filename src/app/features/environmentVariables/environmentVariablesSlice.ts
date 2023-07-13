'use client'

import { createSlice } from '@reduxjs/toolkit';

export interface EnvironmentVariablesState {
  backgroundMode: string
};

const initialState: EnvironmentVariablesState = {
  backgroundMode: 'L'
}

export const environmentVariablesSlice = createSlice({
  name: 'environmentVariables',
  initialState,
  reducers: {
    backgroundModeToggle: (state, action) => { state.backgroundMode = action.payload }
  }
});

export const { backgroundModeToggle } = environmentVariablesSlice.actions;

export default environmentVariablesSlice.reducer;


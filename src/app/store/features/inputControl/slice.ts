'use client'

import { createSlice } from '@reduxjs/toolkit';

export interface InputControlState {
  inputMatjip: string,
};

const initialState: InputControlState = {
  inputMatjip: ''
};

export const inputControlState = createSlice({
  name: 'inputControl',
  initialState,
  reducers: {
    storeInputMajip: (state, action) => {
      state.inputMatjip = action.payload;
    },
  }
});

export const { storeInputMajip } = inputControlState.actions;

export default inputControlState.reducer;


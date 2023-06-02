'use client'

import { createSlice } from '@reduxjs/toolkit';

type LocationType = {
  latitude: number,
  longitude: number
};

export interface LocationState {
  arrLocation: LocationType[]
};

const initialState: LocationState = {
  arrLocation: []
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    add: (state, action) => {
      state.arrLocation = [ ...state.arrLocation, action.payload ]
    }
  }
});

export const { add } = locationSlice.actions;

export default locationSlice.reducer;


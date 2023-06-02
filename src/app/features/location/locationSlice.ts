'use client'

import { createSlice } from '@reduxjs/toolkit';

type LocationType = {
  id: number,
  latitude: number,
  longitude: number
};

export interface LocationState {
  arrLocation: LocationType[],
  cntLocation: number
};

const initialState: LocationState = {
  arrLocation: [],
  cntLocation: 0,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    add: (state, action) => {
      action.payload.id = state.arrLocation.length + 1;
      state.arrLocation = [ ...state.arrLocation, action.payload ];
      state.cntLocation = state.arrLocation.length;
    },
    remove: (state, action) => {
    //  state.arrLocation = state.arrLocation.filter((e: LocationType) => e.id !== action.payload)
    }
  }
});

export const { add } = locationSlice.actions;

export default locationSlice.reducer;


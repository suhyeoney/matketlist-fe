'use client'

import { SearchMatjipInfo } from '@dataTypes/matjip';
import { createSlice } from '@reduxjs/toolkit';

type LocationType = {
  id: number,
  latitude: number,
  longitude: number
};

export interface LocationState {
  arrLocation: SearchMatjipInfo[],
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
    addLocation: (state, action) => {
      action.payload.id = state.arrLocation.length + 1;
      state.arrLocation = [ ...state.arrLocation, action.payload ];
      state.cntLocation = state.arrLocation.length;
    },
    removeLocation: (state, action) => {
     state.arrLocation = state.arrLocation.filter((e: SearchMatjipInfo) => e.placeId !== action.payload)
     state.cntLocation = state.arrLocation.length;
    }
  }
});

export const { addLocation, removeLocation } = locationSlice.actions;

export default locationSlice.reducer;


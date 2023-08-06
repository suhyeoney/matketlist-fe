'use client'

import { HashtagType } from '@dataTypes/hashtag';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { createSlice } from '@reduxjs/toolkit';

export interface LocationState {
  arrLocation: SearchMatjipInfo[],
  arrHashtag: HashtagType[],
  cntLocation: number
};

const initialState: LocationState = {
  arrLocation: [],
  arrHashtag: [],
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
    },
    updateHashtag: (state, action) => {
      state.arrHashtag = [ ...action.payload ];
    },
  }
});

export const { addLocation, removeLocation, updateHashtag } = locationSlice.actions;

export default locationSlice.reducer;


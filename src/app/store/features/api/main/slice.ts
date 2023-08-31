'use client'

import { SearchMatjipInfo } from '@dataTypes/matjip';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LocalSearchParamsType {
  key: string | undefined,
  query: string,
  // display: number,
  // start: number,
  // sort: string
};

interface PlaceDetailParamsType {
  key: string | undefined,
  placeid: string,
};

export interface MainApiState {
  localSearchData: any[],
  placeDetailData: any,
  error: string,
  isLoading: boolean,
};

const initialState: MainApiState = {
  localSearchData: [],
  placeDetailData: null,
  error: '',
  isLoading: false,
}

export const mainApiSlice = createSlice({
  name: 'mainApi',
  initialState,
  reducers: {
    // /maps/api/place/textsearch/json
    getLocalSearchData: (state, action: PayloadAction<LocalSearchParamsType>) => {
      state.isLoading = true;
    },
    getLocalSearchDataSuccess: (state, action: PayloadAction<any>) => {
      state.localSearchData.length = 0;
      const newState = state.localSearchData.concat(action.payload);
      state.localSearchData = newState;
      state.isLoading = false;
    },
    getLocalSearchDataFailure: (state, { payload: error }) => {
      state.error = error;
      state.isLoading = false;
    },

    // /maps/api/place/details/json
    getPlaceDetailData: (state, action: PayloadAction<PlaceDetailParamsType>) => {
      state.isLoading = true;
    },
    getPlaceDetailDataSuccess: (state, action: PayloadAction<any>) => {
      const newState = action.payload;
      state.placeDetailData = newState;
      state.isLoading = false;
    },
    getPlaceDetailDataFailure: (state, { payload: error }) => {
      state.error = error;
      state.isLoading = false;
    },

  }
});

export const { 
  getLocalSearchData,
  getLocalSearchDataSuccess,
  getLocalSearchDataFailure,
  getPlaceDetailData,
  getPlaceDetailDataSuccess,
  getPlaceDetailDataFailure,
} = mainApiSlice.actions;

export default mainApiSlice.reducer;


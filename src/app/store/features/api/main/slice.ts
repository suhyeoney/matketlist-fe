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
  localSearchData: SearchMatjipInfo[],
  placeDetailData: SearchMatjipInfo,
  error: string
};

const initialState: MainApiState = {
  localSearchData: [],
  placeDetailData: <SearchMatjipInfo>{},
  error: '',
}

export const mainApiSlice = createSlice({
  name: 'mainApi',
  initialState,
  reducers: {
    // /maps/api/place/textsearch/json
    getLocalSearchData: (state, action: PayloadAction<LocalSearchParamsType>) => {
      console.log('>>> getLocalSearchData');
    },
    getLocalSearchDataSuccess: (state, action: PayloadAction<SearchMatjipInfo>) => {
      console.log('>>> getLocalSearchDataSuccess');
      state.localSearchData.length = 0;
      const newState = state.localSearchData.concat(action.payload);
      state.localSearchData = newState;
    },
    getLocalSearchDataFailure: (state, { payload: error }) => {
      console.log('>>> getLocalSearchDataFailure', error);
      state.error = error;
    },

    // /maps/api/place/details/json
    getPlaceDetailData: (state, action: PayloadAction<PlaceDetailParamsType>) => {
      console.log('>>> getPlaceDetailData');
    },
    getPlaceDetailDataSuccess: (state, action: PayloadAction<SearchMatjipInfo>) => {
      console.log('>>> getPlaceDetailDataSuccess');
      const newState = action.payload;
      state.placeDetailData = newState;
    },
    getPlaceDetailDataFailure: (state, { payload: error }) => {
      console.log('>>> getPlaceDetailDataFailure', error);
      state.error = error;
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


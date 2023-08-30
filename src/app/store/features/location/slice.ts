'use client'

import { HashtagType } from '@dataTypes/hashtag';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface GetLocationParamsType {
  registerUserId: String,
  regionCode: String,
};

interface DeleteLocationParamsType {
  registerUserId: String,
  placeId: String,
};

export interface LocationState {
  arrLocation: SearchMatjipInfo[],
  arrHashtag: HashtagType[],
  cntLocation: number,
  isLoading: boolean,
  error: Error,
  addResult: String,
  deleteResult: String,
};

const initialState: LocationState = {
  arrLocation: [],
  arrHashtag: [],
  cntLocation: 0,
  isLoading: false,
  error: Error(),
  addResult: '',
  deleteResult: '',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    getLocation: (state, action: PayloadAction<GetLocationParamsType>) => {
      console.log('>>>>> getLocation');
      state.isLoading = true;
    },
    getLocationSuccess: (state, action: PayloadAction<SearchMatjipInfo[]>) => {
      console.log('>>>>> getLocationSuccess');
      state.arrLocation.length = 0;
      const newState = state.arrLocation.concat(action.payload);
      state.arrLocation = newState;
      state.arrLocation.map((e: SearchMatjipInfo) => {
        const obj = { ...e };
        let pHashtags: number[];
        pHashtags = [];
        obj.hashtags = pHashtags;
        return obj;
      });
      state.cntLocation = newState.length;
      state.isLoading = false;
      console.log('arrLocation', state.arrLocation);
    },
    getLocationFailure: (state, { payload: error }) => {
      state.error = error;
      state.isLoading = false;
    },

    addLocation: (state, action: PayloadAction<SearchMatjipInfo>) => {
      console.log('>>>>> addLocation');
      state.isLoading = true;
    },
    addLocationSuccess: (state, action: PayloadAction<String>) => {
      state.addResult = action.payload;
      console.log('state.addResult', state.addResult);
      state.isLoading = false;
      switch(action.payload) {
        case '000':
          alert('맛집 등록에 문제가 발생했습니다. 다시 시도해주세요.');
          break;
        case '001':
          state.cntLocation = state.arrLocation.length;
          alert('맛집이 정상적으로 등록되었습니다.');
          break;
        case '999':
          alert('맛집 등록에 문제가 발생했습니다. 다시 시도해주세요.');
          break;
      }
    },
    addLocationFailure: (state, { payload: error }) => {
      state.error = error;
      state.isLoading = false;
    },
    
    removeLocation: (state, action: PayloadAction<DeleteLocationParamsType>) => {
      console.log('>>>>> removeLocation');
      state.isLoading = true;
    },
    removeLocationSuccess: (state, action: PayloadAction<String>) => {
      state.addResult = action.payload;
      console.log('state.addResult', state.addResult);
      state.isLoading = false;
      switch(action.payload) {
        case '000':
          alert('맛집 해제에 문제가 발생했습니다. 다시 시도해주세요.');
          break;
        case '001':
          state.cntLocation = state.arrLocation.length;
          alert('맛집이 정상적으로 해제되었습니다.');
          break;
        case '999':
          alert('맛집 해제에 문제가 발생했습니다. 다시 시도해주세요.');
          break;
      }
    },
    removeLocationFailure: (state, { payload: error }) => {
      state.error = error;
      state.isLoading = false;
    },



    updateLocation: (state, action) => {
      state.arrLocation = [ ...action.payload ];
      state.cntLocation = state.arrLocation.length;
    },
    updateHashtag: (state, action) => {
      state.arrHashtag = [ ...action.payload ];
    },
  }
});

export const { 
  getLocation,
  getLocationSuccess,
  getLocationFailure,
  addLocation,
  addLocationSuccess,
  addLocationFailure,
  removeLocation, 
  removeLocationSuccess, 
  removeLocationFailure, 
  updateLocation, 
  updateHashtag 
} = locationSlice.actions;

export default locationSlice.reducer;


'use client'

import { createSlice } from '@reduxjs/toolkit';

export interface ModalControlState {
  isSearchAddressModalOpen: boolean,
  isMyMatjipSlidersOpen: boolean,
  isMatjipInfoModalOpen: boolean,
  isHashtagTreeOpen: boolean,
};

const initialState: ModalControlState = {
  isSearchAddressModalOpen: false,
  isMyMatjipSlidersOpen: false,
  isMatjipInfoModalOpen: false,
  isHashtagTreeOpen: false,
}

export const modalControlSlice = createSlice({
  name: 'modalControl',
  initialState,
  reducers: {
    setSearchAddressModalOpen: (state, action) => {
      state.isSearchAddressModalOpen = action.payload
    },
    setMyMatjipSlidersOpen: (state, action) => {
      state.isMyMatjipSlidersOpen = action.payload
    },
    setMatjipInfoModalOpen: (state, action) => {
      state.isMatjipInfoModalOpen = action.payload
    },
    setHashtagTreeOpen: (state, action) => {
      state.isHashtagTreeOpen = action.payload
    },
  }
});

export const { 
  setSearchAddressModalOpen, 
  setMyMatjipSlidersOpen,
  setMatjipInfoModalOpen, 
  setHashtagTreeOpen,
} = modalControlSlice.actions;

export default modalControlSlice.reducer;


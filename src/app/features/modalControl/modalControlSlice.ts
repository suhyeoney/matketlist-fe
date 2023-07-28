'use client'

import { createSlice } from '@reduxjs/toolkit';

export interface ModalControlState {
  isSearchAddressModalOpen: boolean,
  isMyMatjipSlidersOpen: boolean,
  isMatjipInfoModalOpen: boolean,
};

const initialState: ModalControlState = {
  isSearchAddressModalOpen: false,
  isMyMatjipSlidersOpen: false,
  isMatjipInfoModalOpen: false,
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
  }
});

export const { 
  setSearchAddressModalOpen, 
  setMyMatjipSlidersOpen,
  setMatjipInfoModalOpen, 
} = modalControlSlice.actions;

export default modalControlSlice.reducer;


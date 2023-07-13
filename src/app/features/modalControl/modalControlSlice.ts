'use client'

import { createSlice } from '@reduxjs/toolkit';

export interface ModalControlState {
  isSearchAddressModalOpen: boolean,
  isMyMatjipListOpen: boolean,
  isMatjipInfoModalOpen: boolean,
};

const initialState: ModalControlState = {
  isSearchAddressModalOpen: false,
  isMyMatjipListOpen: false,
  isMatjipInfoModalOpen: false,
}

export const modalControlSlice = createSlice({
  name: 'modalControl',
  initialState,
  reducers: {
    setSearchAddressModalOpen: (state, action) => {
      state.isSearchAddressModalOpen = action.payload
    },
    setMyMatjipListOpen: (state, action) => {
      state.isMyMatjipListOpen = action.payload
    },
    setMatjipInfoModalOpen: (state, action) => {
      state.isMatjipInfoModalOpen = action.payload
    },
  }
});

export const { 
  setSearchAddressModalOpen, 
  setMyMatjipListOpen,
  setMatjipInfoModalOpen, 
} = modalControlSlice.actions;

export default modalControlSlice.reducer;


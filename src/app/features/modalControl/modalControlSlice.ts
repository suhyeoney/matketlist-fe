'use client'

import { createSlice } from '@reduxjs/toolkit';

export interface ModalControlState {
  isSearchAddressModalOpen: boolean,
  isMyMatjipListOpen: boolean,
};

const initialState: ModalControlState = {
  isSearchAddressModalOpen: false,
  isMyMatjipListOpen: false,
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
  }
});

export const { setSearchAddressModalOpen, setMyMatjipListOpen } = modalControlSlice.actions;

export default modalControlSlice.reducer;


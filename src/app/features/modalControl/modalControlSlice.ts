'use client'

import { createSlice } from '@reduxjs/toolkit';

export interface ModalControlState {
  isSearchAddressModalOpen: boolean
};

const initialState: ModalControlState = {
  isSearchAddressModalOpen: false
}

export const modalControlSlice = createSlice({
  name: 'modalControl',
  initialState,
  reducers: {
    setSearchAddressModalOpen: (state, action) => {
      state.isSearchAddressModalOpen = action.payload
    }

  }
});

export const { setSearchAddressModalOpen } = modalControlSlice.actions;

export default modalControlSlice.reducer;


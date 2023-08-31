'use client'

import { createSlice } from '@reduxjs/toolkit';

export interface ModalControlState {
  isSearchAddressModalOpen: boolean,
  isMyMatjipSlidersOpen: boolean,
  isMatjipInfoModalOpen: boolean,
  isHashtagTreeOpen: boolean,
  isMatjipRankReduced: boolean, // 모바일 이하 모드에서 맛집랭킹 팝업의 크기를 축소시키는 버튼을 클릭하면 true
};

const initialState: ModalControlState = {
  isSearchAddressModalOpen: false,
  isMyMatjipSlidersOpen: false,
  isMatjipInfoModalOpen: false,
  isHashtagTreeOpen: false,
  isMatjipRankReduced: false,
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
    setMatjipRankReduced: (state, action) => {
      state.isMatjipRankReduced = action.payload;
    },
  }
});

export const { 
  setSearchAddressModalOpen, 
  setMyMatjipSlidersOpen,
  setMatjipInfoModalOpen, 
  setHashtagTreeOpen,
  setMatjipRankReduced,
} = modalControlSlice.actions;

export default modalControlSlice.reducer;


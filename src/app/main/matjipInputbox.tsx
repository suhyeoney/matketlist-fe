'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { addLocation } from '@features/location/locationSlice';
import SearchAddressModal from '@modals/searchAddressModal';
import { setSearchAddressModalOpen } from '@features/modalControl/modalControlSlice';
import { storeInputMajip } from '@features/inputControl/inputControlSlice';
import { LocationType } from '@dataTypes/location';
import { useWindowSize } from '@hooks/useWindowSize';

const MatjipInputbox:React.FC = () => {

  const latitudeRef = useRef<HTMLInputElement | null>(null);
  const longitudeRef = useRef<HTMLInputElement | null>(null);
  
  const matjipRef = useRef<HTMLInputElement | null>(null);

  const location = useSelector((state: RootState) => state.location);
  const modalControl = useSelector((state: RootState) => state.modalControl);
  // const inputControl = useSelector((state: RootState) => state.inputControl);
  const dispatch = useDispatch();

  const onSearchBtnClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const inputValue = matjipRef.current?.value;
    if(!inputValue) {
      alert('검색할 맛집 상호명을 입력해주세요.');
      return;
    }
    dispatch(setSearchAddressModalOpen(true));
    dispatch(storeInputMajip(matjipRef.current?.value));    
  }, []);

  const onMatjipInputTouchEnd = useCallback((e: React.TouchEvent<HTMLElement>) => {
    console.log(e);
  }, []);

  const onAddBtnClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const inputLatitude = Number(latitudeRef.current?.value);
    const inputLongitude = Number(longitudeRef.current?.value);
    
    const newLocation = {
      latitude: inputLatitude,
      longitude: inputLongitude
    };

    dispatch(addLocation(newLocation));

  }, [ location.arrLocation ]);

  // useEffect(() => {
  //   console.log('modalControl.isMatjipInfoModalOpen', modalControl.isMatjipInfoModalOpen);
  // }, [ modalControl.isMatjipInfoModalOpen ]);

  console.log(useWindowSize());

  return (
    <>
      <div className="flex flex-row justify-center items-center border-[1px] border-solid border-grey rounded-md gap-[20px] p-[10px]">
        { useWindowSize().width >= 768 ?
          <span className="
          font-['Tenada'] h-[48px] text-center p-[10px] rounded-md flex justify-center items-center 
          laptop:text-base 
          tablet:text-sm tablet:bg-yellow-300
          mobile:text-[0px] 
        ">나만의 맛집 추가하기</span> : null
        }
        <div className="flex flex-row gap-[20px]">
          <input 
            type="search" 
            ref={ matjipRef } 
            placeholder={ useWindowSize().width >= 768 ? '맛집 상호명 입력' : '나만의 맛집 추가하기' } 
            className="input input-bordered"
            onTouchEnd={ onMatjipInputTouchEnd }
          />
        </div>
        <button 
          onClick={ onSearchBtnClick }
          disabled={ modalControl.isMatjipInfoModalOpen ? true : false }
          className="
          font-['Tenada'] text-white text-[17px] btn w-[100px] border-violet-500 bg-violet-500
        "><span className="pr-2">🔍</span>검색</button>
      </div>      
    </>
  );
}

export default MatjipInputbox;
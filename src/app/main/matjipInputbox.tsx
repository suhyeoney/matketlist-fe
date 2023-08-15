'use client'

import localFont from 'next/font/local';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { addLocation } from '@store/features/location/slice';
import SearchAddressModal from '@modals/searchAddressModal';
import { setSearchAddressModalOpen } from '@store/features/modalControl/slice';
import { storeInputMajip } from '@store/features/inputControl/slice';
import { LocationType } from '@dataTypes/location';
import { useWindowSize } from '@hooks/useWindowSize';

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const MatjipInputbox:React.FC = () => {

  const latitudeRef = useRef<HTMLInputElement | null>(null);
  const longitudeRef = useRef<HTMLInputElement | null>(null);
  
  const matjipRef = useRef<HTMLInputElement | null>(null);

  const location = useSelector((state: RootState) => state.location);
  const modalControl = useSelector((state: RootState) => state.modalControl);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
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

  return (
    <>
      <div className={`
       absolute z-10 top-28 flex flex-row justify-center items-center rounded-[10px]
        laptop:gap-[20px] p-[10px] 
        tablet:gap-[20px] p-[10px] 
        mobile:gap-[10px] p-[10px]
        smallest:gap-[5px] m-0
      `}>
        { useWindowSize().width >= 768 ?
          <span className={`
          ${ Tenada.className } h-[48px] text-center p-[10px] rounded-md flex justify-center items-center 
          laptop:text-base bg-yellow-300 
          tablet:text-sm bg-yellow-300
          mobile:text-[0px] 
        `}>나만의 맛집 추가하기</span> : null
        }
        <div className="flex flex-row gap-[20px]">
          <input
            type="search" 
            ref={ matjipRef } 
            placeholder={ useWindowSize().width >= 768 ? '맛집 상호명 입력' : '나만의 맛집 추가하기' } 
            onFocus={ () => document.querySelector('#footer')?.classList.add('hidden') }
            onBlur={ () => document.querySelector('#footer')?.classList.remove('hidden') }
            className={`
              searchInput
              input input-bordered border
              ${ environmentVariables.backgroundMode ? 'text-black bg-white border-black focus:text-black focus:border-black' : 
              'text-white bg-[#2A303C] border-white focus:text-white focus:border-white' }
              smallest:w-[170px]
            `}/>
        </div>
        <button 
          onClick={ onSearchBtnClick }
          // disabled={ modalControl.isMatjipInfoModalOpen ? true : false }
          className={`
          ${ Tenada.className } text-white text-[17px] btn w-[100px] border-violet-500 bg-violet-500
        `}><span className="pr-2">🔍</span>검색</button>
      </div>      
    </>
  );
}

export default MatjipInputbox;

//  ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
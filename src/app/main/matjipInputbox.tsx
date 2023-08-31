'use client'

import localFont from 'next/font/local';
import Image from 'next/image';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { addLocation } from '@store/features/location/slice';
import SearchAddressModal from '@modals/searchAddressModal';
import { setSearchAddressModalOpen } from '@store/features/modalControl/slice';
import { storeInputMajip } from '@store/features/inputControl/slice';
import { LocationType } from '@dataTypes/location';
import { useWindowSize } from '@hooks/useWindowSize';
import image1 from '@assets/icons/search-data.png';

const YeongdeokBlueroad = localFont({
  src: '../assets/fonts/YeongdeokBlueroad.woff'
});

const MatjipInputbox:React.FC = () => {

  const latitudeRef = useRef<HTMLInputElement | null>(null);
  const longitudeRef = useRef<HTMLInputElement | null>(null);
  
  const matjipRef = useRef<HTMLInputElement | null>(null);

  const location = useSelector((state: RootState) => state.location);
  const modalControl = useSelector((state: RootState) => state.modalControl);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  // const inputControl = useSelector((state: RootState) => state.inputControl);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();

  const onSearchBtnClick = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    console.log('>>>>>> onsearchbtnclick');
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

  return (
    <>
      <div
        style={{ width: `${ windowSize.width / (windowSize.width >= 768 ? 2.5 : 1.1) }px` 
        }} 
        className={`
        absolute z-10 flex flex-row justify-center items-center border-2 border-gray-300
        laptop:top-28 rounded-[10px] py-2
        tablet:top-28 rounded-[10px] py-2
        mobile:top-28 rounded-[10px] py-2
        smallest:top-20 h-[45px] rounded-[5px] py-1
      `}>
        <div 
          className="flex flex-row gap-0 rounded-[6px]">
          <input
            type="search" 
            ref={ matjipRef } 
            placeholder="맛집 가게명 입력"
            onFocus={ () => document.querySelector('#footer')?.classList.add('hidden') }
            onBlur={ () => document.querySelector('#footer')?.classList.remove('hidden') }
            onKeyDown={ (e: React.KeyboardEvent<HTMLElement>) => {
              e.code === 'Enter' ? onSearchBtnClick(e) : null
            } }
            style={{ width: `${ (windowSize.width / (windowSize.width >= 768 ? 2.5 : 1.1)) - 55 }px` }} 
            className={`
              searchInput h-[40px] rounded-l-[5px]
              ${ environmentVariables.backgroundMode ? 'text-black bg-white focus:text-black' : 
              'text-white bg-[#2A303C] focus:text-white' }
          `}/>
          <button 
            onClick={ onSearchBtnClick }
            className={`
            ${ YeongdeokBlueroad.className } flex items-center justify-center
            ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
            w-[50px] h-[40px] rounded-r-[5px]
          `}>
            <Image
              src={ image1.src }
              alt=""
              width="20"
              height="20"
              className={`
                w-[20px] h-[20px]
              `}
            />
          </button>
        </div>
      </div>      
    </>
  );
}

export default MatjipInputbox;

// bg-gradient-to-r from-red-200 from-10% via-lime-300 via-30%  via-yellow-300 via-60% to-slate-200 to-90%
// ${ environmentVariables.backgroundMode ? 'text-black' : 'bg-[#2A303C] text-white' }
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
import localFont from 'next/font/local';

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const SearchInputbox:React.FC = () => {

  const matjipRef = useRef<HTMLInputElement | null>(null);

  const location = useSelector((state: RootState) => state.location);
  const modalControl = useSelector((state: RootState) => state.modalControl);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  // const inputControl = useSelector((state: RootState) => state.inputControl);
  const dispatch = useDispatch();

  return (
    <>
      <div className="
        flex flex-row justify-center items-center 
        laptop:gap-[20px] p-[10px] border-[1px] border-solid border-grey 
        tablet:gap-[20px] p-[10px] border-[1px] border-solid border-grey 
        mobile:gap-[10px] p-[10px] border-[1px] border-solid border-grey 
        smallest:gap-[5px] border-transparent m-0
      ">
        <div className="flex ">
          <input 
            type="search" 
            ref={ matjipRef } 
            placeholder={ useWindowSize().width >= 768 ? '맛집 상호명 입력' : '목록 내 검색하기' } 
            onFocus={ () => document.querySelector('#footer')?.classList.add('hidden') }
            onBlur={ () => document.querySelector('#footer')?.classList.remove('hidden') }
            className={`
              input input-bordered w-[100%]
              ${ environmentVariables.backgroundMode ? 'bg-white focus:text-black' : 'bg-[#2A303C] border-white focus:text-white' }
            `}/>
        </div>
      </div>      
    </>
  );
}

export default SearchInputbox;
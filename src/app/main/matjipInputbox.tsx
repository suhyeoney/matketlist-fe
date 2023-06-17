'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addLocation } from '../features/location/locationSlice';
import SearchAddressModal from '../modals/searchAddressModal';
import { setSearchAddressModalOpen } from '../features/modalControl/modalControlSlice';
import { storeInputMajip } from '../features/inputControl/inputControlSlice';
import { LocationType } from '../dataTypes/Location';

const matjipInputbox:React.FC = () => {

  const latitudeRef = useRef<HTMLInputElement | null>(null);
  const longitudeRef = useRef<HTMLInputElement | null>(null);
  
  const matjipRef = useRef<HTMLInputElement | null>(null);

  const location = useSelector((state: RootState) => state.location);
  // const modalControl = useSelector((state: RootState) => state.modalControl);
  // const inputControl = useSelector((state: RootState) => state.inputControl);
  const dispatch = useDispatch();

  const onSearchBtnClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const inputValue = matjipRef.current?.value;
    if(!inputValue) {
      alert('검색할 맛집 상호명을 입력해주세요.');
      return;
    }

    dispatch(setSearchAddressModalOpen(true));
    dispatch(storeInputMajip(matjipRef.current?.value))
  }, []);

  const onAddBtnClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const inputLatitude = Number(latitudeRef.current?.value);
    const inputLongitude = Number(longitudeRef.current?.value);
    
    // const isDuplicated = location.arrLocation.find((e: LocationType) => { return e.latitude === inputLatitude && e.longitude === inputLongitude });

    // if(isDuplicated) {
    //   alert('해당 맛집은 이미 등록되어 있습니다.');
    //   return;
    // }

    const newLocation = {
      latitude: inputLatitude,
      longitude: inputLongitude
    };

    dispatch(addLocation(newLocation));

  }, [ location.arrLocation ]);

  useEffect(() => {
    console.log(location.cntLocation);
  }, [ location.arrLocation ]);

  return (
    <>
      <div className="flex flex-row justify-center items-center border-[1px] border-solid border-grey rounded-md gap-[20px] p-[10px]">
        <span className="font-['Tenada'] h-[48px] text-center p-[10px] text-1xl bg-yellow-300	rounded-md flex justify-center items-center">나만의 맛집 추가하기</span>
        {/* <input type="text"  ref={ latitudeRef } placeholder="위도 값" className="input input-ghost w-[150px] max-w-xs" />
        <input type="text" ref={ longitudeRef } placeholder="경도 값" className="input input-ghost w-[150px] max-w-xs" /> */}
        <div className="flex flex-row gap-[20px]">
          <input 
            type="search" 
            ref={ matjipRef } 
            placeholder="맛집 상호명 입력" 
            className="input input-ghost" 
          />
          {/* <button className="btn btn-circle btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button> */}

        </div>
        <button className="font-['Tenada'] border-blue-500 bg-blue-500 text-white text-[17px] btn w-[100px]" onClick={ onSearchBtnClick }><span className="pr-2">🔍</span>검색</button>
        {/* <button className="btn btn-outline gap-2 w-[150px]" onClick={ onAddBtnClick }>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          추가하기
        </button> */}
        {/* <span>현재 location 배열 : { JSON.stringify(location.arrLocation) }</span>
        <span>현재 location 크기 : { location.cntLocation }</span> */}
      </div>      
    </>
  );
}

export default matjipInputbox;
'use client'

import { useCallback, useEffect, useMemo, useState } from 'react';

const RegionInputbox:React.FC = () => {

  const [ latitude, setLatitude ] = useState<Number>(0);
  const [ longitude, setLongitude ] = useState<Number>(0);

  useMemo(() => {
    if(latitude) {
      console.log(latitude);
    }
  }, [ latitude ]);

  return (
    <div className="border-[1px] border-solid border-grey rounded-md grid gap-4 grid-cols-4 p-[10px]">
      <span className="font-['Tenada'] h-[48px] text-center p-[10px] text-1xl bg-yellow-300	rounded-md flex justify-center items-center">나만의 맛집 추가하기</span>
      <input type="text" placeholder="위도 값" className="input input-ghost w-[150px] max-w-xs" />
      <input type="text" placeholder="경도 값" className="input input-ghost w-[150px] max-w-xs" />
      <button className="btn btn-outline gap-2 w-[150px]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        추가하기
      </button>    
    </div>
  );
}

export default RegionInputbox;
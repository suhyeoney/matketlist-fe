'use client'

import { useCallback, useEffect, useMemo, useState } from 'react';

const RegionSelectbox:React.FC = () => {

  type RegionType = {
    key: string,
    name: string,
  } | undefined;

  const regionList = [
    { key: '', name: '전국' },
    { key: '00001', name: '서울' },
    { key: '00002', name: '경기도' },
    { key: '00003', name: '인천광역시' },
    { key: '00004', name: '부산광역시' },
    { key: '00005', name: '대구광역시' },
    { key: '00006', name: '울산광역시' }, 
    { key: '00007', name: '광주광역시' }, 
    { key: '00008', name: '대전광역시' }, 
    { key: '00009', name: '강원도' }, 
    { key: '00010', name: '세종특별자치시' }, 
    { key: '00011', name: '충청남도' }, 
    { key: '00012', name: '충청북도' }, 
    { key: '00013', name: '전라남도' }, 
    { key: '00014', name: '전라북도' }, 
    { key: '00015', name: '경상남도' }, 
    { key: '00016', name: '경상북도' }, 
    { key: '00017', name: '제주특별자치도' }, 
  ];

  const [ region, setRegion ] = useState<RegionType>(regionList[0]);

  useMemo(() => {
    if(region) {
      console.log(region);
    }
  }, [ region ]);

  return (
    <div className="p-[10px]">
      <select 
        className="select select-bordered w-[100px] max-w-xs" 
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRegion(regionList.find((x: RegionType) => x?.name === e?.currentTarget?.value))}
      >
        { regionList.map((e: RegionType) => {
          return (
            <option key={ e?.key }>{ e?.name }</option>
          );
        })}
      </select>
    </div>
  );
}

export default RegionSelectbox;
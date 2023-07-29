'use client'

import { useCallback, useEffect, useMemo, useState } from 'react';
import { data } from '@utils/dataForRegion/data';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

type RegionType = {
  key: string,
  name: string | string[],
} | undefined;

const RegionSelectbox:React.FC = () => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  const [ region, setRegion ] = useState<RegionType>(data[0]);

  useMemo(() => {
    if(region) {
      console.log(region);
    }
  }, [ region ]);

  return (
    <>
      <select 
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRegion(data.find((x: RegionType) => x?.name === e?.currentTarget?.value))}
        className={`
          select select-bordered w-[100px] h-[90%]
          ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
        `}>
        { data.map((e: RegionType) => {
          return (
            <option key={ e?.key }>{ typeof e?.name === 'string' ? e?.name : e?.name[0] }</option>
          );
        })}
      </select>
    </>
  );
}

export default RegionSelectbox;
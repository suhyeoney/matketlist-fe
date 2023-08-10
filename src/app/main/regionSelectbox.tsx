'use client'

import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

interface RegionType {
  key: string,
  name: string | string[],
};

interface RegionSelectboxProps {
  data: RegionType[],
  setRegionCode: React.Dispatch<React.SetStateAction<string>>,
};

const RegionSelectbox:React.FC<RegionSelectboxProps> = ({ data, setRegionCode }) => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  return (
    <>
      <select 
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedIndex = e.target.options.selectedIndex;
          setRegionCode(e.target.options[selectedIndex].getAttribute('data-key') ?? 'RC000');
        }}
        className={`
          select select-bordered w-[100px] h-[90%]
          ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
        `}>
        { data.map((e: RegionType) => {
          return (
            <option key={ e?.key } data-key={ e?.key }>{ typeof e?.name === 'string' ? e?.name : e?.name[0] }</option>
          );
        })}
      </select>
    </>
  );
}

export default RegionSelectbox;
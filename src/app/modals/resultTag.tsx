'use client'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';

type ResultsDataTagType = {
  address: string, 
  name : string, 
  iconUrl: string, 
  latitude: number, 
  longitude: number,
  phoneNumber: string,
  placeId: string,
  compoundCode: string,
  hashtags: number[],
};

type ResultTagProps = {
  dataKey: number,
  data: ResultsDataTagType,
  registerMatjip: (e: ResultsDataTagType) => Promise<void>
};

const ResultTag: React.FC<ResultTagProps> = ({ dataKey, data, registerMatjip }) => {  

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const dispatch = useDispatch();

  return (
    <>
      <div 
        id={`resultTag-${ dataKey }`}
        onClick={ () => registerMatjip(data) }
        className={`
          resultDataTag flex flex-row gap-2 shrink-0 px-4 py-1
          ${ environmentVariables.backgroundMode ? 
            'text-black hover:bg-gray-100 cursor-pointer font-semibold' : 
            'text-white bg-[#2A303C] hover:cursor-pointer font-semibold' }
      `}>
        <div className="
          flex flex-col gap-1 shrink-0 shadow-xl w-full p-1
        ">
          <div className={`
            p-1 rounded-[10px]
            text-center 
            ${ environmentVariables.backgroundMode ? 'bg-yellow-200' : 'bg-slate-900' }
            laptop:text-[15px] whitespace-normal
            tablet:text-[15px] whitespace-normal
            mobile:text-[15px] whitespace-normal
            smallest:text-[15px] whitespace-normal
          `}>{ data.name }</div>
          <div className="
            p-2 rounded-[10px]
            laptop:text-[15px] whitespace-normal
            tablet:text-[15px] whitespace-normal
            mobile:text-[15px] whitespace-normal
            smallest:text-[15px] whitespace-normal
          ">{ data.address }</div>
          </div>

      </div>
    </>
  );
};

export default ResultTag;
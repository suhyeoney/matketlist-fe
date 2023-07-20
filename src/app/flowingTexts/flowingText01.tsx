'use client'

import Image from 'next/image';
import localFont from 'next/font/local';

import image1 from '@assets/icons/notice-megaphone.png';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useEffect, useState } from 'react';

type FlowingText01Props = {
  text: string,
};

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const FlowingText01: React.FC<FlowingText01Props> = ({ text }) => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  const [ divBgColor, setDivBgColor ] = useState<string>('bg-white');

  useEffect(() => {
    if(environmentVariables.backgroundMode) {
      setDivBgColor('bg-white');
    } else {
      setDivBgColor('bg-[#2A303C]');
    }
  }, [ environmentVariables.backgroundMode ]);

  return (
    <div className="
      flex flex-row items-center justify-center
      laptop:pb-2
      tablet:pb-2
    ">
      <div className={`
        absolute z-10 left-0 ${ divBgColor } 
        laptop:w-[25%] h-[30px]
        tablet:w-[25%] h-[30px]
        mobile:w-[5%] h-[30px]
        smallest:w-[5%] h-[30px]
      `}></div>
      <div className="
        absolute z-6
        laptop:w-[50%] h-[30px]
        tablet:w-[50%] h-[30px]
        mobile:w-[90%] h-[30px]
        smallest:w-[90%] h-[30px]
      ">
        <div className="flex flex-row items-center justify-center border border-solid border-gray-200 rounded-[5px]">
          <div className="
            w-[80px] h-[30px] absolute z-10 left-0
            flex flex-row items-center justify-center gap-1 px-2 rounded-tl-[5px] rounded-bl-[5px] bg-gray-100
          ">
            <Image
              src={ image1.src }
              alt=""
              width="25"
              height="25"
              className="w-[25px] h-[25px]"
            />
            <div className="">
              <span className={ `
                ${ Tenada.className }
                ${ environmentVariables.backgroundMode ? 'text-black' : 'text-[#2A303C]' }
              `}>알림</span>
            </div>
          </div>
          <div className="flex items-center justify-center animate-flowing font-medium h-[30px]">
            <p className={`
              ${ environmentVariables.backgroundMode ? 'text-black' : 'text-white' }
            `}>{ text }</p>
          </div>
        </div>
      </div>
      <div className={`
        absolute z-10 right-0 ${ divBgColor } 
        laptop:w-[25%] h-[30px]
        tablet:w-[25%] h-[30px]
        mobile:w-[5%] h-[30px]
        smallest:w-[5%] h-[30px]
      `}></div>
    </div>
  );
    
};

export default FlowingText01;
'use client'

import localFont from 'next/font/local';

import { useEffect, useState } from 'react';
import '@spinners/styles.css';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

interface LoadingSpinner03Props {
  cubeText: string,
  infoText: string,
};

const YeongdeokBlueroad = localFont({
  src: '../assets/fonts/YeongdeokBlueroad.woff'
});


const LoadingSpinner03: React.FC<LoadingSpinner03Props> = ({ cubeText, infoText }) => {

  const [ arrCubeText, setArrCubeText ] = useState<string[]>([]);

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  useEffect(() => {
    setArrCubeText([ ...cubeText.split('') ]);
  }, [ cubeText ]);

  return (
    // <div className="flex flex-col justify-center gap-2 items-center pt-[200px]">
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="cube">
        { arrCubeText.map((x: string, idx: number) => {
          return (
            <div 
              key={ idx } 
              className={`
                side 
                side-${ idx + 1 }
                ${ environmentVariables.backgroundMode ? 'text-white' : 'text-white' } 
            `}>{ x }</div>
          );
        })}
      </div>
      <span
        className={`
        ${ YeongdeokBlueroad.className }
        ${ environmentVariables.backgroundMode ? 'text-white' : 'text-white' }
      `}>
        { infoText }
      </span>
    </div>
  );
    
};

export default LoadingSpinner03;
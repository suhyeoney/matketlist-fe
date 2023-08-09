'use client'

import { useEffect, useState } from 'react';
import '@spinners/styles.css';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

type LoadingSpinner03Props = {
  cubeText: string,
  infoText: string,
};

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
                ${ environmentVariables.backgroundMode ? 'text-[#2A303C]' : 'text-white' } 
            `}>{ x }</div>
          );
        })}
      </div>
      <span
        className={`
        ${ environmentVariables.backgroundMode ? 'text-gray-700' : 'text-white' }
      `}>
        { infoText }
      </span>
    </div>
  );
    
};

export default LoadingSpinner03;
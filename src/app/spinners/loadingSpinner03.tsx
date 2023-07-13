'use client'

import { useEffect, useState } from 'react';
import '@spinners/styles.css';

type LoadingSpinner03Props = {
  cubeText: string,
  infoText: string,
};

const LoadingSpinner03: React.FC<LoadingSpinner03Props> = ({ cubeText, infoText }) => {

  const [ arrCubeText, setArrCubeText ] = useState<string[]>([]);

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
            `}>{ x }</div>
          );
        })}
      </div>
      <span>{ infoText }</span>
    </div>
  );
    
};

export default LoadingSpinner03;
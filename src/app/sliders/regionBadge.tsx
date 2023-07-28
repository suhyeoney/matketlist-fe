'use client'

import { useWindowSize } from '@hooks/useWindowSize';
import { useEffect, useState } from 'react';

type RegionType = {
  key: string,
  name: string,
} | undefined;

type RegionBadgeProps = {
  id: number,
  regionData: RegionType
};

const RegionBadge: React.FC<RegionBadgeProps> = ({ id, regionData }) => {

  const [ leftPadding, setLeftPadding ] = useState<number>(0);
  const [ topPadding, setTopPadding ] = useState<number>(0);
  const [ modalWidth, setModalWidth ] = useState<number>(0);
  const [ windowWidth, setWindowWidth ] = useState<number>(0);
  const windowSize = useWindowSize(); 

  useEffect(() => {
    // console.log('windowSize', windowSize);
    setWindowWidth(windowSize.width);
  }, [ windowSize ]);

  useEffect(() => {
    // console.log('windowWidth', windowWidth);
    setModalWidth(document.querySelector('#matjipCardsWrapper')?.clientWidth ?? 0);
  }, [ windowWidth ]);

  useEffect(() => {
    // console.log('modalWidth', modalWidth);
    if(windowSize.width >= 1024) {
      setLeftPadding(modalWidth * 0.35);
      setTopPadding(0);
    } else if (windowSize.width >=768 && windowSize.width < 1023) {
      setLeftPadding(modalWidth * 0.3);
      setTopPadding(0);
    }else if(windowSize.width >= 330 && windowSize.width < 768) {
      setLeftPadding(modalWidth * 0.1);
      setTopPadding(10);
    } else {
      setLeftPadding(modalWidth * 0.1);
      setTopPadding(10);
    }
  }, [ modalWidth ]);

  const render = () => {
    const regionCode = regionData?.key;
    let badgeStyle = 'absolute w-[45px] h-[45px] flex items-center justify-center rounded-full text-white border-2 border-white ';
    switch(regionCode) {
      case '00001':
        badgeStyle += 'bg-red-500 ';
        break;
      case '00002':
        badgeStyle += 'bg-red-500 ';
        break;
      case '00003':
        badgeStyle += 'bg-red-500 ';
        break;
      case '00004':
        badgeStyle += 'bg-purple-500 ';
        break;
      case '00005':
        badgeStyle += 'bg-orange-500 ';
        break;
      case '00006':
        badgeStyle += 'bg-purple-500 ';
        break;
      case '00007':
        badgeStyle += 'bg-blue-500 ';
        break;
      case '00008':
        badgeStyle += 'bg-blue-500 ';
        break;
      case '00009':
        badgeStyle += 'bg-orange-500 ';
        break;
      case '00010':
        badgeStyle += 'bg-blue-500 ';
        break;
      case '00011':
        badgeStyle += 'bg-blue-500 ';
        break;
      case '00012':
        badgeStyle += 'bg-blue-500 ';
        break;
      case '00013':
        badgeStyle += 'bg-blue-500 ';
        break;
      case '00014':
        badgeStyle += 'bg-blue-500 ';
        break;
      case '00015':
        badgeStyle += 'bg-orange-500 ';
        break;
      case '00016':
        badgeStyle += 'bg-orange-500 ';
        break;
      case '00017':
        badgeStyle += 'bg-red-500 ';
        break;
      
    }
    return (
      <span
        style={{ 
          left: `${ id * 224 + leftPadding }px`, 
          top: `${ topPadding }px`,
          borderRadius: `30% 70% 70% 30% / 30% 30% 70% 70%` 
        }}
        className={`${ badgeStyle }`}
      >
        { regionData?.name }
      </span>
    );
  };


  return (
    <>
      { render() }
    </>
  );
};

export default RegionBadge;
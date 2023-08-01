'use client'

import { useWindowSize } from '@hooks/useWindowSize';
import { useEffect, useState } from 'react';

type RegionType = {
  key: string,
  name: string | string[],
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
      setLeftPadding(modalWidth * 0.13);
      setTopPadding(5);
    } else {
      setLeftPadding(modalWidth * 0.13);
      setTopPadding(5);
    }
  }, [ modalWidth ]);

  const render = () => {
    const regionCode = regionData?.key;
    let badgeStyle = 'absolute w-[45px] h-[45px] flex items-center justify-center rounded-full text-white border-2 border-white ';
    switch(regionCode) {
      case 'RC001':
        badgeStyle += 'bg-red-500 ';
        break;
      case 'RC002':
        badgeStyle += 'bg-red-500 ';
        break;
      case 'RC003':
        badgeStyle += 'bg-red-500 ';
        break;
      case 'RC004':
        badgeStyle += 'bg-green-500 ';
        break;
      case 'RC005':
        badgeStyle += 'bg-orange-500 ';
        break;
      case 'RC006':
        badgeStyle += 'bg-purple-500 ';
        break;
      case 'RC007':
        badgeStyle += 'bg-blue-500 ';
        break;
      case 'RC008':
        badgeStyle += 'bg-blue-500 ';
        break;
      case 'RC009':
        badgeStyle += 'bg-orange-500 ';
        break;
      case 'RC010':
        badgeStyle += 'bg-blue-500 ';
        break;
      case 'RC011':
        badgeStyle += 'bg-blue-500 ';
        break;
      case 'RC012':
        badgeStyle += 'bg-blue-500 ';
        break;
      case 'RC013':
        badgeStyle += 'bg-blue-500 ';
        break;
      case 'RC014':
        badgeStyle += 'bg-blue-500 ';
        break;
      case 'RC015':
        badgeStyle += 'bg-orange-500 ';
        break;
      case 'RC016':
        badgeStyle += 'bg-orange-500 ';
        break;
      case 'RC017':
        badgeStyle += 'bg-red-500 ';
        break;
      
    }
    return (
      <div
        style={{ 
          left: `${ id * ((windowWidth < 330 ? 150 : 200) + 24) + leftPadding }px`, 
          top: `${ topPadding }px`,
          borderRadius: `30% 70% 70% 30% / 30% 30% 70% 70%` 
        }}
        className={`${ badgeStyle }`}
      >
        { regionData?.name }
      </div>
    );
  };


  return (
    <>
      { render() }
    </>
  );
};

export default RegionBadge;
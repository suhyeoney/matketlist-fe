'use client'

import localFont from 'next/font/local';
import Image from 'next/image';

import { useWindowSize } from '@hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import image1 from '@assets/icons/refresh-btn.png';
import { useDispatch } from 'react-redux';
import { getLocationRanks } from '@store/features/location/slice';
import { setMatjipRankReduced, setSearchAddressModalOpen } from '@store/features/modalControl/slice';
import { storeInputMajip } from '@store/features/inputControl/slice';
import { useEffect, useState } from 'react';
import image2 from '@assets/icons/reduce-btn.png';

interface RankType {
  rankNum: string,
  name: string,
  placeId: string,
  latitude: number,
  longitude: number,
  cnt: number,
};

const YeongdeokSea = localFont({
  src: '../assets/fonts/YeongdeokSea.woff'
});

const MatjipRank: React.FC= () => {

  const [ isFold, setFold ] = useState<boolean>(false);
  const [ isTimeLimit, setTimeLimit ] = useState<boolean>(false);

  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.location);
  const modalControl = useSelector((state: RootState) => state.modalControl);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const refreshRanks = () => {
    document.querySelector('#refresh-rank-btn')?.classList.add('animate-rotate360');
    dispatch(getLocationRanks());
    setTimeout(() => {
      document.querySelector('#refresh-rank-btn')?.classList.remove('animate-rotate360');
    }, 1000);
  };

  const onClickRankSelected = (target: RankType) => {
    console.log('rank selected', target);
    dispatch(setSearchAddressModalOpen(true));
    dispatch(storeInputMajip(target.name));
  };

  const onClickFold = () => {
    setTimeout(() => {
      setTimeLimit(isTimeLimit => !isTimeLimit);
    }, !isFold ? 500 : 0);
    setFold(isFold => !isFold);
  };
  
  const reduceContainerSize = () => {
    dispatch(setMatjipRankReduced(true));
  };

  useEffect(() => {
    if(isFold) {
      console.log('isFold', true);
      document.querySelector('#rank-content-area')?.classList.replace('animate-openDownRankContent', 'animate-foldUpRankContent'); 
      document.querySelector('#rank-container-area')?.classList.replace('animate-openDownRankContainer', 'animate-foldUpRankContainer'); 
    } else {
      document.querySelector('#rank-container-area')?.classList.replace('animate-foldUpRankContainer', 'animate-openDownRankContainer'); 
      document.querySelector('#rank-content-area')?.classList.replace('animate-foldUpRankContent', 'animate-openDownRankContent'); 
    }
  }, [ isFold ]);

  return (
    <> 
      { !modalControl.isMatjipRankReduced ?
      <div 
        id="rank-container-area"
        className={`
        ${ YeongdeokSea.className }
        ${ environmentVariables.backgroundMode ? 'bg-gray-100 text-black' : 'bg-[#2A303C] text-white' }
        ${ !isFold ? 'h-[245px]' : 'h-[65px]' }
        ${ windowSize.width >= 768 ? 'top-12 right-2' : 'top-44 right-4' }
        absolute z-10 w-[200px] rounded-[10px] border-4 border-gray-300 text-black
        flex flex-col gap-1 p-2 cursor-default animate-openDownRankContainer
      `}>
        <div className="flex items-center justify-center">
          <span className="bg-yellow-200 text-[14px] text-black rounded-[5px] px-2">전국 맛집 TOP 5</span>
        </div>
        <div className="absolute top-2 left-2 self-end">
          <Image 
            id="refresh-rank-btn"
            src={ image1.src }
            alt=""
            width="20"
            height="20"
            onClick={ () => refreshRanks() }
            className="w-[20px] h-[20px] rounded-full bg-white p-1 hover:cursor-pointer"
          />
        </div>
        { windowSize.width < 768? 
        <div className="absolute top-[-10px] right-[-10px] self-end">
          <Image 
            id="reduce-rank-btn"
            src={ image2.src }
            alt=""
            width="20"
            height="20"
            onClick={ () => reduceContainerSize() }
            className="w-[20px] h-[20px] border-2 border-black rounded-full bg-white p-1 hover:cursor-pointer"
          />
        </div> : null }
        { !isTimeLimit ? 
        <div 
          id="rank-content-area"
          className="flex flex-col gap-0 animate-openDownRankContent"
        >
          <div>
            { locations.arrLocationRanks !== undefined ?
              locations.arrLocationRanks.map((e: RankType, idx: number) => {
                return (
                  <div 
                    key={ idx }
                    onClick={ () => onClickRankSelected(e) }
                    className={`
                      flex flex-row gap-1 px-1 hover:bg-gray-200 hover:text-black hover:cursor-pointer
                    `}>
                    <div className="flex items-center justify-center w-[20px] h-[20px] rounded-[5px] self-center bg-yellow-100 text-black p-1">
                      { idx + 1 }
                    </div>
                    <div className="w-[170px] py-1 px-2 truncate ...">{ e.name }</div>
                  </div>
                );
              }) : null }
          </div>
          <div className="flex items-center justify-end">
            <span className="text-[10px]">{`${ locations.rankRefreshTime } 기준`}</span>
          </div>
        </div> : null }
        <div
          onClick={ () => onClickFold() } 
          className={`
            flex items-center justify-center text-[8px] text-black hover:cursor-pointer
            ${ environmentVariables.backgroundMode ? 'bg-[#2A303C] text-white' : 'bg-gray-100 text-black' }
        `}>{ !isFold ? '접기' : '펼치기' }
        </div>
      </div> : null }
    </>
  );
};

export default MatjipRank;
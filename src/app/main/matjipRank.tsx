'use client'

import localFont from 'next/font/local';
import Image from 'next/image';

import { useWindowSize } from '@hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import image1 from '@assets/icons/refresh-btn.png';
import { useDispatch } from 'react-redux';
import { getLocationRanks } from '@store/features/location/slice';

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

  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.location);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const refreshRanks = () => {
    document.querySelector('#refresh-rank-btn')?.classList.add('animate-rotate360');
    dispatch(getLocationRanks());
    setTimeout(() => {
      document.querySelector('#refresh-rank-btn')?.classList.remove('animate-rotate360');
    }, 1000);
  };

  return (
    <> 
      { windowSize.width >= 768 ?
        <div className={`
          ${ YeongdeokSea.className }
          ${ environmentVariables.backgroundMode ? 'bg-gray-100 text-black' : 'bg-[#2A303C] text-white' }
          absolute z-10 top-12 right-2 w-[200px] h-[230px] rounded-[10px] border-2 border-gray-300 text-black
          flex flex-col gap-1 p-2 cursor-default 
        `}>
          <div className="flex items-center justify-center">
            <span className="bg-yellow-200 text-black rounded-[5px] px-2">전국 맛집 TOP 5</span>
          </div>
          <div className="absolute top-2 right-2 self-end">
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
          <div>
          { locations.arrLocationRanks !== undefined ?
            locations.arrLocationRanks.map((e: RankType, idx: number) => {
              return (
                <div 
                  key={ idx }
                  // onClick={ () =>  }
                  className={`
                    flex flex-row gap-1 px-1 hover:bg-gray-200 hover:text-black hover:cursor-pointer
                  `}>
                  <div className="flex items-center justify-center w-[20px] h-[20px] rounded-[5px] self-center bg-yellow-100 text-black p-1">
                    { idx + 1 }
                  </div>
                  <div className="w-[170px] py-1 px-2 truncate ...">{ e.name }</div>
                </div>
              );
            }) : null
          }
          </div>
          <div className="flex items-center justify-end">
            <span className="text-[10px]">{`${ locations.rankRefreshTime } 기준`}</span>
          </div>
        </div> : null
      }
    </>
  );
};

export default MatjipRank;
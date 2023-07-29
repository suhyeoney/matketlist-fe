'use client'

import Image from 'next/image';

import RegionBadge from '@sliders/regionBadge';
import { getDiffBetweenTwoDays } from '@utils/dateUtils';
import image1 from '@assets/icons/move-to-map.png';
import image2 from '@assets/icons/share.png';

type RegionType = {
  key: string,
  name: string | string[],
} | undefined;

type CardDataType = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  address: string,
  region: RegionType,
  userRegisterDate: string,
};

type CardProps = {
  data: CardDataType,
};

const Card: React.FC<CardProps> = ({ data }) => {
  
  return (
    <div 
      id={`card-${ data.id }`}
      className="matjipCard snap-center shrink-0 h-[100%]
      laptop:w-[200px]
      tablet:w-[200px]
      mobile:w-[200px]
      smallest:w-[150px]
      first:pl-8 last:pr-8 
    ">
      <div className="
        shrink-0 shadow-xl w-full h-full flex flex-col gap-2 rounded-[10px] p-3 bg-gradient-to-r from-purple-500 to-pink-500
      ">
        <RegionBadge id={ data.id } regionData={ data.region } />
        <div className="
          h-[60px] text-[18px] font-semibold bg-white text-black p-1 rounded-[10px]
          text-center px-3 py-4 truncate ...
      ">{ data.name }</div>
        <div className="h-[90px] text-[15px] font-medium bg-white text-black p-1 rounded-[10px]">{ data.address }</div>
        <div className="h-[30px] text-[15px] font-medium bg-white text-center text-gray-300 p-1 rounded-[10px]">
          { getDiffBetweenTwoDays(data.userRegisterDate) }
        </div>
        <div className="flex flex-row items-center justify-center">
          <button id="btn-map" className="flex items-center justify-center float-left w-[48%]">
            <Image
                src={ image1.src }
                alt=""
                width="25"
                height="25"
                className="w-[25px] h-[25px]"
              />
          </button>
          <button id="btn-share" className="flex items-center justify-center float-right w-[48%]">
            <Image
              src={ image2.src }
              alt=""
              width="25"
              height="25"
              className="w-[25px] h-[25px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
'use client'

import RegionBadge from '@sliders/regionBadge';

type RegionType = {
  key: string,
  name: string,
} | undefined;

type CardDataType = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  address: string,
  region: RegionType,
};

type CardProps = {
  data: CardDataType,
};

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div 
      id={`card-${ data.id }`}
      className="matjipCard snap-center shrink-0 h-[90%]
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
        <div className="h-[60px] text-[18px] font-semibold bg-white text-black p-1">{ data.name }</div>
        <div className="h-[60px] text-[15px] font-semibold bg-white text-black p-1">{ data.address }</div>
      </div>
    </div>
  );
};

export default Card;
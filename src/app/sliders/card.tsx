'use client'

import Image from 'next/image';

import RegionBadge from '@sliders/regionBadge';
import { getDiffBetweenTwoDays } from '@utils/dateUtils';
import image1 from '@assets/icons/move-to-map.png';
import image2 from '@assets/icons/remove-btn.png';
import image3 from '@assets/icons/share.png';
import { useDispatch } from 'react-redux';
import { moveToMapToggle } from '@features/environmentVariables/environmentVariablesSlice';
import { removeLocation } from '@features/location/locationSlice';

type RegionType = {
  key: string,
  name: string | string[],
} | undefined;

type CardDataType = {
  id: number,
  placeId: string,
  name: string,
  latitude: number,
  longitude: number,
  address: string,
  region: RegionType,
  userRegisterDate: string,
};

type CardProps = {
  dataKey: number,
  data: CardDataType,
  setPosition: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
  }>>,
  closeModal: () => void,
};

const Card: React.FC<CardProps> = ({ dataKey, data, setPosition, closeModal }) => {  

  const dispatch = useDispatch();

  const moveToMap = (data: CardDataType) => {
    const result = window.confirm(`${ data.name } 위치를 지도에서 확인해보시겠어요? (확인 클릭 시, 지도로 이동합니다.)`);
    if(result) {
      dispatch(moveToMapToggle(true))
      setPosition(prev => { return {
        ...prev,
        latitude: data.latitude,
        longitude: data.longitude,
      }});
      closeModal();
    } else {
      return;
    }
  };

  const removeData = (data: CardDataType) => {
    const result = window.confirm(`해당 맛집을 목록에서 해제하시겠어요?`);
    if(result) {
      dispatch(removeLocation(data.placeId));
    } else {
      return;
    }
  };

  const openSnsSharing = (data: CardDataType) => {

  };

  return (
    <div 
      id={`card-${ dataKey }`}
      className="matjipCard snap-center shrink-0
      laptop:w-[200px] h-[90%]
      tablet:w-[200px] h-[90%]
      mobile:w-[200px] h-[100%]
      smallest:w-[150px] h-[100%]
      first:pl-8 last:pr-8 
    ">
      <div className="
        shrink-0 shadow-xl w-full h-full flex flex-col rounded-[10px] bg-gradient-to-r from-purple-500 to-pink-500
        laptop:gap-7
        tablet:gap-6 
        mobile:gap-3 p-3
        smallest:gap-1 p-3
      ">
        <RegionBadge id={ dataKey } regionData={ data.region } />
        <div className="
          h-[60px] font-semibold bg-white text-black p-1 rounded-[10px]
          text-center px-3 truncate ...
          laptop:text-[15px]
          tablet:text-[15px]
          mobile:text-[15px]
          smallest:text-[15px]
      ">{ data.name }</div>
        <div className="
          font-medium bg-white text-black p-2 rounded-[10px] truncate ...
          laptop:h-[90px]
          tablet:h-[90px] 
          mobile:h-[90px] 
          smallest:h-[60px] text-[12px] 
        ">{ data.address }</div>
        <div className="
          h-[30px] font-medium bg-white text-center text-gray-300 p-1 rounded-[10px]
          smallest:text-[12px]
        ">
          { getDiffBetweenTwoDays(data.userRegisterDate) }
        </div>
        <div className="flex flex-row items-center justify-center">
          <button 
            id="btn-map"
            onClick={ () => moveToMap(data) } 
            className="flex items-center justify-center float-left w-[33%]
            ">
            <Image
              src={ image1.src }
              alt=""
              width="30"
              height="30"
              className="w-[30px] h-[30px]"/>
          </button>
          <button 
            id="btn-remove"
            onClick={ () => removeData(data) } 
            className="flex items-center justify-center w-[33%]
            ">
            <Image
              src={ image2.src }
              alt=""
              width="30"
              height="30"
              className="w-[30px] h-[30px]"/>
          </button>
          <button 
            id="btn-share" 
            onClick={ () => openSnsSharing(data) } 
            className="flex items-center justify-center float-right w-[33%]
          ">
            <Image
              src={ image3.src }
              alt=""
              width="30"
              height="30"
              className="w-[30px] h-[30px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
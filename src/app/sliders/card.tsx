'use client'

import Image from 'next/image';
import localFont from 'next/font/local';

import RegionBadge from '@sliders/regionBadge';
import { getDiffBetweenTwoDays } from '@utils/dateUtils';
import image1 from '@assets/icons/move-to-map.png';
import image2 from '@assets/icons/remove-btn.png';
import image3 from '@assets/icons/hashtag.png';
import { useDispatch, useSelector } from 'react-redux';
import { moveToMapToggle } from '@features/environmentVariables/environmentVariablesSlice';
import { removeLocation, updateHashtag } from '@features/location/locationSlice';
import { useState } from 'react';
import HashtagCheckbox from '@sliders/hashtagCheckbox';
import { RootState } from '@store/store';
import { HashtagType } from '@dataTypes/hashtag';

interface RegionType {
  key: string,
  name: string | string[],
};

interface CardDataType {
  id: number,
  placeId: string,
  name: string,
  latitude: number,
  longitude: number,
  address: string,
  region: RegionType,
  userRegisterDate: string,
};

interface CardProps {
  dataKey: number,
  data: CardDataType,
  setPosition: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
  }>>,
  closeModal: () => void,
};

const YeongdeokBlueroad = localFont({
  src: '../assets/fonts/YeongdeokBlueroad.woff'
});

const YeongdeokSea = localFont({
  src: '../assets/fonts/YeongdeokSea.woff'
});

const Card: React.FC<CardProps> = ({ dataKey, data, setPosition, closeModal }) => {  

  const location = useSelector((state: RootState) => state.location);

  const [ isHashtagCheckboxOpen, setHashtagCheckboxOpen ] = useState<boolean>(false);

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
      // 해시태그에 매핑되어있는 placeId도 제거해줘야 함!
      const tempArrHashtag = location.arrHashtag;
      console.log(
        tempArrHashtag.map((e: HashtagType) => {
          if(e.placeIds.includes(data.placeId)) {
            return {
              ...e,
              placeIds: [
                ...e.placeIds.filter((x: string) => x !== data.placeId)
              ]
            };
          }
          return e;
        })
      );
      dispatch(updateHashtag(
        tempArrHashtag.map((e: HashtagType) => {
          if(e.placeIds.includes(data.placeId)) {
            return {
              ...e,
              placeIds: [
                ...e.placeIds.filter((x: string) => x !== data.placeId)
              ]
            };
          }
          return e;
        })
      ));
    } else {
      return;
    }
  };

  const openHashtagCheckbox = (data: CardDataType) => {
    if(location.arrHashtag.length === 0) {
      alert('생성된 해시태그가 없습니다.\n우측 하단의 해시태그 버튼을 통해 해시태그를 관리해보세요!');
      return;
    }
    setHashtagCheckboxOpen(true);
  };

  return (
    <div 
      id={`card-${ dataKey }`}
      className={`
      matjipCard snap-center shrink-0
      ${ YeongdeokBlueroad.className }
      laptop:w-[200px] h-[90%]
      tablet:w-[200px] h-[90%]
      mobile:w-[200px] h-[100%]
      smallest:w-[150px] h-[100%]
      first:pl-8 last:pr-8 
    `}>
      { !isHashtagCheckboxOpen ?
      <div className="
        shrink-0 shadow-xl w-full h-full flex flex-col rounded-[10px] bg-gradient-to-r from-purple-500 to-pink-500
        laptop:gap-4
        tablet:gap-4 
        mobile:gap-2 p-3
        smallest:gap-1 p-3
      ">
        <RegionBadge id={ dataKey } regionData={ data.region } />
        <div className="
          h-[60px] font-semibold bg-white text-black p-1 rounded-[10px]
          text-center px-3 
          laptop:text-[15px] whitespace-normal
          tablet:text-[15px] whitespace-normal
          mobile:text-[15px] whitespace-normal
          smallest:text-[15px] truncate ...
      ">{ data.name }</div>
        <div className="
          font-medium bg-white text-black p-2 rounded-[10px] 
          laptop:h-[100px] whitespace-normal
          tablet:h-[100px]  whitespace-normal
          mobile:h-[90px] whitespace-normal
          smallest:h-[60px] text-[12px] truncate ...
        ">{ data.address }</div>
        <div className="
          flex flex-row items-start h-[25px] text-center text-[10px] text-black whitespace-nowrap
          overflow-x-scroll overflow-y-hidden scrollbar-hide
        ">
          {/* { getDiffBetweenTwoDays(data.userRegisterDate) } */}
          { location.arrHashtag.filter((e: HashtagType) => e.placeIds.includes(data.placeId)).map((x: HashtagType, idx: number) => {
            return (
            <span 
              key={ idx }
              className={`
              ${ YeongdeokSea.className }
              rounded-[5px] bg-gray-200 p-[2px] mr-1 font-medium cursor-default self-center
            `}>
              #{ x.text }
              </span> );
          }) }
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
          <div 
            id="btn-hashtag" 
            onClick={ () => openHashtagCheckbox(data) } 
            className="flex items-center justify-center float-right w-[33%] hover:cursor-pointer
          ">
            <Image
              src={ image3.src }
              alt=""
              width="35"
              height="35"
              className="w-[35px] h-[35px] rounded-[10px] bg-white p-1"
            />
          </div>
        </div>
      </div> : 
      <HashtagCheckbox 
        placeId={ data.placeId }
        setHashtagCheckboxOpen={ setHashtagCheckboxOpen }
      /> }
    </div>
  );
};

export default Card;
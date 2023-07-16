'use client'

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@main/header'));
const MatjipInputbox = dynamic(() => import('@main/matjipInputbox'));
const MyMatjipList = dynamic(() => import('@modals/myMatjipList'));

import SearchAddressModal from '@modals/searchAddressModal';
import LoadingSpinner03 from '@spinners/loadingSpinner03';

import { useSelector } from 'react-redux';
import useNaverMap from '@hooks/useNaverMap';
import { RootState } from '@store/store';
import { useEffect, useState } from 'react';
import useResponsiveMapSize from '@hooks/useResponsiveMapSize';

const Main: React.FC = () => {

  const modalControl = useSelector((state: RootState) => state.modalControl);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const [ mapObj, setMapObj ] = useState<naver.maps.Map | undefined | null>(null);
  const [ mapStyle, setMapStyle ] = useState<string>('');
  const [ mapSize, setMapSize ] = useState<string>('');

  useResponsiveMapSize(mapSize, setMapSize);
  useNaverMap(mapObj, setMapObj);

  useEffect(() => {
    // console.log('>>>> mapObj', mapObj);
    if(mapObj !== null && mapObj !== undefined) {
      if(Object.keys(mapObj).length > 0) {
        setMapStyle('border-[1px] border-gray-200');
      } else {
        setMapStyle('border-0');
      }
    }
  }, [ mapObj ]);

  return (
    <div 
      data-theme={ environmentVariables.backgroundMode === 'L' ? 'lemonade' : 'dark' }
      className="h-screen"
    >
      { Object.keys(mapObj ?? {}).length === 0 ? 
        <>
          <div className="flex justify-center items-center absolute z-20 w-full h-full opacity-50 bg-gray-700"></div>
          <div className="flex justify-center items-center absolute z-40 w-full h-full ">
            <div className="inline-block align-middle leading-normal text-white font-bold">
              {/* <LoadingSpinner01 color={ 'purple' } depth={ '500' } thickness={ '4' } text={ '지도 영역을 불러오고 있습니다.' } /> */}
              <LoadingSpinner03 cubeText={ 'MATKET' } infoText={ '지도 영역을 불러오고 있습니다.' } />
            </div>
          </div>
        </> : null
      }
      {/* <div className="flex justify-center items-center absolute z-20 w-full h-full opacity-50 bg-gray-700"></div>
      <div className="flex justify-center items-center absolute z-40 w-full h-full ">
        <div className="inline-block align-middle leading-normal text-white font-bold">
          <LoadingSpinner03 cubeText={ 'MATKET' } infoText={ '지도 영역을 불러오고 있습니다.' } />
        </div>
      </div> */}
      { modalControl.isSearchAddressModalOpen ?
        <>
          <div className="flex justify-center items-center w-full h-full absolute z-10"></div>
        </> : null
       }
      <Header />
      <div className="
        flex flex-col justify-center items-center relative z-10 
        laptop:gap-5
        tablet:gap-5
        mobile:gap-5
      ">
        <MatjipInputbox/>
        <div className={`${ mapSize }`}>
          <div id="map" className={`
            z-0 self-center ${ mapStyle } w-[100%] h-[100%]
          `}></div>
        </div>
        { modalControl.isSearchAddressModalOpen ? <SearchAddressModal /> : null }
        { modalControl.isMyMatjipListOpen ? <MyMatjipList /> : null }

      </div>
    </div>
  );
};

export default Main;

// laptop:w-[1000px] h-[500px] 
// tablet:w-[600px] h-[700px]
// mobile:w-[350px] h-[390px]
'use client'

import { useSelector } from 'react-redux';
import SearchAddressModal from '@modals/searchAddressModal';
import useNaverMap from '@hooks/useNaverMap';
import MatjipInputbox from './matjipInputbox';

import ReduxTest from './reduxTest';
import { RootState } from '@store/store';
import { useEffect, useState } from 'react';
import LoadingSpinner01 from '@spinners/loadingSpinner01';
import Header from './header';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import MainService from '@services/main.service';
import MyMatjipList from '@modals/myMatjipList';
import LoadingSpinner03 from '@spinners/loadingSpinner03';

const Main: React.FC = () => {

  const modalControl = useSelector((state: RootState) => state.modalControl);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const [ mapObj, setMapObj ] = useState<naver.maps.Map | undefined | null>(null);
  const [ mapStyle, setMapStyle ] = useState<string>('');

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
        flex flex-col justify-center items-center relative z-10 gap-5
      ">
        <MatjipInputbox/>
        <div id="map" className={`
          z-0 self-center ${ mapStyle }
          laptop:w-[1000px] h-[500px] 
          tablet:w-[700px] h-[500px]
          mobile:w-[350px] h-[400px]
        `}></div> 
        {/* <ReduxTest /> */}
        { modalControl.isSearchAddressModalOpen ? <SearchAddressModal /> : null }
        { modalControl.isMyMatjipListOpen ? <MyMatjipList /> : null }

      </div>
    </div>
  );
};

export default Main;
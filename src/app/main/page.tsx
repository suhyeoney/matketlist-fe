'use client'

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@main/header'));
const MatjipInputbox = dynamic(() => import('@main/matjipInputbox'));
const MyMatjipList = dynamic(() => import('@modals/myMatjipList'));

import SearchAddressModal from '@modals/searchAddressModalNew';
// import SearchAddressModal from '@modals/searchAddressModal';
import LoadingSpinner03 from '@spinners/loadingSpinner03';

import { useDispatch, useSelector } from 'react-redux';
import useNaverMap from '@hooks/useNaverMap';
import { RootState } from '@store/store';
import { useEffect, useState } from 'react';
import useResponsiveMapSize from '@hooks/useResponsiveMapSize';
import { useWindowSize } from '@hooks/useWindowSize';
import SignInService from '@services/signIn.service';
import { accessTokenSetting } from '@store/features/environmentVariables/slice';
import { isEmpty } from '@utils/stringUtils';
import { useRouter } from 'next/navigation';
import FlowingText01 from '@animations/flowingText01';
import { data } from '@utils/dataForNotice/data';
import MatjipSliders from '@sliders/container';

const Main: React.FC = () => {

  const locations = useSelector((state: RootState) => state.location);
  const modalControl = useSelector((state: RootState) => state.modalControl);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const [ mapObj, setMapObj ] = useState<naver.maps.Map | undefined | null>(null);
  const [ mapStyle, setMapStyle ] = useState<string>('');
  const [ mapSize, setMapSize ] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const [ isAuthorized, setAuthorized ] = useState<boolean>(false);
  const [ position, setPosition ] = useState<{ latitude: number; longitude: number }>({ 
    latitude:  locations.arrLocation.length > 0 ? locations.arrLocation[locations.arrLocation.length - 1].latitude : 0, 
    longitude: locations.arrLocation.length > 0 ? locations.arrLocation[locations.arrLocation.length - 1].longitude : 0, 
  });
  // useResponsiveMapSize(mapSize, setMapSize);
  useNaverMap(mapObj, setMapObj, position, isAuthorized);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchAccessToken = async () => {
    const urlParams = new URL(location.href).searchParams;
    const code = urlParams.get('code') ?? '';
    const state = urlParams.get('state') ?? '';
    // console.log(`code : ${ code }, state : ${ state }`);
    if(!location.href.includes('code') || !location.href.includes('state')) {
      console.log('>>>> 콜백 URL이 아님 > 인증된 URL이 아님');
      return false;
    } else {
      console.log('>>>> 콜백 URL임');
      console.log('code', code);
      console.log('state', state);
      const access_token = await SignInService.getTokenNaverApi(code, state);
      if(access_token !== undefined) {
        dispatch(accessTokenSetting(access_token));
      }
      return true;
    }
  };

  useEffect(() => {
    if(!fetchAccessToken()) {
      console.log('>>>> fetchAccessToken : false');
      router.push('/signIn');
      alert('허용되지 않은 접근입니다.');
      setAuthorized(false);
    } else {
      console.log('>>>> fetchAccessToken : true');
      setAuthorized(true);
    }
  }, []);

  useEffect(() => {
    console.log('isAuthorized', isAuthorized);
  }, [ isAuthorized ]);

  useEffect(() => {
    // console.log('mapSize', mapSize);
    setMapSize({
      width: windowSize.width,
      height: windowSize.height,
    });
  }, [ windowSize ]);

  useEffect(() => {
    console.log('>>>> mapObj', mapObj);
    if(mapObj !== null && mapObj !== undefined) {
      if(Object.keys(mapObj).length > 0) {
        setMapStyle('border-[1px] border-gray-200');
      } else {
        setMapStyle('border-0');
      }
    }
  }, [ mapObj ]);

  return (
    <>
    { isAuthorized ?
      <div
        id="mainPage" 
        className={`
          h-screen overflow-hidden animate-showPage
          ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
      `}>
        { Object.keys(mapObj ?? {}).length === 0 ? 
          <>
            <div className="flex justify-center items-center absolute z-20 w-full h-full opacity-50 bg-gray-700"></div>
            <div className="flex justify-center items-center absolute z-40 w-full h-full">
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
        <Header />
        <div className="
          flex flex-col justify-center items-center relative z-10 
          laptop:gap-5
          tablet:gap-5
          mobile:gap-5
          smallest:gap-0
        ">
          <FlowingText01 textList={ data ?? [] } />
          <MatjipInputbox/>
          <div id="map" 
          style={{width: `${ mapSize.width * 0.9 }px`, height: `${ mapSize.height * 0.6 }px`}}
          className={`
            z-0 self-center  w-[90%] h-[90%]
            ${ mapStyle }
          `}></div>
          { modalControl.isSearchAddressModalOpen ? <SearchAddressModal size={ mapSize } /> : null }
          { modalControl.isMyMatjipSlidersOpen ? <MatjipSliders size={ mapSize } setPosition={ setPosition }  /> : null }

        </div>
      </div> : null }
    </>
  );
};

export default Main;

// laptop:w-[1000px] h-[500px] 
// tablet:w-[600px] h-[700px]
// mobile:w-[350px] h-[390px]
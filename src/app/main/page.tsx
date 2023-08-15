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
      <FlowingText01 textList={ data ?? [] } />
      { !modalControl.isMatjipInfoModalOpen ? <Header /> : null }
      { isAuthorized ?
      <div
        id="mainPage" 
        className={`
          overflow-hidden animate-showPage
      `}>
        <div className="
          flex flex-col justify-center items-center relative
        ">
          { Object.keys(mapObj ?? {}).length === 0 ? 
          <div
            style={{width: `${ mapSize.width }px`, height: `${ mapSize.height }px`}} 
            className="flex items-center justify-center absolute z-20">
            <div className="inline-block align-middle leading-normal text-white font-bold">
              <LoadingSpinner03 cubeText={ 'MATKET' } infoText={ '지도 영역을 불러오고 있습니다.' } />
            </div>
          </div> : null
          }
          {/* <div           
            style={{width: `${ mapSize.width }px`, height: `${ mapSize.height }px`}}
          ></div> */}
          { !modalControl.isMatjipInfoModalOpen ? <MatjipInputbox /> : null }
          <div id="map" 
          style={{width: `${ mapSize.width }px`, height: `${ mapSize.height }px`}}
          className={`
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
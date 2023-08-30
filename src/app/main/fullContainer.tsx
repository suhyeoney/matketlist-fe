'use client'

import dynamic from 'next/dynamic';
import localFont from 'next/font/local';

const Header = dynamic(() => import('@main/header'), { ssr: true });
const MatjipInputbox = dynamic(() => import('@main/matjipInputbox'), { ssr: true });

import SearchAddressModal from '@modals/searchAddressModalNew';
import LoadingSpinner03 from '@spinners/loadingSpinner03';
import { useDispatch, useSelector } from 'react-redux';
import useNaverMap from '@hooks/useNaverMap';
import { RootState } from '@store/store';
import { use, useEffect, useState } from 'react';
import { useWindowSize } from '@hooks/useWindowSize';
import SignInService from '@services/signIn.service';
import { accessTokenSetting } from '@store/features/environmentVariables/slice';
import { useRouter } from 'next/navigation';
import FlowingText01 from '@animations/flowingText01';
import { data } from '@utils/dataForNotice/data';
import MatjipSliders from '@sliders/container';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import FloatedSlideUp from '@floats/slideUp';
import { getLocation } from '@store/features/location/slice';

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const YeongdeokBlueroad = localFont({
  src: '../assets/fonts/YeongdeokBlueroad.woff'
});

const FullContainer: React.FC = () => {

  const locations = useSelector((state: RootState) => state.location);
  const modalControl = useSelector((state: RootState) => state.modalControl);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const [ mapObj, setMapObj ] = useState<naver.maps.Map | undefined | null>(null);
  const [ mapStyle, setMapStyle ] = useState<string>('');
  const [ isAuthorized, setAuthorized ] = useState<boolean>(false);
  const [ isInfoFloatBtnAreaOpen, setInfoFloatBtnAreaOpen ] = useState<boolean>(false);
  const [ info, selectInfo ] = useState<SearchMatjipInfo>();
  const [ position, setPosition ] = useState<{ latitude: number; longitude: number }>({ 
    latitude:  locations.arrLocation.length > 0 ? locations.arrLocation[locations.arrLocation.length - 1].latitude : 0, 
    longitude: locations.arrLocation.length > 0 ? locations.arrLocation[locations.arrLocation.length - 1].longitude : 0, 
  });

  useNaverMap(
    mapObj, 
    setMapObj, 
    position, 
    isAuthorized, 
    selectInfo, 
    setInfoFloatBtnAreaOpen
  );

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
      // console.log('code', code);
      // console.log('state', state);
      const result = await SignInService.getTokenNaverApi(code, state);
      if(result !== undefined) {
        dispatch(accessTokenSetting(result));
      }
      return true;
    }
  };

  const fetchLocation = async () => {
    console.log('>>>>fetchLocation', environmentVariables.userId);
    dispatch(getLocation({ 
      registerUserId: environmentVariables.userId,
      regionCode: ''
    }));
  };

  const floatedSlideUpContent = 
    <>
      <div className={`
        ${ YeongdeokBlueroad.className }
      `}>
        <table
          // style={{ width: `${ windowSize.width * (windowSize.width >= 768 ? 0.5 : 0.95) }px` }} 
          className="
            p-2 border border-gray-400 rounded-[3px] cursor-default
            mobile:text-[12px]
            smallest:text-[10px]
        ">
          <tbody 
            className="divide-y-2 divide-gray-200">
            <tr>
              <td className="p-2 font-bold"><div className="whitespace-nowrap">🍲 상호명</div></td>
              <td className="p-2 truncate ..."><div className="">{ info?.name }</div></td>
              <td className="p-2 font-bold"><div className="whitespace-nowrap">🍲 주소</div></td>
              <td className="p-2 truncate ..."><div className="">{ info?.address }</div></td>
            </tr>
            <tr>
              <td className="p-2 font-bold"><div className="whitespace-nowrap">🍲 대표전화번호</div></td>
              <td className="p-2 truncate ..."><div className="">{ info?.phoneNumber }</div></td>
              <td className="p-2 font-bold"><div className="whitespace-nowrap">🍲 대표웹사이트</div></td>
              <td className="p-2 truncate ..."><div className="">
                <a href={ info?.website } target="_blank">{ info?.website }</a></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>;

  const floatedSlideUpButton =
    <>
      <div 
        className={`
        flex flex-row items-center justify-center gap-2 w-full
        ${ Tenada.className }
      `}>
        <button 
          onClick={ () => closeFloatedSlideUpArea() }
          style={{ width: `${ windowSize.width * (windowSize.width >= 768 ? 0.5 : 0.95) }px` }} 
          className="border border-gray-500 rounded-[3px] p-1"
        >돌아가기</button>
      </div>
    </>;

  const closeFloatedSlideUpArea = () => {
    // document.querySelector('#infoFloatBtnArea')?.classList.replace('animate-slideUp', 'animate-slideDown');
    setTimeout(() => {
      setInfoFloatBtnAreaOpen(false);
      selectInfo(undefined);
    }, 0);
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
    if(environmentVariables.userId.length > 0) {
      fetchLocation();
    }
  }, [ environmentVariables.accessToken, environmentVariables.userId ]);

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
    <div className={`
    overflow-x-hidden overflow-y-hidden 
      ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
    `}>
      <FlowingText01 textList={ data ?? [] } />
      <Header />

      { isAuthorized ?
      <div
        id="mainPage" 
      >
        <div className="
          flex flex-col justify-center items-center relative
        ">
          { Object.keys(mapObj ?? {}).length === 0 ? 
          <>
            <div
              style={{width: `${ windowSize.width }px`, height: `${ windowSize.height }px`}} 
              className="flex items-center justify-center absolute z-20 top-0 bg-gray-300 opacity-[80%]"
            >
              <div className="absolute z-[25]">
                <div className="inline-block align-middle leading-normal text-white font-bold">
                  <LoadingSpinner03 cubeText={ 'MATKET' } infoText={ '지도 영역을 불러오고 있습니다.' } />
                </div>
              </div>
            </div>
            <div style={{width: `${ windowSize.width }px`, height: `${ windowSize.height }px`}}></div>
          </> : null }

          <MatjipInputbox />
          <div id="map" 
            style={{width: `${ windowSize.width }px`, height: `${ windowSize.height }px`}}
            className={`
              absolute z-0 bottom-0
              ${ mapStyle }
          `}></div>

          { modalControl.isSearchAddressModalOpen ? <SearchAddressModal size={ windowSize } /> : null }
          { modalControl.isMyMatjipSlidersOpen ? <MatjipSliders size={ windowSize } setPosition={ setPosition }  /> : null }
        </div>
      </div> : null 
      }

      { isInfoFloatBtnAreaOpen && info !== undefined ? 
        <FloatedSlideUp 
          idString={ 'infoFloatBtnArea' } 
          contentArea={ floatedSlideUpContent } 
          buttonArea={ floatedSlideUpButton }
        /> : null
      }
    </div>
  );
};

export default FullContainer;
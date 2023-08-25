'use client'

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import image1 from '@assets/icons/you-are-here.png';
import image2 from '@assets/icons/i-like-it.png';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { setMyMatjipSlidersOpen } from '@store/features/modalControl/slice';
import image3 from '@assets/icons/my-matjip-list.png';
import { moveToMapToggle } from '@store/features/environmentVariables/slice';

const NaverMap = (
    mapObj: naver.maps.Map | undefined | null, 
    setMapObj: React.Dispatch<React.SetStateAction<naver.maps.Map | undefined | null>>,
    position: { latitude: number; longitude: number },
    isAuthorized: boolean,
    selectInfo: React.Dispatch<React.SetStateAction<SearchMatjipInfo | undefined>>,
    setInfoFloatBtnAreaOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

  const [ arrMatjipLocation, setArrMatjipLocation ] = useState<SearchMatjipInfo[]>([]);
  const [ markersList, setMarkersList ] = useState<any>([]); // 해당 모듈 내부에서 로컬용으로 사용할 마커 집합. 추가 / 제거 모두 구현되어야 함!
  const [ badgeObj, setBadgeObj ] = useState<naver.maps.CustomControl | undefined | null>(null);

  const location = useSelector((state: RootState) => state.location);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  const modalControl = useSelector((state: RootState) => state.modalControl);

  const dispatch = useDispatch();

  const setMarkerInfoHtmlString =  (e: SearchMatjipInfo) => {
    return  [
      '<div class="absolute z-[45] border-2 border-yellow-400 rounded-[20px]">',
      '<table class="table text-[13px] font-[\'NanumGothic\'] w-[200px] h-[350px]">',
      '<tbody>',
      '<tr>',
      '<td class="font-bold"><div class="w-[70px] whitespace-normal">🍲 상호명</div></td>',
      `<td><div class="w-[130px] whitespace-normal">${ e.name }</div></td>`,
      '</tr>',
      '<tr>',
      '<td class="font-bold"><div class="w-[70px] whitespace-normal">🍲 주소</div></td>',
      `<td><div class="w-[130px] whitespace-normal">${ e.address }</div></td>`,
      '</tr>',
      '<tr>',
      '<td class="font-bold"><div class="w-[70px] whitespace-normal">🍲 대표전화번호</div></td>',
      `<td><div class="w-[130px] whitespace-normal">${ e.phoneNumber }</div></td>`,
      '</tr>',
      '<tr>',
      '<td class="font-bold"><div class="w-[70px] whitespace-normal">🍲 대표웹사이트</div></td>',
      `<td><div class="w-[130px] truncate ..."><a href=${ e.website } target="_blank">${ e.website }</a></div></td>`,
      '</tr>',
      '<tr>',
      '<td colspan="2">',
      // `<button id="btn-remove" class="font-bold btn btn-error float-left w-[48%]">맛집 목록에서 해제</button>`,
      `<button id="btn-close" class="font-bold btn btn-active btn-accent w-full">닫기</button>`,
      '</td>',
      '</tr>',
      '</tbody>',
      '</table>',
      '</div>'
    ].join('');
  };

  useEffect(() => {
    console.log('arrLocation', location.arrLocation);
    setArrMatjipLocation(location.arrLocation);
  }, [ location.arrLocation ]);

  useEffect(() => {
    // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
    if(isAuthorized) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        window.alert('기본 위치로 설정합니다.');
        setMyLocation({ latitude: 37.4862618, longitude: 127.1222903 });
      }
    }
  }, [ isAuthorized ]);

  useEffect(() => {
    if(badgeObj !== undefined && badgeObj !== null) {
      naver.maps.Event.once(mapObj, 'init_stylemap', () => {
        badgeObj.setMap(mapObj);
      });
      naver.maps.Event.addDOMListener(badgeObj.getElement(), 'click', () => {
        if(arrMatjipLocation.length < 1) {
          alert('맛집 목록이 비어있어요... :( ');
          return;
        }
        dispatch(setMyMatjipSlidersOpen(true));
      });
    }
  }, [ badgeObj ]);

  useEffect(() => {
    if(isAuthorized) {
      if (typeof myLocation !== 'string') {
        // 현재 위치 추적
        let currentPosition = [ myLocation.latitude, myLocation.longitude ];

        // Naver Map 생성
        const map = mapRef.current = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
          zoom: 11,
          zoomControl: true,
          mapDataControl: true,
          scaleControl: false,
          logoControl: false,
          zoomControlOptions: {
            position: naver.maps.Position.LEFT_CENTER
          },
          draggable: true,
          pinchZoom: true,
          scrollWheel: true,
          keyboardShortcuts: true,
          disableDoubleTapZoom: false,
          disableDoubleClickZoom: false,
          disableTwoFingerTapZoom: false
        });

        setMapObj(map);

        mapRef.current = new naver.maps.Marker({
          position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
          icon: {
            url: image1.src,
            size: new naver.maps.Size(30, 30), // 마커 크기
            scaledSize: new naver.maps.Size(30, 30), // 아이콘 크기
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(11, 10)
          },
          map: map
        });

        let CURRENT_MATJIP_LIST_HTML_ARRAY = [
          '<div id="list-badge" class="flex items-center justify-center p-2 hover:cursor-pointer">',
          `<div class="absolute z-[15]  right-2 ">`,
          `<div class="w-16 h-16 bg-white rounded-[15px] shadow-2xl">`,
          `<img src=${ image3.src } class="w-15 h-15" />`,
          '</div>',
          '</div>',
          '</div>',
        ];
        let PING_HTML_ARRAY = [
          `<div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-red-400">`,
          `<span class="absolute z-[5] right-[5px] text-[10px] text-black font-bold">`,
          `${ location.cntLocation > 10 ? '10+' : location.cntLocation }</span>`,
          `</div>`,
          `<div id="list-ping" class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-red-400 animate-ping">`,
          `</div>`
        ].join('');

        let totalPingHtmlString = '';

        if(arrMatjipLocation.length > 0) {
          totalPingHtmlString = [
            ...CURRENT_MATJIP_LIST_HTML_ARRAY.slice(0, 4),
            PING_HTML_ARRAY,
            ...CURRENT_MATJIP_LIST_HTML_ARRAY.slice(4),
          ].join('');
        } else {
          totalPingHtmlString = CURRENT_MATJIP_LIST_HTML_ARRAY.join('');
        }
        if(badgeObj === undefined || badgeObj === null) {
          const btnList = mapRef.current = new naver.maps.CustomControl(totalPingHtmlString, {
            position: naver.maps.Position.RIGHT_CENTER
          });
          naver.maps.Event.once(map, 'init_stylemap', () => {
            btnList.setMap(map);
          });
          setBadgeObj(btnList);
        }
        if(badgeObj !== undefined && badgeObj !== null) {
          naver.maps.Event.once(map, 'init_stylemap', () => {
            badgeObj.setMap(null);
          });
          const btnList = mapRef.current = new naver.maps.CustomControl(totalPingHtmlString, {
            position: naver.maps.Position.RIGHT_CENTER
          });
          naver.maps.Event.once(map, 'init_stylemap', () => {
            btnList.setMap(map);
          });
          setBadgeObj(btnList);
        }
        // TODO : 복수개의 위경도 좌표를 DB에 저장되어 있다고 가정하고 HTML을 먼저 pre-rendering 후
        // 해당 데이터를 for문에 의해 fetch 하는 방식으로 진행해보려고 함. Static Site Generation
        
        arrMatjipLocation.forEach((x: SearchMatjipInfo, index: number) => {
          const marker = mapRef.current = new naver.maps.Marker({
            position: new naver.maps.LatLng(x.latitude, x.longitude),
            clickable: true,
            animation: !environmentVariables.moveToMap  && index === arrMatjipLocation.length -1 ? 
              naver.maps.Animation.DROP : environmentVariables.moveToMap && x.latitude === position.latitude && x.longitude === position.longitude ? 
              naver.maps.Animation.BOUNCE : undefined,
            icon: {
              url: image2.src,
              size: new naver.maps.Size(30, 30), // 마커 크기
              scaledSize: new naver.maps.Size(30, 30), // 아이콘 크기
              origin: new naver.maps.Point(0, 0),
              // anchor: new naver.maps.Point(11, 35)
            },
            map: map
          });

          // Marker onClick 이벤트 부여
          const infowindow = new naver.maps.InfoWindow({
            content: setMarkerInfoHtmlString(x),
            borderWidth: 0,
            borderColor: '#2db400',
            pixelOffset: new naver.maps.Point(20, -20),
            disableAnchor: true,
            backgroundColor: 'transparent',
          });

          // setMarkersList([ ...markersList, { ...infowindow, placeId: x.placeId }]);

          naver.maps.Event.addListener(marker, 'click', (e: React.MouseEvent) => {
            console.log('marker clicked', marker);
            const target = location.arrLocation.find((x: SearchMatjipInfo) => 
            x.latitude === marker.getPosition().y && x.longitude === marker.getPosition().x);
            console.log('target', target);
            selectInfo(target);
            setInfoFloatBtnAreaOpen(true);
            // if (infowindow.getMap()) {
            //   infowindow.close();
            // } else { // 마커 클릭 시, > Popup Open
            //   infowindow.open(map, marker);
            //   dispatch(setMatjipInfoModalOpen(true));
            //   const elementBtnClose = document.querySelector('#btn-close');
            //   const elementBtnRemove = document.querySelector('#btn-remove');
            //   if(elementBtnClose !== null && elementBtnClose !== undefined) {
            //     elementBtnClose?.addEventListener('click', () => {
            //       infowindow.close();
            //       dispatch(setMatjipInfoModalOpen(false));
            //     });
            //   }
            //   if(elementBtnRemove !== null && elementBtnRemove !== undefined) {
            //     elementBtnRemove?.addEventListener('click', () => {
            //       if(confirm('정말로 해제하시겠어요?')) {
            //         dispatch(removeLocation(x.placeId));
            //         setMarkersList(markersList.filter((e: any) => e.placeId !== x.placeId));
            //       } else {
            //         return;
            //       }
            //       infowindow.close();
            //       dispatch(setMatjipInfoModalOpen(false));
            //     });
            //   }
            // }
          });

          if(!environmentVariables.moveToMap && index === arrMatjipLocation.length - 1) {
            map.setCenter(new naver.maps.LatLng(x.latitude, x.longitude));
          }
        });
        if(environmentVariables.moveToMap) {
          map.setCenter(new naver.maps.LatLng(position.latitude, position.longitude));
          dispatch(moveToMapToggle(false));
        }
      }
    } else {}
  }, [ myLocation, arrMatjipLocation, position ]);
  
  return {
    myLocation,
  };
}

export default NaverMap;
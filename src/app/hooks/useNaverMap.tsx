'use client'

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { InfoWindow, Marker } from 'react-naver-maps';
import image1 from '@assets/icons/you-are-here.png';
import image2 from '@assets/icons/like-it.png';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { removeLocation } from '@features/location/locationSlice';
import { setMyMatjipListOpen } from '@features/modalControl/modalControlSlice';
import image3 from '@assets/icons/my-matjip-list.png';


const NaverMap = (setMapObj: React.Dispatch<React.SetStateAction<object>>) => {

  const mapRef = useRef<HTMLElement | null | any>(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

  const [ arrMatjipLocation, setArrMatjipLocation ] = useState<SearchMatjipInfo[]>([]);
  const [ markersList, setMarkersList ] = useState<any>([]); // 해당 모듈 내부에서 로컬용으로 사용할 마커 집합. 추가 / 제거 모두 구현되어야 함!
  // const [ iconListStyle, setIconListStyle ] = useState<string>('');

  const location = useSelector((state: RootState) => state.location);

  const dispatch = useDispatch();

  const setMarkerInfoHtmlString =  (e: SearchMatjipInfo) => {

    return  [
      '<div class="border-solid border-2 rounded-[20px]">',
      '<table class="table text-sm font-[\'NanumGothic\'] w-[250px]">',
      '<tbody>',
      '<tr>',
      '<td class="font-bold"><div class="w-[70px] whitespace-normal">🍲 상호명</div></td>',
      `<td><div class="w-[180px] whitespace-normal">${ e.name }</div></td>`,
      '</tr>',
      '<tr>',
      '<td class="font-bold"><div class="w-[70px] whitespace-normal">🍲 주소</div></td>',
      `<td><div class="w-[180px] whitespace-normal">${ e.address }</div></td>`,
      '</tr>',
      '<tr>',
      '<td class="font-bold"><div class="w-[70px] whitespace-normal">🍲 대표전화번호</div></td>',
      `<td><div class="w-[180px] whitespace-normal">${ e.phoneNumber }</div></td>`,
      '</tr>',
      '<tr>',
      '<td class="font-bold"><div class="w-[70px] whitespace-normal">🍲 대표웹사이트</div></td>',
      `<td><div class="w-[180px] truncate ..."><a href=${ e.website } target="_blank">${ e.website }</a></div></td>`,
      '</tr>',
      '<tr>',
      '<td colspan="2">',
      `<button id="btn-remove" class="font-bold btn btn-error float-left w-[48%]">맛집 목록에서 해제</button>`,
      `<button id="btn-close" class="font-bold btn btn-active btn-accent float-right w-[48%]">닫기</button>`,
      '</td>',
      '</tr>',
      '</tbody>',
      '</table>',
      '</div>'
    ].join('');
  };

  // 

  useEffect(() => {
    // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
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
  }, []);

  useEffect(() => {
    console.log(location.arrLocation);
    setArrMatjipLocation([ ...location.arrLocation ]);
  }, [ location.arrLocation ]);

  useEffect(() => {
    console.log(markersList);
  }, [ markersList ]);

  const closeOtherMarkerInfos = () => {
    markersList.forEach((m: any) => {
      console.log(m.getIcon());
      const sizeX = m.getIcon().size.width;
      const sizeY = m.getIcon().size.height;
      if(sizeX !== 30 && sizeY !== 30) { // Default 사이즈인 30x30 이 아니면, Default로 크기를 되돌림.
        m.setIcon({
          url: image2.src,
          size: new naver.maps.Size(30, 30), // 마커 크기
          scaledSize: new naver.maps.Size(30, 30), // 아이콘 크기
          origin: new naver.maps.Point(0, 0),
          // anchor: new naver.maps.Point(11, 35)
        });
      }
    });
  };

  useEffect(() => {
    if (typeof myLocation !== 'string') {

      // 현재 위치 추적
      let currentPosition = [ myLocation.latitude, myLocation.longitude ];

      // Naver Map 생성
      const map = mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: true,
        mapDataControl: true,
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

    // const btnCurrentMatjipListHtmlString = '<button id="btn-list" class="font-[\'NanumGothic\'] bg-yellow-500 border-[1px] border-yellow-300 text-sky-500 rounded-md  p-2 m-2">내 맛집 목록</button>';
    const btnCurrentMatjipListHtmlString = `<button id="btn-my-matjip-list" class="w-[50px] h-[50px] m-5 rounded-md bg-white"><img src=${ image3.src } /></button>`;
    const btnList = mapRef.current = new naver.maps.CustomControl(btnCurrentMatjipListHtmlString, {
      position: naver.maps.Position.RIGHT_TOP
    });
    naver.maps.Event.once(map, 'init_stylemap', () => {
      btnList.setMap(map);
    });

    naver.maps.Event.addDOMListener(btnList.getElement(), 'click', () => {
      console.log('>>>> Opens my current matket list');
      dispatch(setMyMatjipListOpen(true));
      // TODO : 등록되어 있는 목록 모달 개발 예정
   });

    // const elementBtnMyMatjipList = document.querySelector('#btn-my-matjip-list');
    // const CLASS_ANIMATE_BOUNCE = 'animate-bounce';
    // if(arrMatjipLocation.length > 0) {
    //   elementBtnMyMatjipList?.classList.add(CLASS_ANIMATE_BOUNCE);
    // } else {
    //   elementBtnMyMatjipList?.classList.remove(CLASS_ANIMATE_BOUNCE);
    // }

    // TODO : 복수개의 위경도 좌표를 DB에 저장되어 있다고 가정하고 HTML을 먼저 pre-rendering 후
    // 해당 데이터를 for문에 의해 fetch 하는 방식으로 진행해보려고 함. Static Site Generation

    arrMatjipLocation.forEach((x: SearchMatjipInfo, index: number) => {
      const marker = mapRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(x.latitude, x.longitude),
        clickable: true,
        animation: index === arrMatjipLocation.length -1 ? naver.maps.Animation.DROP : undefined,
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
        // disableAnchor: true,
        
        backgroundColor: 'transparent',
      });

      setMarkersList([ ...markersList, { ...infowindow, placeId: x.placeId }]);

      
    
      naver.maps.Event.addListener(marker, 'click', (e: React.MouseEvent) => {
        // marker.setIcon({
        //   url: image2.src,
        //   size: new naver.maps.Size(30, 30), // 마커 크기
        //   scaledSize: new naver.maps.Size(30, 30), // 아이콘 크기
        //   origin: new naver.maps.Point(0, 0),
        //   anchor: new naver.maps.Point(11, 35)
        // });

        if (infowindow.getMap()) {
          console.log('close', infowindow);
          infowindow.close();
        } else { // 마커 클릭 시, > Popup Open
          // closeOtherMarkerInfos();
          console.log('open');
          infowindow.open(map, marker);

          const elementBtnClose = document.querySelector('#btn-close');
          const elementBtnRemove = document.querySelector('#btn-remove');
          if(elementBtnClose !== null && elementBtnClose !== undefined) {
            elementBtnClose?.addEventListener('click', () => {
              infowindow.close();
            });
          }
          if(elementBtnRemove !== null && elementBtnRemove !== undefined) {
            elementBtnRemove?.addEventListener('click', () => {
              if(confirm('정말로 해제하시겠어요?')) {
                dispatch(removeLocation(x.placeId));
                setMarkersList(markersList.filter((e: any) => e.placeId !== x.placeId));
              } else {
                return;
              }
              infowindow.close();
            });
          }
          // marker.setIcon({
          //   url: image2.src,
          //   size: new naver.maps.Size(50, 50), // 마커 크기
          //   scaledSize: new naver.maps.Size(50, 50), // 아이콘 크기
          //   origin: new naver.maps.Point(0, 0),
          //   anchor: new naver.maps.Point(11, 35)
          // });
        }
      });

      if(index === arrMatjipLocation.length - 1) {
        map.setCenter(new naver.maps.LatLng(x.latitude, x.longitude));
      }
    });

    }
  }, [ myLocation, arrMatjipLocation ]);

  return {
    myLocation,
  };
}

export default NaverMap;
'use client'

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Marker } from 'react-naver-maps';
import image1 from '@assets/icons/you-are-here.png';
import image2 from '@assets/icons/like-it.png';
import { SearchMatjipInfo } from '@dataTypes/Matjip';

const NaverMap = (setMapObj: React.Dispatch<React.SetStateAction<object>>) => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

  const [ arrMatjipLocation, setArrMatjipLocation ] = useState<SearchMatjipInfo[]>([]);
  const [ markersList, setMarkersList ] = useState<any>([]); // 해당 모듈 내부에서 로컬용으로 사용할 마커 집합. 추가 / 제거 모두 구현되어야 함!

  const location = useSelector((state: RootState) => state.location);

  const setMarkerInfoHtmlString =  (e: SearchMatjipInfo) => {
    return  [
      '<div class="border-solid border-2 rounded-[20px]">',
      '<table class="table text-sm font-[\'NanumGothic\']">',
      '<tbody>',
      '<tr>',
      '<td class="font-bold">🍲 상호명</td>',
      `   <td>${ e.name }</td>`,
      '</tr>',
      '<tr>',
      '<td class="font-bold">🍲 주소</td>',
      `   <td>${ e.address }</td>`,
      '</tr>',
      '<tr>',
      '<td class="font-bold">🍲 대표전화번호</td>',
      `   <td>${ e.phoneNumber }</td>`,
      '</tr>',
      '<tr>',
      '<td class="font-bold">🍲 대표웹사이트</td>',
      `       <td><a href=${ e.website }" target="_blank">${ e.website }</a></td>`,
      '</tr>',
      '</tbody>',
      '</table>',
      '</div>'
    ].join('');
  };

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
          anchor: new naver.maps.Point(11, 35)
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

    // TODO : 복수개의 위경도 좌표를 DB에 저장되어 있다고 가정하고 HTML을 먼저 pre-rendering 후
    // 해당 데이터를 for문에 의해 fetch 하는 방식으로 진행해보려고 함. Static Site Generation

    arrMatjipLocation.forEach((e: SearchMatjipInfo, index: number) => {
      const marker = mapRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(e.latitude, e.longitude),
        clickable: true,
        animation: index === arrMatjipLocation.length -1 ? naver.maps.Animation.DROP : undefined,
        icon: {
          url: image2.src,
          size: new naver.maps.Size(30, 30), // 마커 크기
          scaledSize: new naver.maps.Size(30, 30), // 아이콘 크기
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(11, 35)
        },
        map: map
      });

      setMarkersList([ ...markersList, marker ]);

      // Marker onClick 이벤트 부여
      const infowindow = new naver.maps.InfoWindow({
        content: setMarkerInfoHtmlString(e),
        borderWidth: 0,
        borderColor: '#2db400',
        // disableAnchor: true,
        
        backgroundColor: 'transparent',
      });

      
    
      naver.maps.Event.addListener(marker, 'click', (e: React.MouseEvent) => {
        // marker.setIcon({
        //   url: image2.src,
        //   size: new naver.maps.Size(30, 30), // 마커 크기
        //   scaledSize: new naver.maps.Size(30, 30), // 아이콘 크기
        //   origin: new naver.maps.Point(0, 0),
        //   anchor: new naver.maps.Point(11, 35)
        // });

        if (infowindow.getMap()) {
          console.log('close');
          infowindow.close();
        } else { // 마커 클릭 시, > Popup Open
          // closeOtherMarkerInfos();
          console.log('open');
          infowindow.open(map, marker);
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
        map.setCenter(new naver.maps.LatLng(e.latitude, e.longitude));
      }
    });

    }
  }, [ myLocation, arrMatjipLocation ]);

  return {
    myLocation,
  };
}

export default NaverMap;
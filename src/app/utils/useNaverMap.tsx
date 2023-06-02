'use client'

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Marker } from 'react-naver-maps';

type MatjipLocation = {
  // id: number,
  latitude: number,
  longitude: number
};

const NaverMap = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

  const [ arrMatjipLocation, setArrMatjipLocation ] = useState<MatjipLocation[]>([]);

  const location = useSelector((state: RootState) => state.location);

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
    setArrMatjipLocation([ ...location.arrLocation ]);
  }, [ location.arrLocation ]);

  useEffect(() => {

    if (typeof myLocation !== 'string') {
      // 현재 위치 추적
      let currentPosition = [myLocation.latitude, myLocation.longitude];

      // Naver Map 생성
      const map = mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: true,
        mapDataControl: true,
      });
      mapRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        icon: {
          url: './icons/you-are-here.png',
          size: new naver.maps.Size(50, 50), // 마커 크기
          scaledSize: new naver.maps.Size(50, 50), // 아이콘 크기
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(11, 10)
        },
        map: map
    });

    // TODO : 복수개의 위경도 좌표를 DB에 저장되어 있다고 가정하고 HTML을 먼저 pre-rendering 후
    // 해당 데이터를 for문에 의해 fetch 하는 방식으로 진행해보려고 함. Static Site Generation

    arrMatjipLocation.forEach((e: MatjipLocation, index: number) => {
      mapRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(e.latitude, e.longitude),
        clickable: true,
        animation: index === arrMatjipLocation.length -1 ? naver.maps.Animation.DROP : undefined,
        icon: {
          url: './icons/like-it.png',
          size: new naver.maps.Size(50, 50), // 마커 크기
          scaledSize: new naver.maps.Size(50, 50), // 아이콘 크기
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(11, 35)
        },
        map: map
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
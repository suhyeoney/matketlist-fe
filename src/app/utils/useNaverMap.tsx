'use client'

import { useEffect, useRef, useState } from 'react';

type MatjipLocation = {
  latitude: number,
  longitude: number
};

const NaverMap = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

  const [ arrMatjipLocation, setArrMatjipLocation ] = useState<MatjipLocation[]>([]);

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
    
    setArrMatjipLocation([
      ...arrMatjipLocation,
      { latitude: 37.4862620, longitude: 127.1222903 }
    ]);

    if (typeof myLocation !== 'string') {
      // 현재 위치 추적
      let currentPosition = [myLocation.latitude, myLocation.longitude];

      let currentPosition2 = [ 37.4862622, 127.1222909 ];

      // Naver Map 생성
      console.log(myLocation);
      const map = mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: true,
      });
      mapRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        map: map
    });

    // TODO : 복수개의 위경도 좌표를 DB에 저장되어 있다고 가정하고 HTML을 먼저 pre-rendering 후
    // 해당 데이터를 for문에 의해 fetch 하는 방식으로 진행해보려고 함. Static Site Generation

    arrMatjipLocation.forEach((e: MatjipLocation) => {
      console.log(e);
      mapRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(e.latitude, e.longitude),
        map: map
      });
    });

    }
  }, [myLocation]);

  return {
    myLocation,
  };
}

export default NaverMap;
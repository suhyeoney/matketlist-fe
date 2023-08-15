'use client'

import Image from 'next/image';
import localFont from 'next/font/local';

import image1 from '@assets/icons/notice-megaphone.png';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@hooks/useWindowSize';

interface NoticeType {
  typeId: number,
  content: string,
};

interface EntryFlagType {
  in: boolean,
  out: boolean,
};

interface FlowingText01Props {
  textList: NoticeType[],
};

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const YeongdeokSea = localFont({
  src: '../assets/fonts/YeongdeokSea.woff'
});

const FlowingText01: React.FC<FlowingText01Props> = ({ textList }) => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  const [ divBgColor, setDivBgColor ] = useState<string>('bg-white');
  const [ noticeId, setNoticeId ] = useState<number>(0);
  const [ entryFlag, setEntryFlag ] = useState<EntryFlagType>({ in: false, out: false });

  const window = useWindowSize();

  const observeNotice = () => {
    const noticeArea = document.querySelector(`#noticeArea`);
    const notice = document.querySelector(`#notice`) as Element;
    let entryTheHighest = false; // ratio가 최고점 1을 찍었는지 여부
    let entryTheLowest = false; // ratio가 최저점 0을 찍었는지 여부
    const io = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        // console.log('ratio', entries[0].intersectionRatio);
        if(entries[0].intersectionRatio  >= 0.9) {
          entryTheHighest = true;
        }
        if(entryTheHighest && entries[0].intersectionRatio === 0) {
          entryTheLowest = true;
        }
        if(entryTheHighest && entryTheLowest) {
          entryTheHighest = false;
          entryTheLowest = false;
          setNoticeId(noticeId => noticeId === textList.length - 1 ? 0 : noticeId + 1);
        }
      }, 
      { 
        threshold: [ ...Array(100).keys() ].map(i => i / 100), 
        root: noticeArea, 
        rootMargin: document.body.offsetWidth >= 700 ? '0px 0px 0px 0px' : '0px 0px 0px 200px' 
    });

    io.observe(notice);
  };

  const noticeStyle = (typeId: number) => {
    switch(typeId) {
      case 1:
        return 'text-purple-400';
      case 2:
        return 'text-blue-400';
    }
  };

  useEffect(() => {
    observeNotice();
  }, []);

  useEffect(() => {
    if(environmentVariables.backgroundMode) {
      setDivBgColor('bg-white');
    } else {
      setDivBgColor('bg-[#2A303C]');
    }
  }, [ environmentVariables.backgroundMode ]);

  return (
    <div className={`
      relative flex flex-row items-center justify-center h-full
      ${ divBgColor }
    `}>
      <div className="flex items-center justify-center self-center">
        <div id="noticeArea" 
          className="
          absolute z-10 w-full h-full
        ">
          <div className="flex flex-row items-center justify-center">
            <div className={`
              w-[80px] h-[30px] absolute z-[12] left-0
              flex flex-row items-center justify-center gap-1 px-2 
              ${ environmentVariables.backgroundMode ? 'bg-gray-100' : 'bg-gray-400' }
            `}>
              <Image
                src={ image1.src }
                alt=""
                width="25"
                height="25"
                className="w-[25px] h-[25px]"
              />
              <div className="">
                <span className={ `
                  ${ Tenada.className }
                  ${ environmentVariables.backgroundMode ? 'text-black' : 'text-[#2A303C]' }
                `}>알림</span>
              </div>
            </div>
            <div 
              id="noticeWrapper"
              className={`
              w-full h-[30px]
              ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
            `}>
                <p 
                  id={`notice`}
                  className={`
                  ${ YeongdeokSea.className }
                  ${ environmentVariables.backgroundMode ? 'text-black' : 'text-white' }
                  ${ window.width >= 768 ? 'animate-[flowing_60s_infinite]' : 'animate-[flowing_30s_infinite]' }
                  h-[30px]
                  font-bold
                  whitespace-nowrap
                  text-black
              `}>{ textList[noticeId]['content'] }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    
};

export default FlowingText01;

// ${ noticeStyle(textList[noticeId]['typeId']) }
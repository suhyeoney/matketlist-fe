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

const AppleSDGothicNeoM = localFont({
  src: '../assets/fonts/AppleSDGothicNeoM.woff'
});

const FlowingText01: React.FC<FlowingText01Props> = ({ textList }) => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  const [ divBgColor, setDivBgColor ] = useState<string>('bg-white');
  const [ noticeId, setNoticeId ] = useState<number>(0);
  // const [ entryFlag, setEntryFlag ] = useState<EntryFlagType>({ in: false, out: false });

  const window = useWindowSize();

  const observeNotice = () => {
    const noticeArea = document.querySelector(`#noticeArea`);
    const notice = document.querySelector(`#notice`) as Element;
    let entryTheHighest = false; // ratio가 최고점 1을 찍었는지 여부
    let entryTheLowest = false; // ratio가 최저점 0을 찍었는지 여부
    const io = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        console.log('entries', entries[0]);
        // console.log('ratio', entries[0].intersectionRatio);
        // if(entries[0].intersectionRatio  >= 0.9) {
        //   entryTheHighest = true;
        // }
        // if(entryTheHighest && entries[0].intersectionRatio === 0) {
        //   entryTheLowest = true;
        // }
        // if(entryTheHighest && entryTheLowest) {
        //   entryTheHighest = false;
        //   entryTheLowest = false;
        // }
        setNoticeId(noticeId => noticeId === textList.length - 1 ? 0 : noticeId + 1);
      }, 
      { 
        threshold: 0, 
        root: null, 
        rootMargin: '0px 0px 0px 0px',
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
    <div 
      className={`
        relative flex flex-row items-center justify-center 
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
              border-l-[3px] border-t-[3px] border-b-[3px] border-r-0 border-gray-300
              ${ environmentVariables.backgroundMode ? 'bg-gray-300' : 'bg-gray-300' }
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
              w-full h-[30px] border-[3px] border-gray-300
              ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
            `}>
                <p 
                  id={`notice`}
                  className={`
                  ${ AppleSDGothicNeoM.className }
                  ${ environmentVariables.backgroundMode ? 'text-black' : 'text-white' }
                  animate-flowing
                  h-[30px]
                  font-bold
                  whitespace-nowrap
                  text-black
                  cursor-default
              `}>{ textList[noticeId]['content'] }</p>
            </div>
            <div className={`
              w-[3px] h-[30px] absolute z-[12] right-0 bg-gray-300
            `}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    
};

export default FlowingText01;

// ${ noticeStyle(textList[noticeId]['typeId']) }
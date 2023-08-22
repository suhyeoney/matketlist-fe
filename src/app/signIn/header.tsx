'use client'

import localFont from 'next/font/local';
import dynamic from 'next/dynamic';

import { useWindowSize } from '@hooks/useWindowSize';
import { useEffect, useState } from 'react';

const StaticIPhone = dynamic(() => import('@signIn/staticIPhone'), { ssr: true });
const DynamicIPhone = dynamic(() => import('@signIn/dynamicIPhone'), { ssr: true });

const NotoSansKR_Light = localFont({
  src: '../assets/fonts/NotoSansKR-Light.woff'
});

const NotoSansKR_Bold = localFont({
  src: '../assets/fonts/NotoSansKR-Bold.woff'
});

const AppleSDGothicNeoM = localFont({
  src: '../assets/fonts/AppleSDGothicNeoM.woff'
});

const Header: React.FC = () => {

  const windowSize = useWindowSize();
  const [ scrollHeight, setScrollHeight ] = useState<number>(0);
  const [ scrollY, setScrollY ] = useState<number | undefined>(0);

  const observeAll = () => {
    const elementSignInPage = document.querySelector('#signInPage');
    const clientHeight = elementSignInPage?.clientHeight ?? 0;
    const elementMiddleTextGroup = document.querySelector('#middleTextGroup') as Element;
    const elementDynamicIPhone = document.querySelectorAll('.dynamicIPhone');
    const io1 = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        elementMiddleTextGroup.classList.remove('animate-[show_2s_linear]');
        elementMiddleTextGroup.classList.replace('text-gray-200', 'text-black');
        for(const e of elementDynamicIPhone) {
          e.classList.remove('animate-[show_2s_linear]');
        };
        if(entries[0].isIntersecting) {
          console.log('>>>> entered');
          elementMiddleTextGroup.classList.add('animate-[show_2s_linear]');
          elementMiddleTextGroup.classList.replace('text-black', 'text-gray-200');
          for(const e of elementDynamicIPhone) {
            e.classList.add('animate-[show_2s_linear]');
          };
        }
      },
      { threshold: 0, root: null, rootMargin: `${ clientHeight }px 0px 0px 0px`, }
    );
    io1.observe(elementMiddleTextGroup);
  };
  
  useEffect(() => {
    const elementSignInPage = document.querySelector('#signInPage');
    const elementGoingToTopFloatButton = document.querySelector('#goingtoTopFloatButton');

    observeAll();

    const handlePageScroll = () => {
      setScrollY(elementSignInPage?.scrollTop);
    };
    const handleFloatBtnClick = () => {
      elementSignInPage?.scrollTo(0, 0);
    };
    elementSignInPage?.addEventListener('scroll', handlePageScroll);
    elementGoingToTopFloatButton?.addEventListener('click', handleFloatBtnClick);
    setScrollHeight(document.querySelector('#signInPage')?.scrollHeight ?? 0);
    return () => {
      elementSignInPage?.removeEventListener('scroll', handlePageScroll);
      elementGoingToTopFloatButton?.removeEventListener('click', handleFloatBtnClick);
    };
  }, []);

  useEffect(() => {
    if(scrollY !== undefined) {
      const elementSignInPage = document.querySelector('#signInPage');
      const elementGoingToTopFloatButton = document.querySelector('#goingtoTopFloatButton');
      const clientHeight = elementSignInPage?.clientHeight ?? 0;
      if(scrollY > clientHeight / 1.7 ) {
        elementGoingToTopFloatButton?.classList.remove('hidden');
      } else {
        elementGoingToTopFloatButton?.classList.add('hidden');
        // setTimeout(() => {
        // }, 1000);
      }
    }
  }, [ scrollY ]);

  return (
    <div className="
      absolute z-[7] w-full top-0 left-0
      flex flex-col items-start justify-start
      laptop:h-[3100px] 
      tablet:h-[2900px]
      mobile:h-[2000px]
      smallest:h-[1600px]  
    ">
      <div className={`
        flex flex-col items-start justify-center w-full bg-black opacity-[90%] border-4 border-black
        flex items-center justify-center text-center p-[10px] cursor-default
        laptop:h-[400px] gap-8
        tablet:h-[400px] gap-8
        mobile:h-[380px] gap-8
        smallest:h-[250px] gap-4
      `}>
        <div className={`
          ${ NotoSansKR_Bold.className }
          flex flex-col items-center justify-end gap-2 text-white
          laptop:text-4xl h-[100px]
          tablet:text-4xl h-[100px] 
          mobile:text-3xl h-[60px] 
          smallest:text-xl h-[50px]
        `}>
          <div>맛집 인플루언스 시대</div>
        </div>
        <div className={`
          ${ NotoSansKR_Light.className }
          flex flex-col items-center justify-center gap-2 text-gray-200
          laptop:text-3xl
          tablet:text-3xl 
          mobile:text-2xl 
          smallest:text-base
        `}>
          <div>여러분만의 맛집을</div>
          <div>맛킷리스트로</div>
          <div>편리하게 모아보세요.</div>
        </div>
        <div className={`
          ${ AppleSDGothicNeoM.className }
          flex flex-col items-center justify-center gap-2 text-gray-400
          laptop:text-3xl 
          tablet:text-3xl
          mobile:text-2xl
          smallest:text-base
        `}>
          <div>Manage your own matjip.</div>
          <div>It&apos;s SHOW Time</div>
        </div>
      </div>
      <div className={`
        flex flex-col items-center justify-end w-full cursor-default bg-black opacity-[90%] 
        border-4 border-black
      `}>
      </div>
      <div 
        id="middleTextGroup"  
        style={{ 
          top: `${ 
            windowSize.width >= 1024 ? 1450 :
            windowSize.width >= 768 ? 1300 :
            windowSize.width >= 330 ? 950 : 700
          }px`  
        }}
        className={`
        ${ NotoSansKR_Light.className }
        absolute z-[9] w-full flex flex-col items-center justify-center gap-2 text-black 
        laptop:text-3xl
        tablet:text-3xl 
        mobile:text-2xl
        smallest:text-base
      `}>
        <div>Full-scale 지도와</div>
        <div>Pinning부터 Hashtag까지</div>
        <div>All in One</div>
      </div>
      <StaticIPhone />
      <DynamicIPhone />
      <div className={`
        flex items-center justify-center w-full cursor-default bg-black opacity-[90%] border-4 border-black
        laptop:h-[3000px]
        tablet:h-[3000px]
        mobile:h-[3000px]
        smallest:h-[3000px]
      `}>
      </div>
    </div>
  );
};

export default Header;
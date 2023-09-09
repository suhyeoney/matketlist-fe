'use client'

import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';

// import image1 from '@assets/icons/naver-signin-btn.png';
import image1 from '@assets/icons/naver-signin-icon-only.png';
import image2 from '@assets/icons/kakao-signin-btn.png';
import SignInService from '@services/signIn.service';
import { useEffect, useState } from 'react';
import gif1 from '@assets/icons/mouse-click.gif';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

const NotoSansKR_Light = localFont({
  src: '../assets/fonts/NotoSansKR-Light.woff'
});

const SocialSignInForm: React.FC = () => {

  const [ isLoaded, setLoaded ] = useState<boolean>(false); // 해당 페이지의 CSR 상태 관리
  const [ isBtnDisabled,setBtnDisabled ] = useState<boolean>(false);

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  useEffect(() => {
    setLoaded(true);
    setBtnDisabled(true);
  }, []);

  const signInNaver = () => {
    return SignInService.authorizeNaverApi();     
  };

  return (
    <>
      <Link 
        href={ isLoaded ? signInNaver() ?? `` : `` }
        className="flex items-center justify-center"
      >
        <div className="
          flex flex-row items-center justify-center absolute z-[9]
          border border-gray-600 rounded-[10px] px-6 py-4
          laptop:top-[400px] gap-4
          tablet:top-[400px] gap-4 
          mobile:top-[370px] gap-2
          smallest:top-[250px] gap-2
          cursor-default hover:cursor-pointer
        ">
          <button className="
            laptop:w-[70px] h-[70px]
            tablet:w-[70px] h-[70px]
            mobile:w-[60px] h-[60px]
            smallest:w-[40px] h-[40px]
          ">
              <Image 
                src={ image1.src } 
                alt=""
                width="200"
                height="40" 
              />
          </button>
          <div className={`
            ${ NotoSansKR_Light.className }
            font-semibold text-yellow-400
            laptop:text-3xl
            tablet:text-3xl 
            mobile:text-2xl 
            smallest:text-base
          `}>
            로그인으로 나만의&nbsp;
            <br className="
              laptop:hidden
              tablet:hidden
            "/>
            매니징 시작하기
          </div>
        </div>


        <div 
          className="
            absolute z-10
            laptop:top-[400px]
            tablet:top-[400px]
            mobile:top-[370px]
            smallest:top-[270px]
            cursor-default hover:cursor-pointer
          ">
          <Image 
            src={ gif1.src } 
            alt=""
            width="150"
            height="150" 
          />
        </div>
      </Link>
    </>
  );
};

export default SocialSignInForm;

{/* <button 
  className={`
    relative
    ${ isBtnDisabled ? 'cursor-not-allowed' : 'cursor-pointer' }
    laptop:w-[200px] h-[40px]
    tablet:w-[200px] h-[40px]
    mobile:w-[200px] h-[40px]
    smallest:w-[120px] h-[30px]
  `} 
  disabled={ isBtnDisabled }
>
  { isBtnDisabled ? <div className={`absolute z-10 top-0 w-[200px] h-[49px] bg-gray-200 opacity-[70%] rounded-[5px]`}></div> : null }
  <Image 
    src={ image2.src } 
    alt="" 
    width="200"
    height="40"
    className="absolute z-5 top-0"
  />
  <div 
    className="
    absolute z-15 flex items-center justify-center gap-2 w-[200px] h-[30px] bg-white text-black 
    -rotate-[10deg] left-[50%] top-0 font-bold border-2 border-black p-1 rounded-[5px]
  ">
    <span className="text-red-700 animate-ping">!</span>
    <span className="text-red-700">서비스 준비 중입니다.</span>
    <span className="text-red-700">🙏</span>
  </div>
</button> */}
'use client'

import Image from 'next/image';

import image1 from '@assets/icons/naver-signin-btn.png';
import image2 from '@assets/icons/kakao-signin-btn.png';
import SignInService from '@services/signIn.service';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const SocialSignInForm: React.FC = () => {

  const [ isLoaded, setLoaded ] = useState<boolean>(false); // 해당 페이지의 CSR 상태 관리
  const [ isBtnDisabled,setBtnDisabled ] = useState<boolean>(false);
  useEffect(() => {
    setLoaded(true);
    setBtnDisabled(true);
    // document.querySelector('#signInPage')?.classList.replace('animate-showPage', 'animate-closePage');
  }, []);

 const signInNaver = () => {
    return SignInService.authorizeNaverApi();     
  };

  return (
    <div className="flex flex-col gap-7 items-center justify-center absolute z-[5] top-1/2">
      <button className="w-[200px] h-[40px]">
        <Link href={ isLoaded ? signInNaver() ?? `` : `` }>
          <Image 
            src={ image1.src } 
            alt=""
            width="200"
            height="40" 
          />
        </Link>
      </button>
      <button 
        className={`
          relative w-[200px] h-[40px]
          ${ isBtnDisabled ? 'cursor-not-allowed' : 'cursor-pointer' }
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
      </button>
    </div>
  );
};

export default SocialSignInForm;
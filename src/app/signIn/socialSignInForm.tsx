'use client'

import Image from 'next/image';

import image1 from '@assets/icons/naver-signin-btn.png';
import image2 from '@assets/icons/kakao-signin-btn.png';
import SignInService from '@services/signIn.service';
import { defaultInstance } from '@api/axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type ResponseConnectionType = {
  code: string,
  state: string,
  error: string,
  error_description: string
};

const SocialSignInForm: React.FC = () => {

  const [ isLoaded, setLoaded ] = useState<boolean>(false); // 해당 페이지의 CSR 상태 관리

  useEffect(() => {
    setLoaded(true);
  }, []);

 const signInNaver = () => {
    return SignInService.authorizeNaverApi();
  };

  return (
    <div className="flex flex-col gap-7 items-center justify-center relative z-0">
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
      <button className="w-[200px] h-[40px]">
        <Image 
          src={ image2.src } 
          alt="" 
          width="200"
          height="40" 
        />
      </button>
    </div>
  );
};

export default SocialSignInForm;
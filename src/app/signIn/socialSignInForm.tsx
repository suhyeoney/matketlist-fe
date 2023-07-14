'use client'

import image1 from '@assets/icons/naver-signin-btn.png';
import image2 from '@assets/icons/kakao-signin-btn.png';
import Image from 'next/image';

const SocialSignInForm: React.FC = () => {

  return (
    <div className="flex flex-col gap-7 items-center justify-center relative z-0">
      <button className="w-[200px] h-[40px]">
        <Image 
          src={ image1.src } 
          alt=""
          width="200"
          height="40" 
        />
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
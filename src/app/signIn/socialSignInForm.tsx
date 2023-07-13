'use client'

import image1 from '@assets/icons/naver-signin-btn.png';
import image2 from '@assets/icons/kakao-signin-btn.png';

const SocialSignInForm: React.FC = () => {

  return (
    <div className="flex flex-col gap-7 items-center justify-center relative z-0">
      <button className="w-[200px] h-[40px]">
        <img src={ image1.src } />
      </button>
      <button className="w-[200px] h-[40px]">
        <img src={ image2.src } />
      </button>
    </div>
  );
};

export default SocialSignInForm;
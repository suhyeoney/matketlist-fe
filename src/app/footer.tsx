import { getToday } from '@utils/dateUtils';
import localFont from 'next/font/local';

import { use } from 'react';

const Tenada = localFont({
  src: './assets/fonts/Tenada.woff'
});

const Footer: React.FC = () => {
  
  const signedInTime = use(fetchTimeStamp());

  return (
    <>
    <div
      id="footer" 
      className={`
      ${ Tenada.className } 
      w-screen flex flex-col text-center text-gray-400 fixed bottom-0 z-5 p-3 cursor-default
      laptop:text-[12px]
      tablet:text-[10px]
      mobile:text-[8px]
      smallest:text-[3px]
    `}>
      <div>
        Matket List <br />
        © 2023. suhyeong.ahn all rights reserved.
      </div>
      <span className="self-end">{ signedInTime }</span>
    </div>
  </>
  );
};

export default Footer;

const fetchTimeStamp = async() => {
  const isServer = typeof window === 'undefined';
  const time = isServer ? getToday() : null;
  return time;
};
import localFont from 'next/font/local';

import { getToday } from '@utils/dateUtils';
import { use } from 'react';

const AppleSDGothicNeoM = localFont({
  src: './assets/fonts/AppleSDGothicNeoM.woff'
});

const fetchTimeStamp = async () => {
  const time = typeof window === 'undefined' ? getToday('Asia/Seoul') : null;
  console.log('fetchTimeStamp', time);
  return time;
};

const Header: React.FC = () => {
  
  const refreshTime = use(fetchTimeStamp());

  return (
    <div
      id="header" 
      className={`
        flex items-center justify-end text-center
        w-screen absolute z-[15] top-8 left-0 p-1 text-gray-400 font-bold cursor-default text-[10px] pr-2
    `}>
      <div className={`    
        ${ AppleSDGothicNeoM.className } 
      `}>
        { refreshTime }
        </div>
    </div>
  );
};

export default Header;
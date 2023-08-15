import { getToday } from '@utils/dateUtils';
import { use } from 'react';

const Header: React.FC = () => {
  
  const signedInTime = use(fetchTimeStamp());

  return (
    <div
      id="header" 
      className={`
      w-screen absolute z-[5] top-8 p-1 text-gray-400 cursor-default text-[10px] 
    `}>
      <span className="absolute right-2">{ signedInTime }</span>
    </div>
  );
};

export default Header;

const fetchTimeStamp = async() => {
  const isServer = typeof window === 'undefined';
  const time = isServer ? getToday('Asia/Seoul') : null;
  return time;
};
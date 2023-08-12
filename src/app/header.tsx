import { getToday } from '@utils/dateUtils';
import { use } from 'react';

const Header: React.FC = () => {
  
  const signedInTime = use(fetchTimeStamp());

  return (
    <div
      id="header" 
      className={`
      absolute z-5 top-0 right-2 w-screen text-center text-gray-400 cursor-default text-[10px]
    `}>
      <span>{ signedInTime }</span>
    </div>
  );
};

export default Header;

const fetchTimeStamp = async() => {
  const isServer = typeof window === 'undefined';
  const time = isServer ? getToday() : null;
  return time;
};
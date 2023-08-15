import localFont from 'next/font/local';
import { useRouter } from 'next/navigation';

import BackgroundModeToggle from '@main/backgroundModeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import SignOut from '@main/signout';
import { accessTokenSetting } from '@store/features/environmentVariables/slice';

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const Header: React.FC = () => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  const dispatch = useDispatch();
  const navigator = useRouter();

  const signOut = () => {
    document.querySelector('#mainPage')?.classList.replace('animate-showPage', 'animate-closePage');
    setTimeout(() => {
      navigator.push('/signIn');
      dispatch(accessTokenSetting(''));
    }, 1000);
  };

  return (
    <div className={`
      absolute z-10 top-10 w-full flex flex-row items-center justify-center gap-3
      smallest:h-[75px]
    `}>
      <div className={`
        ${ Tenada.className } h-[80px] text-center p-[10px] flex justify-center items-center text-black
        laptop:text-5xl
        tablet:text-4xl
        mobile:text-3xl
        smallest:text-2xl
      `}>
        맛킷 리스트
      </div>
      <div className="flex items-center justify-center">
        <div className={`
          flex flex-row items-center gap-3
        `}>
          <BackgroundModeToggle />
          <SignOut  signOut={ signOut } />
        </div>
      </div>
    </div>
  );
};

export default Header;

// ${ environmentVariables.backgroundMode ? 'text-[#2A303C]' : 'text-white' }
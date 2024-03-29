import localFont from 'next/font/local';
import { useRouter } from 'next/navigation';

import BackgroundModeToggle from '@main/backgroundModeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import SignOut from '@main/signout';
import { accessTokenSetting } from '@store/features/environmentVariables/slice';

const YeongdeokSea = localFont({
  src: '../assets/fonts/YeongdeokSea.woff'
});

const Header: React.FC = () => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  const dispatch = useDispatch();
  const navigator = useRouter();

  const signOut = () => {
    document.querySelector('html')?.classList.replace('animate-showPage', 'animate-closePage');
    setTimeout(() => {
      dispatch(accessTokenSetting({ access_token: '', user_id: '' }));
      navigator.push('/');
    }, 1000);
  };

  return (
    <div className={`
      absolute z-10 w-full flex flex-row items-center justify-center gap-3
      laptop:top-10
      tablet:top-10
      mobile:top-10
      smallest:top-8
    `}>
      <div className={`
        ${ YeongdeokSea.className } font-bold text-center h-[50px] flex justify-center items-center
        text-black cursor-default
        laptop:text-5xl
        tablet:text-4xl
        mobile:text-3xl
        smallest:text-xl
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
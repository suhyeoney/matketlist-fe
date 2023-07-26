import RegionSelectbox from '@main/regionSelectbox';
import BackgroundModeToggle from '@main/backgroundModeToggle';
import localFont from 'next/font/local';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const Header: React.FC = () => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  return (
    <div className="
      flex flex-row items-center justify-center relative z-0
      smallest:h-[75px]
    ">
      <div className={`
        ${ Tenada.className } h-[100px] text-center p-[10px] flex justify-center items-center
        ${ environmentVariables.backgroundMode ? 'text-[#2A303C]' : 'text-white' }
        laptop:text-5xl
        tablet:text-4xl
        mobile:text-3xl
        smallest:text-2xl
      `}>
        맛킷 리스트
      </div>
      <div>
        <BackgroundModeToggle />
      </div>
      {/* <RegionSelectbox /> */}
    </div>
  );
};

export default Header;
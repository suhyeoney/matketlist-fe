import RegionSelectbox from '@main/regionSelectbox';
import BackgroundModeToggle from '@main/backgroundModeToggle';
import localFont from 'next/font/local';

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const Header: React.FC = () => {

  return (
    <div className="
      flex flex-row items-center justify-center relative z-0
      smallest:h-[70px]
    ">
      <div className={`
        ${ Tenada.className } h-[100px] text-center p-[10px] flex justify-center items-center
        laptop:text-5xl
        tablet:text-4xl
        mobile:text-3xl
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
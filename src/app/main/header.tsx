import RegionSelectbox from '@main/regionSelectbox';
import BackgroundModeToggle from '@main/backgroundModeToggle';

const Header: React.FC = () => {

  return (
    <div className="flex flex-row items-center justify-center relative z-0">
      <div className="
        font-['Tenada'] h-[100px] text-center p-[10px] flex justify-center items-center
        laptop:text-5xl
        tablet:text-4xl
        mobile:text-3xl
      ">
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
import RegionSelectbox from "./main/regionSelectbox";

const Header: React.FC = () => {

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="font-['Tenada'] h-[100px] text-center p-[10px] text-5xl flex justify-center items-center">
        맛킷 리스트
      </div>
      <RegionSelectbox />
    </div>
  );
};

export default Header;
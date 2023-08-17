import localFont from 'next/font/local';

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const Header: React.FC = () => {

  return (
    <div className="flex flex-row items-center justify-center absolute z-[5]">
      <div className={`
        ${ Tenada.className } font-bold flex justify-center items-center text-center text-white p-[10px] cursor-default
        laptop:text-7xl h-[350px] 
        tablet:text-6xl h-[200px] 
        mobile:text-5xl h-[200px] 
        smallest:text-5xl h-[200px]
      `}>
        맛킷 리스트
      </div>
    </div>
  );
};

export default Header;
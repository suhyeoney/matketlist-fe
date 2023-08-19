import localFont from 'next/font/local';
import Iphone from './iphone';

const NotoSansKR_Light = localFont({
  src: '../assets/fonts/NotoSansKR-Light.woff'
});

const NotoSansKR_Bold = localFont({
  src: '../assets/fonts/NotoSansKR-Bold.woff'
});

const AppleSDGothicNeoM = localFont({
  src: '../assets/fonts/AppleSDGothicNeoM.woff'
});

const Header: React.FC = () => {

  return (
    <div className="absolute z-[8] w-full h-[3000px] top-0 left-0
    flex flex-col items-start justify-start
    ">
      <div className={`
        flex flex-col items-start justify-center gap-8 w-full h-[400px] bg-black opacity-[90%]
        font-bold flex items-center justify-center text-center p-[10px] cursor-default
      `}>
        <div className={`
          ${ NotoSansKR_Bold.className }
          flex flex-col items-center justify-center gap-2 text-white font-semibold
          laptop:text-5xl h-[100px]
          tablet:text-5xl h-[100px] 
          mobile:text-4xl h-[90px] 
          smallest:text-4xl h-[80px]
        `}>
          <div>맛집 인플루언스</div>
        </div>
        <div className={`
          ${ NotoSansKR_Light.className }
          flex flex-col items-center justify-center gap-2 text-gray-200 font-normal
          laptop:text-4xl
          tablet:text-3xl 
          mobile:text-2xl 
          smallest:text-2xl
        `}>
          <div> 버킷으로 관리하는 맛킷리스트로 </div>
          <div>여러분만의 맛집을</div>
          <div>편리하게 관리해보세요.</div>
        </div>
        <div className={`
          ${ AppleSDGothicNeoM.className }
          flex flex-col items-center justify-center gap-2 text-gray-400 font-normal
          laptop:text-4xl 
          tablet:text-3xl
          mobile:text-2xl
          smallest:text-2xl
        `}>
          <div>Manage your own matjip</div>
          <div>It&apos;s Show Time</div>
        </div>
      </div>
      <div className={`
        flex items-center justify-center w-full h-[1000px] cursor-default bg-black opacity-[90%]
      `}>
      </div>
      <Iphone />
    </div>
  );
};

export default Header;
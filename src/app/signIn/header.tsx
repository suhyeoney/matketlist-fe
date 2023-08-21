import localFont from 'next/font/local';
import dynamic from 'next/dynamic';

// import StaticIPhone from './staticIPhone';
// import DynamicIPhone from './dynamicIPhone';

const StaticIPhone = dynamic(() => import('@signIn/staticIPhone'), { ssr: true });
const DynamicIPhone = dynamic(() => import('@signIn/dynamicIPhone'), { ssr: true });

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
    <div className="
      absolute z-[7] w-full top-0 left-0
      flex flex-col items-start justify-start
      laptop:h-[3100px] 
      tablet:h-[2900px]
      mobile:h-[2000px]
      smallest:h-[1600px]  
    ">
      <div className={`
        flex flex-col items-start justify-center w-full bg-black opacity-[90%] border-2 border-black
        font-bold flex items-center justify-center text-center p-[10px] cursor-default
        laptop:h-[400px] gap-8
        tablet:h-[400px] gap-8
        mobile:h-[380px] gap-8
        smallest:h-[250px] gap-4
      `}>
        <div className={`
          ${ NotoSansKR_Bold.className }
          flex flex-col items-center justify-center gap-2 text-white font-semibold
          laptop:text-4xl h-[100px]
          tablet:text-4xl h-[100px] 
          mobile:text-3xl h-[60px] 
          smallest:text-xl h-[50px]
        `}>
          <div>맛집 인플루언스 시대</div>
        </div>
        <div className={`
          ${ NotoSansKR_Light.className }
          flex flex-col items-center justify-center gap-2 text-gray-200 font-normal
          laptop:text-3xl
          tablet:text-3xl 
          mobile:text-2xl 
          smallest:text-base
        `}>
          <div>여러분만의 맛집을</div>
          <div>맛킷리스트로</div>
          <div>편리하게 모아보세요.</div>
        </div>
        <div className={`
          ${ AppleSDGothicNeoM.className }
          flex flex-col items-center justify-center gap-2 text-gray-400 font-normal
          laptop:text-3xl 
          tablet:text-3xl
          mobile:text-2xl
          smallest:text-base
        `}>
          <div>Manage your own matjip.</div>
          <div>It&apos;s SHOW Time</div>
        </div>
      </div>
      <div className={`
        ${ NotoSansKR_Light.className }
        flex flex-col items-center justify-end w-full cursor-default bg-black opacity-[90%] border-2 border-black
        laptop:h-[1600px]
        tablet:h-[1450px] 
        mobile:h-[1800px]
        smallest:h-[1500px]
      `}>
        <div className={`
          ${ NotoSansKR_Light.className }
          flex flex-col items-center justify-center gap-2 text-gray-200 font-normal
          laptop:text-3xl
          tablet:text-3xl 
          mobile:text-2xl 
          smallest:text-base
        `}>
          <div>Full-scale 지도 위에</div>
          <div>Pinning부터 Hashtag까지</div>
          <div>All in One</div>
        </div>
      </div>
      <StaticIPhone />
      <DynamicIPhone />
      <div className={`
        flex items-center justify-center w-full cursor-default bg-black opacity-[90%] border-2 border-black
        laptop:h-[2000px]
        tablet:h-[2000px]
        mobile:h-[2200px]
        smallest:h-[2300px]
      `}>
      </div>
    </div>
  );
};

export default Header;
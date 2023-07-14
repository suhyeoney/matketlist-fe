import localFont from 'next/font/local';

const Tenada = localFont({
  src: './assets/fonts/Tenada.woff'
});

const Footer: React.FC = () => {
  
  return (
    <div className={`
      ${ Tenada.className } w-screen text-center text-gray-400 fixed bottom-0 z-10 p-3 cursor-default
      laptop:text-[12px]
      tablet:text-[10px]
      mobile:text-[8px]
    `}>
      Matket List <br />
      © 2023. suhyeong.ahn all rights reserved.
    </div>
  );
};

// ${ typeof window !== undefined && JSON.parse(localStorage.getItem('matket-environment-variables') || '{}')?.backgroundMode === 'L' ? 'text-black' : 'text-white' }

export default Footer;
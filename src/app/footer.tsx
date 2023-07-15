import localFont from 'next/font/local';

const Tenada = localFont({
  src: './assets/fonts/Tenada.woff'
});

const Footer: React.FC = () => {
  
  return (
    <div
      id="footer" 
      className={`
      ${ Tenada.className } w-screen text-center text-gray-400 fixed bottom-0 z-5 p-3 cursor-default
      laptop:text-[12px]
      tablet:text-[10px]
      mobile:text-[8px]
      smallest:text-[3px]
    `}>
      Matket List <br />
      © 2023. suhyeong.ahn all rights reserved.
    </div>
  );
};

// ${ typeof window !== undefined && JSON.parse(localStorage.getItem('matket-environment-variables') || '{}')?.backgroundMode === 'L' ? 'text-black' : 'text-white' }

export default Footer;
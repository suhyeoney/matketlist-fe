import localFont from 'next/font/local';

const Tenada = localFont({
  src: './assets/fonts/Tenada.woff'
});

const Footer: React.FC = () => {
  
  return (
    <>
    <div
      id="footer" 
      className={`
      w-screen flex items-center justify-center text-center text-gray-400 fixed bottom-0 z-5 p-1 cursor-default
      laptop:text-[12px]
      tablet:text-[10px]
      mobile:text-[8px]
      smallest:text-[3px]
    `}>
      <div className={`
        ${ Tenada.className } 
      `}>
        Matket List <br />
        © 2023. suhyeong.ahn all rights reserved.
      </div>
    </div>
  </>
  );
};

export default Footer;
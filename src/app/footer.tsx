import localFont from 'next/font/local';

const AppleSDGothicNeoM = localFont({
  src: './assets/fonts/AppleSDGothicNeoM.woff'
});

const Footer: React.FC = () => {
  
  return (
    <>
    <div
      id="footer" 
      className={`
      absolute z-[15] bottom-2 w-screen flex items-center justify-center text-center text-gray-400 font-bold p-1 cursor-default
      laptop:text-[12px]
      tablet:text-[10px]
      mobile:text-[8px]
      smallest:text-[3px]
    `}>
      <div className={`    
        ${ AppleSDGothicNeoM.className } 
      `}>
        Matket List <br />
        © 2023. suhyeong.ahn all rights reserved.
      </div>
    </div>
  </>
  );
};

export default Footer;
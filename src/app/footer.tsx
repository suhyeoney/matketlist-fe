import localFont from 'next/font/local';

const YeongdeokSea = localFont({
  src: './assets/fonts/YeongdeokSea.woff'
});

const Footer: React.FC = () => {
  
  return (
    <>
    <div
      id="footer" 
      className={`
      absolute z-[15] bottom-0 w-screen flex items-center justify-center text-center text-black font-bold p-1 cursor-default
      laptop:text-[12px]
      tablet:text-[10px]
      mobile:text-[8px]
      smallest:text-[3px]
    `}>
      <div className={`
        ${ YeongdeokSea.className } 
      `}>
        Matket List <br />
        © 2023. suhyeong.ahn all rights reserved.
      </div>
    </div>
  </>
  );
};

export default Footer;
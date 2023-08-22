import Image from 'next/image';

import video1 from '@assets/videos/signIn-iphone-intro.mp4';
import image1 from '@assets/images/mockups/empty.png';

const DynamicIPhone: React.FC = () => {

  return (
    <>
      <div className="
        dynamicIPhone
        absolute z-[8] flex items-center justify-center self-center
        laptop:top-[1705px]
        tablet:top-[1525px] 
        mobile:top-[1165px]
        smallest:top-[845px]
      ">
        <video 
          loop 
          autoPlay
          muted 
          playsInline
          className="
            laptop:rounded-[75px]
            tablet:rounded-[75px]
            mobile:w-[318px] rounded-[50px]
            smallest:w-[285px] rounded-[50px]
          ">
          <source src={ video1 } type="video/mp4" />
        </video>
      </div>

      <div className="
        dynamicIPhone
        absolute z-[9] flex items-center justify-center self-center
        laptop:top-[1700px]
        tablet:top-[1520px]
        mobile:top-[1160px]
        smallest:top-[840px]
      ">
        <Image
          src={ image1 }
          alt=""
          className="
            mobile:w-[320px]
            smallest:w-[290px]
          "
        />
      </div>
    </>
  );
};

export default DynamicIPhone;
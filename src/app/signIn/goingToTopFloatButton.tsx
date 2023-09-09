import Image from 'next/image';

import image1 from '@assets/icons/up-arrow.png';

const GoingtoTopFloatButton: React.FC = () => {
  return (
    <>
      <div 
        id="goingtoTopFloatButton"
        className="
        absolute z-[16] bottom-4 right-4 hidden rounded-full border border-white bg-white p-2 
        cursor-default hover:cursor-pointer
        laptop:w-[40px] h-[40px]
        tablet:w-[40px] h-[40px]
        mobile:w-[40px] h-[40px]
        smallest:w-[40px] h-[40px]
      ">
        <Image
          src={ image1.src }
          alt=""
          width="30"
          height="30"
          className="w-full h-full"
        />
      </div>
    </>
  );
};

export default GoingtoTopFloatButton;
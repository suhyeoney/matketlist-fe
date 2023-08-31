import Image from 'next/image';

import image1 from '@assets/images/mockups/iPhone13.png';

const StaticIPhone: React.FC = () => {

  return (
    <div className="
      absolute z-[9] w-full flex items-center justify-center
      laptop:top-[550px]
      tablet:top-[550px]
      mobile:top-[500px]
      smallest:top-[330px]
    ">
      <Image
        src={ image1 }
        alt=""
        className="
          laptop:w-[700px]
          tablet:w-[600px]
          mobile:w-[360px]
          smallest:w-[290px]
        "
      />
    </div>
  );
};

export default StaticIPhone;
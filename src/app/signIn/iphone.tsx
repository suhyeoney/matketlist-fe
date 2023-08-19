import Image from 'next/image';

import image1 from '@assets/images/mockups/iPhone 13.png';

const Iphone: React.FC = () => {

  return (
    <div 
      className="absolute z-[9] top-[450px] w-full flex items-center justify-center">
      <Image
        src={ image1 }
        alt=""
        className=""
      />
    </div>
  );
};

export default Iphone;
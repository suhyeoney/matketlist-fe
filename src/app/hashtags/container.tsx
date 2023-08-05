'use client'

import Image from 'next/image';

import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import image1 from '@assets/icons/goback-btn.png';
import image2 from '@assets/icons/make-folder-btn.png';

type HashtagTreeProps = {
  closeHashtagTree: () => void,
};

const HashtagTree: React.FC<HashtagTreeProps> = ({ closeHashtagTree }) => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const makeFolder = () => {

  };

  return (
    <div
      id="hashtagTree" 
      className={`
      absolute z-20 left-0 bottom-0 flex w-full h-[87%] animate-openFromRight
      ${ environmentVariables.backgroundMode ? 'bg-white text-black' : 'bg-[#2A303C] text-white' } 
    `}>
      <div className="absolute flex left-3">
        <Image
          src={ image1.src }
          alt=""
          width="20"
          height="20"
          className="w-[20px] h-[20px]"
          onClick={ () => closeHashtagTree() }
        />
      </div>
      <div className="absolute flex flex-col gap-3 right-3 border-2 border-gray-300 rounded-[10px] p-2">
        <Image
          src={ image2.src }
          alt=""
          width="20"
          height="20"
          className="w-[20px] h-[20px]"
        />
        <Image
          src={ image2.src }
          alt=""
          width="20"
          height="20"
          className="w-[20px] h-[20px]"
        />
        <Image
          src={ image2.src }
          alt=""
          width="20"
          height="20"
          className="w-[20px] h-[20px]"
        />
        <Image
          src={ image2.src }
          alt=""
          width="20"
          height="20"
          className="w-[20px] h-[20px]"
        />
      </div>
      <div>

      </div>
    </div>
  );
};

export default HashtagTree;
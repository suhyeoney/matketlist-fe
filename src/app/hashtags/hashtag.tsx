'use client'

import Image from 'next/image';

import image1 from '@assets/icons/hashtag-btn.png';
import image2 from '@assets/icons/minus-btn.png';
import image3 from '@assets/icons/link-btn.png';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

type HashtagProps = {
  dataKey: number,
  text: string,
  placeIds: string[],
  minusHashtag: (idx: number) => void,
};

const Hashtag: React.FC<HashtagProps> = ({ dataKey, text, placeIds, minusHashtag }) => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  return (
    <div 
      id={ `hashtag-${ dataKey }` }
      className={`
      flex flex-row gap-2 items-center justify-center border-2 border-gray-200 rounded-[10px] p-3
      `}
    >
      <div className="flex flex-row items-between justify-center gap-2">
        <span>{ dataKey }</span>
        <Image
          src={ image1.src }
          alt=""
          width="40"
          height="40"
          className="w-[40px] h-[40px] self-center"
        />
        <div className="flex flex-col items-center justify-center gap-3">
          <input 
            type="text" 
            placeholder="태그명 입력" 
            className={`
            input w-[90%] h-[40px]
            ${ environmentVariables.backgroundMode ? 'bg-white focus:text-black' : 'bg-[#2A303C] border-white focus:text-white' }
          `}/>
          <div className="flex flex-row items-center justify-center gap-2">
            <button 
              className="flex flex-row border border-gray-200 rounded-md gap-1 p-1 hover:cursor-pointer"
              onClick={ () => minusHashtag(dataKey) }
            >
              <Image
                src={ image2.src }
                alt=""
                width="10"
                height="10"
                className="w-[10px] h-[10px] self-center"
              />
              <span>빼기</span>
            </button>
            <button className="flex flex-row border border-gray-200 rounded-md gap-1 p-1 hover:cursor-pointer">
              <Image
                src={ image3.src }
                alt=""
                width="10"
                height="10"
                className="w-[10px] h-[10px] self-center"
              />
              <span>맛집부착</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hashtag;
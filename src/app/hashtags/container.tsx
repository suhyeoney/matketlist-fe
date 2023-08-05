'use client'

import Image from 'next/image';

import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import image1 from '@assets/icons/goback-btn.png';
import image2 from '@assets/icons/plus-btn.png';
import { useCallback, useEffect, useState } from 'react';
import Hashtag from '@hashtags/hashtag';

type HashtagTreeProps = {
  size : { width: number, height: number },
  closeHashtagTree: () => void,
};

type HashtagType = {
  id: number, 
  text: string, 
  placeIds: string[],
};

const HashtagTree: React.FC<HashtagTreeProps> = ({ size, closeHashtagTree }) => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  const [ cntHashtag, setCntHashtag ] = useState<number>(0);
  const [ hashtagList, setHashtagList ] = useState<HashtagType[]>([]);

  const createHashtag = () => {
    setCntHashtag(cntHashtag => cntHashtag + 1);
  };

  const minusHashtag = (idx: number) => {
    setHashtagList([ ...hashtagList.filter((x: HashtagType) => x.id !== idx) ]);
  };

  useEffect(() => {
    console.log('hashtagList', hashtagList);
  }, [ hashtagList ]);
  
  useEffect(() => {
    console.log('cntHashtag', cntHashtag);
    for(let i = 0; i < cntHashtag; i++) {
      let emptyObj = { 
        id: i, 
        text: '', 
        placeIds: [''] 
      };
      setHashtagList([ ...hashtagList, emptyObj ]);
    }
  }, [ cntHashtag ]);

  return (
    <div
      id="hashtagTree" 
      className={`
      absolute z-20 left-0 bottom-0 flex justify-center w-full animate-openFromRight
      laptop:h-[85%]
      tablet:h-[85%]
      mobile:h-[89%]
      smallest:h-[85%]
      ${ environmentVariables.backgroundMode ? 'bg-white text-black' : 'bg-[#2A303C] text-white' } 
    `}>
      {/* <div className="absolute flex left-3">
        <Image
          src={ image1.src }
          alt=""
          width="40"
          height="40"
          className="w-[40px] h-[40px]"
          onClick={ () => closeHashtagTree() }
        />
      </div> */}
      <div 
        style={{
          width: `${ size.width * 0.7 }px`,
          // height: `${ size.height * 0.6 }px`,
        }}
        className={`
        flex flex-col gap-5 items-center justify-start 
        overflow-y-scroll my-2
      `}>
        { hashtagList.map((e: HashtagType, idx: number) => {
          return (
            <Hashtag 
              key={ idx } 
              dataKey={ idx } 
              text={ e.text } 
              placeIds={ e.placeIds } 
              minusHashtag={ minusHashtag }
            />
          );
        })}
      </div>
      <div className="absolute flex flex-col gap-3 right-3 bottom-3 border-2 border-gray-300 rounded-full p-2 bg-white">
        <Image
          src={ image2.src }
          alt=""
          width="40"
          height="40"
          className="w-[40px] h-[40px]"
          onClick={ () => createHashtag() }
        />

      </div>
      <div>

      </div>
    </div>
  );
};

export default HashtagTree;
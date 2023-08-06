'use client'

import Image from 'next/image';

import image1 from '@assets/icons/hashtag-btn.png';
import image2 from '@assets/icons/minus-btn.png';
import image3 from '@assets/icons/link-btn.png';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useEffect, useState } from 'react';
import { HashtagType } from '@dataTypes/hashtag';

type HashtagProps = {
  sequence: number,
  dataKey: number,
  text: string,
  placeIds: string[],
  hashtagList: HashtagType[],
  minusHashtag: (idx: number) => void,
  onInputTextChange: (e: React.ChangeEvent<HTMLInputElement>, dataKey: number) => {
    result: boolean;
    msg: string | null;
}
};

const Hashtag: React.FC<HashtagProps> = ({ 
  sequence,
  dataKey, 
  text, 
  placeIds, 
  hashtagList,
  minusHashtag, 
  onInputTextChange }) => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const [ inputText, setInputText ] = useState<string>(text);
  const [ textErrorMsg, setTextErrorMsg ] = useState<string>('');

  useEffect(() => {
    if(hashtagList !== undefined) {
      setInputText(hashtagList.find((e: HashtagType) => e.id === dataKey)?.text ?? text);
    }
  }, [ hashtagList ]);

  useEffect(() => {
    console.log('inputText', inputText);
  }, [ inputText ]);

  return (
    <div 
      id={ `hashtag-${ sequence }` }
      className={`
      relative flex flex-row gap-2 items-center justify-center border-2 border-gray-200 rounded-[10px] p-3
      `}
    >
      <div className="flex flex-row items-between justify-center gap-2">
        <span>{ sequence + 1 }</span>
        <Image
          src={ image1.src }
          alt=""
          width="40"
          height="40"
          className="w-[40px] h-[40px] self-center"
        />
        <div className="flex flex-col items-center justify-center gap-1">
          <input 
            type="text" 
            placeholder="태그명 입력" 
            value={ inputText }
            onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
              setInputText(e.target.value);
              setTextErrorMsg(onInputTextChange(e, dataKey).msg ?? '') 
            }}
            className={`
            input w-[90%] h-[40px]
            ${ environmentVariables.backgroundMode ? 'bg-white focus:text-black' : 'bg-[#2A303C] border-white focus:text-white' }
          `}/>
          { textErrorMsg !== null ? 
            <span className="
              text-red-500 text-[13px] self-start pl-2 
              laptop:w-[190px] whitespace-normal
              tablet:w-[190px] whitespace-normal
              mobile:whitespace-normal
              smallest:whitespace-normal
            ">{ textErrorMsg  }</span> : null 
          }
          <div className="flex flex-row items-center justify-center gap-2 w-full">
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
'use client'

import Image from 'next/image';
import localFont from 'next/font/local';

import image1 from '@assets/icons/hashtag-btn.png';
import image2 from '@assets/icons/minus-btn.png';
import image3 from '@assets/icons/link-btn.png';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useEffect, useState } from 'react';
import { HashtagType } from '@dataTypes/hashtag';

interface HashtagProps {
  sequence: number,
  dataKey: number,
  text: string,
  placeIds: string[],
  hashtagList: HashtagType[],
  setHashtagList: React.Dispatch<React.SetStateAction<HashtagType[]>>,
  minusHashtag: (idx: number) => void,
  onInputTextChange: (e: React.ChangeEvent<HTMLInputElement>, dataKey: number) => {
    result: boolean;
    msg: string | null;
  },
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void
};

const YeongdeokSea = localFont({
  src: '../assets/fonts/YeongdeokSea.woff'
});

const Hashtag: React.FC<HashtagProps> = ({ 
  sequence,
  dataKey, 
  text, 
  placeIds, 
  hashtagList,
  setHashtagList,
  minusHashtag, 
  onInputTextChange,
  onDragStart,
  onDragOver,
  onDragEnd, }) => {

  const location = useSelector((state: RootState) => state.location);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const [ inputText, setInputText ] = useState<string>('');
  const [ textErrorMsg, setTextErrorMsg ] = useState<string>('');

  useEffect(() => {
    setInputText(text);
  }, []);

  useEffect(() => {
    if(hashtagList !== undefined) {
      setInputText(hashtagList.find((e: HashtagType) => e.id === dataKey)?.text ?? text);
    }
  }, [ hashtagList ]);

  return (
    <div 
      id={ `hashtag-${ sequence }` }
      data-id={ sequence }
      draggable
      onDragStart={ onDragStart }
      onDragOver={ onDragOver }
      onDragEnd={ onDragEnd }
      className={`
      hashtag relative flex flex-row gap-2 items-center justify-center 
      border-2 border-gray-200 rounded-[10px] p-2
      bg-gradient-to-r from-red-200 from-10% via-lime-300 via-30%  via-yellow-300 via-60% to-slate-200 to-90%
      hover:cursor-pointer
      `}
    >
      <div className="flex flex-row items-between justify-center">
        {/* <span>{ sequence + 1 }</span> */}
        <Image
          id={`hashtag-image-${ sequence }`}
          src={ image1.src }
          alt=""
          width="40"
          height="40"
          className="hashtagImage w-[40px] h-[40px] self-center"
          
        />
        <div className="flex flex-col items-center justify-center gap-1">
          <input
            id={`hashtag-input-${ sequence }`}
            type="text" 
            placeholder="태그명 입력" 
            value={ inputText }
            onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
              setInputText(e.target.value);
              setTextErrorMsg(onInputTextChange(e, dataKey).msg ?? '');
            }}
            className={`
            hashtagInput input w-[90%] h-[40px] self-end truncate ...
            ${ environmentVariables.backgroundMode ? 'bg-white focus:text-black' : 'bg-[#2A303C] border-white focus:text-white' }
          `}/>
          { textErrorMsg !== null ? 
            <span className="
              text-red-500 text-[13px] self-end pl-2 
              laptop:w-[190px] whitespace-normal
              tablet:w-[190px] whitespace-normal
              mobile:whitespace-normal
              smallest:whitespace-normal
            ">{ textErrorMsg  }</span> : null 
          }
          <div className={`
            flex flex-row items-end justify-end gap-2 w-full
            ${ YeongdeokSea.className }
          `}>
            <button
              id={`hashtag-minus-button-${ sequence }`}
              className="hashtagMinusButton flex flex-row border-2 border-red-500 rounded-md gap-1 px-2 py-1 hover:cursor-pointer"
              onClick={ () => minusHashtag(dataKey) }
            >
              <Image
                src={ image2.src }
                alt=""
                width="10"
                height="10"
                className="w-[10px] h-[10px] self-center"
              />
              <span className={`
                text-black
              `}>
                빼기
              </span>
            </button>
            {/* <button className="flex flex-row border border-gray-200 rounded-md gap-1 p-1 hover:cursor-pointer">
              <Image
                src={ image3.src }
                alt=""
                width="10"
                height="10"
                className="w-[10px] h-[10px] self-center"
              />
              <span>맛집부착</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hashtag;
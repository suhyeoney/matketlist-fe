'use client'

import Image from 'next/image';

import { RootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import image1 from '@assets/icons/goback-btn.png';
import image2 from '@assets/icons/add-hashtag-btn.png';
import image3 from '@assets/icons/save-btn.png';
import { useCallback, useEffect, useState } from 'react';
import Hashtag from '@hashtags/hashtag';
import { HashtagType } from '@dataTypes/hashtag';
import { checkFullHangeulOrEnglish, checkSpaceIncluded } from '@utils/stringUtils';
import { updateHashtag } from '@features/location/locationSlice';
import { setHashtagTreeOpen } from '@features/modalControl/modalControlSlice';

type HashtagTreeProps = {
  size : { width: number, height: number },
  closeHashtagTree: () => void,
};

const HashtagTree: React.FC<HashtagTreeProps> = ({ size, closeHashtagTree }) => {

  const location = useSelector((state: RootState) => state.location);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  const [ cntHashtag, setCntHashtag ] = useState<number>(0); // 현재 로컬 해시태그 개수 (저장 전)
  const [ hashtagList, setHashtagList ] = useState<HashtagType[]>([]); // 현재 로컬 해시태그 목록 (저장 전)

  const dispatch = useDispatch();

  const createHashtag = () => {
    setCntHashtag(cntHashtag => cntHashtag + 1);
  };

  const minusHashtag = (dataKey: number) => {
    setHashtagList([ ...hashtagList.filter((x: HashtagType) => x.id !== dataKey) ]);
  };
  
  const onInputTextChange =  (e: React.ChangeEvent<HTMLInputElement>, dataKey: number)  => {
    const inputValue = e.target.value;
    const currentHashtagList = [ ...hashtagList ];
    const currentHashtag = currentHashtagList.find((e: HashtagType) => e.id === dataKey);
    // 해시태그명 유효성 검사 시작
    if(checkSpaceIncluded(inputValue)) {
      return { result: false, msg: '공백을 포함할 수 없습니다.' };
    }
    if(checkFullHangeulOrEnglish(inputValue)) {
      return { result: false, msg: '한글의 자음 또는 모음 단독으로 구성할 수 없습니다.' };
    }
    if(inputValue.length > 30) {
      return { result: false, msg: '30자를 초과할 수 없습니다.' };
    }

    if(currentHashtag !== undefined) {
      currentHashtag.text = inputValue;
    }
    // console.log('currentHashtagList', currentHashtagList);
    setHashtagList(currentHashtagList);
    return { result: true, msg: null };
  };

  const saveAllTheHashtags = () => {
    const emptyHashtag = hashtagList.find((e: HashtagType) =>e.text === '');
    if(emptyHashtag) {
      alert('태그명이 비어있는 해시태그가 존재합니다.');
      return;
    }
    const result = window.confirm('해시태그 목록을 저장하시겠어요?');
    if(result) {
      dispatch(updateHashtag(hashtagList));
      closeHashtagTree();
    } else {
      return;
    }
    
  };

  useEffect(() => {
    if(location.arrHashtag !== undefined) {
      setHashtagList([ ...location.arrHashtag ]);
    }
  }, []);

  useEffect(() => {
    console.log('hashtagList', hashtagList);
  }, [ hashtagList ]);
  
  useEffect(() => {
    console.log('cntHashtag', cntHashtag);
    if(cntHashtag > 0) {
      const savedHashtagList = location.arrHashtag;
      let lastHashtagId = savedHashtagList[savedHashtagList.length - 1] !== undefined ? 
        savedHashtagList[savedHashtagList.length - 1].id : -1;
      for(let i = 1; i <= cntHashtag; i++) {
        let emptyObj = { 
          id: lastHashtagId + i, 
          text: '', 
          placeIds: [''] 
        };
        setHashtagList([ ...hashtagList, emptyObj ]);
      }
    }

  }, [ cntHashtag ]);

  return (
    <div
      id="hashtagTree" 
      className={`
      absolute z-20 left-0 bottom-0 flex justify-center w-full animate-openFromRight
      laptop:h-[87%]
      tablet:h-[87%]
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
        overflow-y-scroll my-10
      `}>
        { hashtagList.length > 0 ?
          hashtagList.map((e: HashtagType, idx: number) => {
            return (
              <Hashtag 
                key={ idx } 
                sequence = { idx }
                dataKey={ e.id } 
                text={ e.text } 
                placeIds={ e.placeIds } 
                hashtagList={ hashtagList }
                minusHashtag={ minusHashtag }
                onInputTextChange={ onInputTextChange }
              />
            );
          }) : null
        }
      </div>
      <div className="absolute z-5 flex flex-col gap-3 right-3 bottom-3">
        <div 
          className="
          border-2 border-gray-300 
          rounded-full p-2 bg-yellow-300 hover:cursor-pointer
        ">
          <Image
            src={ image2.src }
            alt=""
            width="30"
            height="30"
            className="w-[30px] h-[30px]"
            onClick={ () => createHashtag() }
          />
        </div>
        <div 
          className="
          border-2 border-gray-300 
          rounded-full p-2 bg-yellow-300 hover:cursor-pointer
        ">
          <Image
            src={ image3.src }
            alt=""
            width="30"
            height="30"
            className="w-[3-px] h-[30px]"
            onClick={ () => saveAllTheHashtags() }
          />
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default HashtagTree;
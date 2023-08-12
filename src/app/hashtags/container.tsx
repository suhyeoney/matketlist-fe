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
import useDragAndDrop from '@hooks/useDragAndDrop';
import { SearchMatjipInfo } from '@dataTypes/matjip';

interface HashtagTreeProps {
  size : { width: number, height: number },
  closeHashtagTree: () => void,
};

const HashtagTree: React.FC<HashtagTreeProps> = ({ size, closeHashtagTree }) => {

  const location = useSelector((state: RootState) => state.location);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);
  const [ cntHashtag, setCntHashtag ] = useState<number>(0); // 현재 로컬 해시태그 개수 (저장 전)
  const [ hashtagList, setHashtagList ] = useState<HashtagType[]>([]); // 현재 로컬 해시태그 목록 (저장 전)
  const [ isValidResult, setValidationResult ] = useState<boolean>(true);

  const dispatch = useDispatch();
  const dragAndDrop = useDragAndDrop({ 
    data: hashtagList,
    elements: document.querySelectorAll('.hashtag'),
    setState: setHashtagList,
    idPrefix: 'hashtag-',
    containerId: 'hashtagList',
    rootId: 'hashtagTree',
  });

  const createHashtag = () => {
    setCntHashtag(cntHashtag => cntHashtag + 1);
  };

  const minusHashtag = (dataKey: number) => {
    setHashtagList([ ...hashtagList.filter((x: HashtagType) => x.id !== dataKey) ]);
  };

  const checkValidation = (inputValue: string) => {
    if(checkSpaceIncluded(inputValue)) {
      return { result: false, msg: '공백을 포함할 수 없습니다.' };
    }
    if(checkFullHangeulOrEnglish(inputValue)) {
      return { result: false, msg: '한글의 자음 또는 모음 단독으로 구성할 수 없습니다.' };
    }
    if(inputValue.length < 2) {
      return { result: false, msg: '최소 2글자 이상으로 입력해주세요.' };
    }
    if(inputValue.length > 30) {
      return { result: false, msg: '30글자를 초과할 수 없습니다.' };
    }
    return { result: true, msg: null };
  };
  
  const onInputTextChange =  (e: React.ChangeEvent<HTMLInputElement>, dataKey: number)  => {
    const inputValue = e.target.value;
    const currentHashtagList = [ ...hashtagList ];
    const currentHashtag = currentHashtagList.find((e: HashtagType) => e.id === dataKey);
    let validationResult = null;
    // 해시태그명 유효성 검사 시작
    validationResult = checkValidation(inputValue);
    setValidationResult(validationResult.result);
    if(currentHashtag !== undefined) {
      currentHashtag.text = inputValue;
    }
    setHashtagList(currentHashtagList);
    return validationResult;
  };

  const goBackToCards = () => {
    const previousState = location.arrHashtag;
    if(JSON.stringify(hashtagList) === JSON.stringify(previousState)) {
      // 변경 내역이 없는 경우,
      closeHashtagTree();
    } else {
      // 변경 내역이 있는 경우,
      const result = window.confirm('나가시게 되면 변경 내역이 사라지게 됩니다.\n그래도 나가시겠습니까? ❓');
      if(result) {
        closeHashtagTree();
      } else {
        return;
      }
    }
  };

  const saveAllTheHashtags = () => {
    if(hashtagList.length === 0) {
      alert('최소 1개의 해시태그 생성 후, 저장이 가능합니다.');
      return;
    }
    const emptyHashtag = hashtagList.find((e: HashtagType) =>e.text === '');
    if(emptyHashtag) {
      alert('태그명이 비어있는 해시태그가 존재합니다.');
      return;
    }
    const result = window.confirm('해시태그 목록을 저장하시겠어요?');
    if(result) {
      dispatch(updateHashtag(hashtagList));
      const tempArrLocation = location.arrLocation;
      const arrHashtagIds = hashtagList.map((e: HashtagType) => {
        let val = -1;
        val = e.id;
        return val;
      });
      tempArrLocation.map((e: SearchMatjipInfo) => {
        for(const i of e.hashtags) {
          if(!arrHashtagIds.includes(i)) {
            return {
              ...e,
              hashtags: [
                ...e.hashtags.filter((x: number) => x ! == i)
              ]
            };
          }
        }
        return e;
      })
      closeHashtagTree();
    } else {
      return;
    }
  };

  const observeHashtags = () => {
    let hashtags = document.querySelectorAll('.hashtag');
    const io = new IntersectionObserver((
      entries: IntersectionObserverEntry[], observer: IntersectionObserver)=> {
        // console.log('entries target ids', entries.map(({ target, ...rest }) => (target.getAttribute('id'))));
        if(entries[0].isIntersecting) {
          const currentId = Number(entries[0].target.id.split('hashtag-')[1]);
          // console.log('currentId', currentId); // 맨 오른쪽 카드를 entry의 첫번째 원소로 인식하고 있다.
          console.log('currentId', currentId);
        }
      }, 
      { threshold: 0, root: null, rootMargin: `-70% 0% -30% 0%` }
    );
    for(const e of hashtags) {
      io.observe(e);
    }
  };

  const findTheBiggestNumObj = (list: HashtagType[]) => {
    let biggest = list[0];
    list.forEach((x: HashtagType) => {
      if(x.id > biggest.id) {
        biggest = x;
      }
    })
    console.log('biggest', biggest);
    return biggest;
  } 

  useEffect(() => {
    if(location.arrHashtag !== undefined) {
      setHashtagList([ ...location.arrHashtag ]);
    }
  }, []);

  useEffect(() => {
    console.log('hashtagList', hashtagList);
    observeHashtags();
  }, [ hashtagList ]);
  
  useEffect(() => {
    console.log('cntHashtag', cntHashtag);
    if(cntHashtag > 0) {
      const savedHashtagList = location.arrHashtag;
      let biggestHashtagId =  findTheBiggestNumObj(savedHashtagList) !== undefined ? 
      findTheBiggestNumObj(savedHashtagList).id : -1;
      for(let i = 1; i <= cntHashtag; i++) {
        let emptyObj = { 
          id: biggestHashtagId + i, 
          text: '', 
          placeIds: [] 
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
      laptop:h-[87%] px-4
      tablet:h-[87%] px-4
      mobile:h-[89%] px-12
      smallest:h-[85%]
      ${ environmentVariables.backgroundMode ? 'bg-white text-black' : 'bg-[#2A303C] text-white' } 
    `}>
      <div 
        id="hashtagList"
        style={{
          width: `${ size.width * 0.7 }px`,
          // height: `${ size.height * 0.6 }px`,
        }}
        className={`
        flex flex-col gap-5 items-center justify-start 
        snap-mandatory snap-y overflow-y-scroll my-10 scroll-custom-normal
        ${ hashtagList.length === 0 ? 'border-2 border-dotted border-gray-400 rounded-[20px] scrollbar-hide' : null }
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
                onDragStart={ dragAndDrop.dragStart }
                onDragOver={ dragAndDrop.dragOver }
                onDragEnd={ dragAndDrop.dragEnd }
              />
            );
          }) : 
          <div 
            className={`
            absolute top-[50%] bottom-[50%]
            ${ environmentVariables.backgroundMode ? 'text-black' : 'text-white' } 
          `}>
            해시태그 목록이 비어있습니다. 💤
          </div>
        }
      </div>
      <div className="absolute z-5 flex flex-col gap-3 left-3 top-3">
        <button 
          onClick={ () => goBackToCards() }
          className="
          border-2 border-gray-300 
          rounded-full p-2 bg-yellow-300 hover:cursor-pointer
        ">
          <Image
            src={ image1.src }
            alt=""
            width="30"
            height="30"
            className="w-[30px] h-[30px]"
          />
        </button>
      </div>
      <div className="absolute z-5 flex flex-col gap-3 right-3 bottom-3">
        <button 
          onClick={ () => createHashtag() }
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
          />
        </button>
        <button 
          disabled={ isValidResult ? false : true }
          onClick={ () => saveAllTheHashtags() }
          className={`
          border-2 border-gray-300 
          rounded-full p-2 hover:cursor-pointer
          ${ isValidResult ? 'bg-yellow-300' : 'bg-gray-300' }
         `}>
          <Image
            src={ image3.src }
            alt=""
            width="30"
            height="30"
            className="w-[30px] h-[30px]"
          />
        </button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default HashtagTree;
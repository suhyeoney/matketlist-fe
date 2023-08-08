'use client'

import localFont from 'next/font/local';

import { HashtagType } from '@dataTypes/hashtag';
import { RootState } from '@store/store';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkHangeulTextEndsWithJongseong } from '@utils/stringUtils';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { updateHashtag, updateLocation } from '@features/location/locationSlice';

const YeongdeokSea = localFont({
  src: '../assets/fonts/YeongdeokSea.woff'
});

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

type HashtagCheckboxProps = {
  placeId: string,
  setHashtagCheckboxOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const HashtagCheckbox: React.FC<HashtagCheckboxProps> = ({ placeId, setHashtagCheckboxOpen }) => {

  const location = useSelector((state: RootState) => state.location);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const dispatch = useDispatch();
  
  const [ selectedHashtags, setHashtagsChecked ] = useState<HashtagType[]>([]); // 해시태그 고유 넘버 ID로 로컬 저장 진행. 
  const [ isfloatBtnAreaOpen, setFloatBtnAreaOpen ] = useState<boolean>(false);
  const [ joinedSelectedHashtagTexts, setJoinedHashtagTextsSelected ] = useState<string>('');
  const checkboxContainerRef = useRef<HTMLDivElement | null>(null);

  const onClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>, x: HashtagType) => {
    console.log(`${ x.text } checked : ${ e.currentTarget.checked }`);
    const checked = e.currentTarget.checked;
    if(checked) {
      setHashtagsChecked([ ...selectedHashtags, x ]);
    } else {
      setHashtagsChecked([ ...selectedHashtags.filter((i: HashtagType) => i.id !== x.id) ]);
    }
  };

  const joinSelectedHashtagTexts = () => {
    let joinedText = '';
    selectedHashtags.forEach((e: HashtagType, idx: number) => {
      joinedText += `#${ e.text }`
      if(idx < selectedHashtags.length - 1) {
        joinedText += ', ';
      }
    });
    return joinedText;
  };

  const bindChecked = (item: HashtagType) => {
    const targetHashtags = location.arrLocation.find((e: SearchMatjipInfo) => 
    e.placeId === placeId)?.hashtags;
    if(targetHashtags !== undefined) {
    return targetHashtags.find((i: number) => i === item.id) !== undefined ? true : false;
    };
  }

  const onApplyHashtag = () => {
    // 아래 두개의 비지니스 로직 수행
    // i. 맛집 목록 데이터 > 해시태그 ID 추가 (Caution: 넣고자하는 해시태그 ID가 이미 존재할 경우, 중복방지처리 해줘야 한다.)
    // ii. 해시태그 목록 데이터 > 적용한 맛집 ID 추가

    const tempArrLocation = location.arrLocation;
    const tempArrHashtag = location.arrHashtag;
    const arrHashtagIds = selectedHashtags.map((e: HashtagType) => {
      let val = -1;
      val = e.id;
      return val;
    });

    console.log(
      tempArrLocation.map((e: SearchMatjipInfo) => {
        if(e.placeId === placeId) {
          console.log(`arrHashtagIds, ${arrHashtagIds}`);
          return {
            ...e, 
            hashtags: [                          
              ...arrHashtagIds
          ]};
        }
        if(e.hashtags.findIndex((i: number) => typeof i === 'string') > -1) {
          return {
            ...e, 
            hashtags: [
              ...e.hashtags.filter((i: number) => typeof i === 'number')
          ]};
        }
        return e;
      })
    );

    console.log(
      tempArrHashtag.map((e: HashtagType) => {
        if(selectedHashtags.findIndex((i: HashtagType) => i.id === e.id) > -1) {
          if(!selectedHashtags.find((i: HashtagType) => i.id === e.id)?.placeIds.includes(placeId)) {
            return {
              ...e,
              placeIds: [
                ...e.placeIds.filter((i: string) => i.length > 0), placeId
            ]};
          }
        } else {
          return {
            ...e,
            placeIds: [
              ...e.placeIds.filter((i: string) => i.length > 0).filter((i: string) => i !== placeId)
          ]};
        }
        return e;
      })
    );

    dispatch(updateLocation(
      tempArrLocation.map((e: SearchMatjipInfo) => {
        if(e.placeId === placeId) {
          console.log(`arrHashtagIds, ${arrHashtagIds}`);
          return {
            ...e, 
            hashtags: [                          
              ...arrHashtagIds
          ]};
        }
        if(e.hashtags.findIndex((i: number) => typeof i === 'string') > -1) {
          return {
            ...e, 
            hashtags: [
              ...e.hashtags.filter((i: number) => typeof i === 'number')
          ]};
        }
        return e;
      })
    ));

    dispatch(updateHashtag(
      tempArrHashtag.map((e: HashtagType) => {
        if(selectedHashtags.findIndex((i: HashtagType) => i.id === e.id) > -1) {
          if(!selectedHashtags.find((i: HashtagType) => i.id === e.id)?.placeIds.includes(placeId)) {
            return {
              ...e,
              placeIds: [
                ...e.placeIds.filter((i: string) => i.length > 0), placeId
            ]};
          }
        } else {
          return {
            ...e,
            placeIds: [
              ...e.placeIds.filter((i: string) => i.length > 0).filter((i: string) => i !== placeId)
          ]};
        }
        return e;
      })
    ));

    setFloatBtnAreaOpen(false);
    setHashtagCheckboxOpen(false);
  };

  useEffect(() => {
    setHashtagsChecked([ 
      ...location.arrHashtag.filter((e: HashtagType) => e.placeIds.includes(placeId)) 
    ]);
  }, []);

  useEffect(() => {
    console.log('현재 선택된 해시태그', selectedHashtags);
    setFloatBtnAreaOpen(true);
    if(selectedHashtags.length > 0) {
      setJoinedHashtagTextsSelected(joinSelectedHashtagTexts());
    }
    // setTimeout(() => {
    //   setFloatBtnAreaOpen(false); // 플로트버튼영역은 오픈하고 3초 후 다시 클로즈됨.
    // }, 3000)
  }, [ selectedHashtags ]);

  return (
    <div 
      id="checkboxContainer"  
      ref={ checkboxContainerRef }
      className={`
      relative flex items-center justify-center
      grid grid-cols-2 overflow-y-scroll scrollbar-hide p-2 self-center rounded-[10px]
      laptop:w-[185px] h-[98%] text-[13px]
      tablet:w-[185px] h-[98%] text-[13px]
      ${ environmentVariables.backgroundMode ? 'bg-white text-black' : 'bg-[#2A303C] text-white' }
    `}>
      { location.arrHashtag.map((x: HashtagType, idx: number) => {
        return (
          <div 
            key={ idx }
            id={`checkbox-${ idx }`}
            className="
            flex flex-row items-start justify-start gap-2 self-start p-1
          ">
            <input 
              type="checkbox"
              name={`checkbox-${ x.id }`}
              defaultChecked={ bindChecked(x) }
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onClickCheckbox(e, x) }
              className="self-start"
            />
            <label 
              htmlFor={`checkbox-${ x.id }`}
              className={`
              ${ YeongdeokSea.className }
            `}><span></span>{ `#${ x.text }` }</label>
          </div>
        );
      })}
      { isfloatBtnAreaOpen ? 
        <div 
          className={`
          fixed z-30 bottom-0 left-0 right-0 w-full flex flex-col items-center justify-center gap-5
          rounded-tl-[10px] rounded-tr-[10px]
          laptop:h-[140px]
          tablet:h-[140px]
          mobile:h-[120px]
          smallest:h-[60px]
          ${ environmentVariables.backgroundMode ? 'bg-[#2A303C] text-white' : 'bg-white text-black' }
        `}>
          { selectedHashtags.length > 0 ? 
          <div className="
            flex flex-col items-center justify-center gap-1 cursor-default w-full
          ">
            <div 
              className={`
              flex flex-row items-center justify-center gap-0 truncate ...
              ${ YeongdeokSea.className }
            `}>
              <span 
                className={`
                self-center text-red-500
              `}>
                { joinedSelectedHashtagTexts }
              </span>
              <span 
                className={`
                ${ environmentVariables.backgroundMode ? 'text-white' : 'text-black' }
              `}>
                { checkHangeulTextEndsWithJongseong(joinedSelectedHashtagTexts) ? ' 가 선택됨' : ' 이 선택됨' }
              </span>
            </div>
            <div 
              className={`
              ${ YeongdeokSea.className }
              self-center text-red-500
            `}>
              { `지금 ${ selectedHashtags.length }개 골랐어요!` }
            </div>
          </div> : 
          <div 
            className={`
            ${ YeongdeokSea.className }
            flex items-center justify-center text-red-500
          `}>
            등록되어있는 해시태그를 골라 적용해보세요! 😎
          </div> }
          <div 
            className={`
            flex flex-row items-center justify-center gap-2 w-full
            ${ Tenada.className }
          `}>
            <button 
              onClick={ () => setHashtagCheckboxOpen(false) }
              className="float-left w-[48%] border border-gray-500 rounded-[3px] p-1"
            >돌아가기</button>
            <button 
              onClick={ () => onApplyHashtag() }
              className="float-right w-[48%] border border-gray-500 rounded-[3px] p-1"
            >적용완료</button>
          </div>
        </div> : null
      }
    </div>
  );
};

export default HashtagCheckbox;
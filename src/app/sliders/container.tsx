'use client'

import localFont from 'next/font/local';
import Image from 'next/image';

import Card from '@sliders/card';
import { RootState } from '@store/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { setHashtagTreeOpen, setMyMatjipSlidersOpen } from '@store/features/modalControl/slice';
import RegionSelectbox from '@main/regionSelectbox';
import SearchInputbox from '@sliders/searchInputbox';
import { data } from '@utils/dataForRegion/data';
import { createSignal } from '@react-rxjs/utils';
import { Subscribe, bind } from '@react-rxjs/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { useWindowSize } from '@hooks/useWindowSize';
import image1 from '@assets/icons/hashtag-btn.png';
import HashtagTree from '@hashtags/container';

// rxjs
const [ keywordChange$, setKeyword ] = createSignal<string>();
const [ useKeyword, keyword$ ] = bind(
  keywordChange$.pipe(
    debounceTime(300),
    distinctUntilChanged()
  ), '');

interface MatjipSlidersProps {
  size : { width: number, height: number },
  setPosition: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
  }>>
}

interface RegionType {
  key: string,
  name: string | string[],
};

interface CardDataType {
  id: number,
  placeId: string,
  name: string,
  latitude: number,
  longitude: number,
  address: string,
  region: RegionType,
  userRegisterDate: string,
  compoundCode: string,
  hashtags: number[],
};

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const MatjipSliders: React.FC<MatjipSlidersProps> = ({ size, setPosition }) => {

  const modalControl = useSelector((state: RootState) => state.modalControl);
  const location = useSelector((state: RootState) => state.location);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const dispatch = useDispatch();
  const keyword = useKeyword();
  const windowSize = useWindowSize();

  const [ regionCode, setRegionCode ] = useState<string>(data[0]?.key);
  const [ matjipListData, setMatjipListData ] = useState<CardDataType[]>();
  const [ currentCardSequence, setCurrentCardSequence ] = useState<number>(0);
  const [ isChangedToHashtagMgmt, setChangedToHashtagMgmt ] = useState<boolean>(false);

  const convertWithRegionCode = (address: string, compoundCode: string) => {
    const arrAddress = address.split(' ');
    const upperCityName = arrAddress[0];
    const remains = arrAddress.filter((e: string, idx: number) => idx > 0);
    let val = { key: '', name: '' };
    if(compoundCode !== undefined && (compoundCode.includes('특별시') || compoundCode.includes('광역시'))) {
      let found = data.find(e => e.name.includes(compoundCode.split(' ')[1].substring(0, 2)));
      if(found !== undefined) {
        if(typeof found?.name === 'string') {
          return { 
            key: found.key,
            name: found.name,
          };
        } else {
          return { 
            key: found.key,
            name: found.name[1]
          };
        }
      }
    }
    if(address.includes('Seoul')) {
      return { key: 'RC001', name: '서울' };
    }
    data.forEach((region: RegionType) => {
      if(region !== undefined) {
        switch(typeof region.name) {
          case 'string':
            if(upperCityName.includes(region?.name) || remains.includes(region?.name)) {
              val.key = region.key;
              val.name = region.name;
            }
            break;
          case 'object':
            if(region.name.find((e: string) => e === upperCityName)) {
              val.key = region.key;
              val.name = region.name[1];
            } else {
              region.name.forEach((e: string) => {
                remains.find((x: string) => {
                  if(e === x) {
                    val.key = region.key;
                    val.name = region.name[1];
                    return;
                  }
                });
              });
            }
            break;
        }
      }
    });
    return val;
  };

  const closeModal = () => {
    document.querySelector('#matjipCardsWrapper')?.classList.replace('animate-openFromRight', 'animate-closeToRight');
    setTimeout(() => {
      dispatch(setMyMatjipSlidersOpen(false));
      dispatch(setHashtagTreeOpen(false));
      setCurrentCardSequence(0);
    }, 1000);
	};

  const openHashtagTree = () => {
    dispatch(setHashtagTreeOpen(true));
  };

  const closeHashtagTree = () => {
    document.querySelector('#hashtagTree')?.classList.replace('animate-openFromRight', 'animate-closeToRight');
    setTimeout(() => {
      dispatch(setHashtagTreeOpen(false));
    }, 1000);
  };

  const observeSliders = () => {
    let matjipCards = document.querySelectorAll('.matjipCard');
    // const matjipCardsWrapper = document.querySelector('#matjipCardsWrapper');
    const io = new IntersectionObserver((
      entries: IntersectionObserverEntry[], observer: IntersectionObserver)=> {
        // console.log('entries target ids', entries.map(({ target, ...rest }) => (target.getAttribute('id'))));
        if(entries[0].isIntersecting) {
          const currentId = Number(entries[0].target.id.split('card-')[1]);
          // console.log('currentId', currentId); // 맨 오른쪽 카드를 entry의 첫번째 원소로 인식하고 있다.
          setCurrentCardSequence(currentId + 1);
          matjipCards.forEach((card: Element, idx: number) => {
            if(idx !== currentId) {
              matjipCards[idx].classList.remove('border-4');
              matjipCards[idx].classList.remove(environmentVariables.backgroundMode ?
                'border-[#552594]' : 'border-lime-300');
              matjipCards[idx].classList.remove('rounded-[16px]');
              matjipCards[idx].classList.add('pointer-events-none');
            } else {
              matjipCards[idx].classList.add('border-4');
              matjipCards[idx].classList.add(environmentVariables.backgroundMode ? 
                'border-[#552594]' : 'border-lime-300');
              matjipCards[idx].classList.add('rounded-[16px]');
              matjipCards[idx].classList.remove('pointer-events-none');

            }
          });
        }
      }, 
      { threshold: 0, root: null, rootMargin: `0% -50% 0% -50%` }
    );
    for(const e of matjipCards) {
      io.observe(e);
    }
  };

  useEffect(() => {
    setMatjipListData([
      ...location.arrLocation.map((e: SearchMatjipInfo, idx: number) => {
        let obj: CardDataType = { 
          id: 0, 
          placeId: '', 
          name: '', 
          latitude: 0, 
          longitude: 0, 
          address: '', 
          region: { 
            key: '', 
            name: ''
          }, 
          userRegisterDate: '' ,
          compoundCode: '',
          hashtags: []
        };
        obj['id'] = idx;
        obj['placeId'] = e.placeId;
        obj['name'] = e.name ?? '';
        obj['latitude'] = e.latitude;
        obj['longitude'] = e.longitude;
        obj['address'] = e.address ?? '';
        obj['region'] = e.address ? convertWithRegionCode(e.address, e.compoundCode) : { key: '', name: '' };
        obj['userRegisterDate'] = e.userRegisterDate;
        obj['compoundCode'] = e.compoundCode;
        obj['hashtags'] = e.hashtags;
        return obj;
      }).filter((e: any) => regionCode !== 'RC000' ? e.region.key === regionCode : true)
      .filter((x: any) => keyword?.length > 0 ?
       x.name?.includes(keyword) || x.address?.includes(keyword) : true)
    ]);
  }, [ location.arrLocation, regionCode, keyword ]);

  useEffect(() => {
    if(matjipListData !== undefined && matjipListData?.length > 0) {
      observeSliders();
    } else {
      setCurrentCardSequence(0);
    }

  }, [ matjipListData ]);

  useEffect(() => {
    if(modalControl.isHashtagTreeOpen) {
      setTimeout(() => {
        setChangedToHashtagMgmt(true);
      }, 1000);
    } else {
      setChangedToHashtagMgmt(false);
    }
  }, [ modalControl.isHashtagTreeOpen ]);

  return (
    <>
      { modalControl.isMyMatjipSlidersOpen ?
        <>
          <div className="flex justify-center items-center absolute z-20 w-screen h-screen opacity-50 bg-gray-700"></div>
        </> : null
      }
      <div 
        id="matjipCardsWrapper"
        style={{
          width: `${ size.width >= size.height ? size.width * 0.6 : size.width * 0.9  }px`, 
          height: `${ size.width >= size.height ? size.height * 0.7 : size.width >= 375 ? size.height * 0.7 : size.height * 0.85 }px`
        }}
        className={`
          absolute z-40 border-2 flex flex-col gap-3 rounded-[10px] animate-openFromRight
          ${ environmentVariables.backgroundMode ? 'bg-white border-slate-950' : 'bg-[#2A303C] border-white' }
          laptop:p-5
          tablet:p-5
          mobile:p-2
          smallest:p-1
        `}>
        <div className={`
          flex items-center justify-between pl-2 pr-2 pt-1 pb-3 border-b-2 border-gray-600
        `}>
          <h3 className={`
            ${ Tenada.className }
            ${ environmentVariables.backgroundMode ? 'text-[#2A303C]' : 'text-white' } 
            laptop:text-2xl
            tablet:text-2xl
            mobile:text-1xl
          `}>🦐 내 맛집 목록 { isChangedToHashtagMgmt ? '> 해시태그 관리' : null }</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 cursor-pointer" fill="none" viewBox="0 0 24 24"
            stroke={`${ environmentVariables.backgroundMode ? '#2A303C' : 'white' }`} 
            onClick={ closeModal }
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
          { matjipListData !== undefined ? 
          <>
              <div className="
                flex flex-row items-center justify-center h-[15%] border-2 border-gray-300 rounded-[10px] p-2
              ">
                <RegionSelectbox data={ data } setRegionCode={ setRegionCode } />
                <Subscribe>
                  <SearchInputbox 
                    setKeyword={ setKeyword } 
                    placeholder={ windowSize.width >= 768 ? '맛집 상호명 입력' : '목록 내 검색하기' } 
                  />
                </Subscribe>
              </div>
              <div 
                id="sliderContainer"
                className={`
                  relative snap-mandatory snap-x flex gap-6 pt-2 
                  w-full h-full overflow-x-scroll scroll-custom-normal
                  ${ matjipListData.length === 0 ? 
                    'items-center justify-center border-2 border-dotted border-gray-400 rounded-[20px] scrollbar-hide' : null }
              `}>
                { matjipListData.length > 0 ?
                <>
                  <div className={`
                    snap-center shrink-0 h-[100%]
                    laptop:w-[35%]
                    tablet:w-[30%]
                    mobile:w-[10%]
                    smallest:w-[10%]
                    ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
                  `}>
                    <div className="shrink-0"></div>
                  </div>
                  { matjipListData.map((e: CardDataType, idx: number) => {
                    return (
                      <Card key={ idx } dataKey={ idx } data={ e } setPosition={ setPosition } closeModal={ closeModal } />
                    );
                  })}
                  <div className={`
                    snap-center shrink-0 h-[100%]
                    laptop:w-[35%]
                    tablet:w-[30%]
                    mobile:w-[10%]
                    smallest:w-[10%]
                    ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
                  `}>
                    <div className="shrink-0"></div>
                  </div>
                </> :
                <div 
                  className={`
                  absolute top-[50%] bottom-[50%]
                  ${ environmentVariables.backgroundMode ? 'text-black' : 'text-white' } 
                `}>
                  내 맛집 목록이 비어있습니다. 💤
                </div>
                }
              </div>
            <div className="flex items-center justify-center">
              <span className={`
                font-semibold
                ${ environmentVariables.backgroundMode ? 'text-[#2A303C]' : 'text-white' }
              `}>
                { currentCardSequence } / {matjipListData.length }
              </span>
            </div>
        </> 
        : null
        }
        { modalControl.isHashtagTreeOpen ? <HashtagTree size={ size } closeHashtagTree={ closeHashtagTree } /> : null }
        <div 
          className="
          absolute z-15 bottom-3 right-3 rounded-full bg-orange-200 border-4 border-orange-400 
          p-3 animate-bounceDefault hover:cursor-pointer
          "
          onClick={ () => openHashtagTree()  }
        >
          <Image
            src={ image1.src }
            alt=""
            width="25"
            height="25"
            className="w-[25px] h-[25px]"
          />
        </div>
      </div>
    </>
  );
};

export default MatjipSliders;
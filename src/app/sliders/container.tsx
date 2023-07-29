'use client'

import Card from '@sliders/card';
import { RootState } from '@store/store';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { data } from '@utils/dataForRegion/data';
import { setMyMatjipSlidersOpen } from '@features/modalControl/modalControlSlice';
import localFont from 'next/font/local';
import RegionSelectbox from '@main/regionSelectbox';
import SearchInputbox from '@sliders/searchInputbox';

type MatjipSlidersProps = {
  size : { width: number, height: number },
  setPosition: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
  }>>
}

type RegionType = {
  key: string,
  name: string | string[],
} | undefined;

type CardDataType = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  address: string,
  region: RegionType,
  userRegisterDate: string,
};

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});

const MatjipSliders: React.FC<MatjipSlidersProps> = ({ size, setPosition }) => {

  const modalControl = useSelector((state: RootState) => state.modalControl);
  const location = useSelector((state: RootState) => state.location);
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const dispatch = useDispatch();

  const [ matjipListData, setMatjipListData ] = useState<CardDataType[]>();
  const [ currentCardSequence, setCurrentCardSequence ] = useState<number>(0);

  const convertWithRegionCode = (address: string) => {
    const arrAddress = address.split(' ');
    const upperCityName = arrAddress[0];
    const remains = arrAddress.filter((e: string, idx: number) => idx > 0);
    let val = { key: '', name: '' };
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
    }, 1000);
	};

  const observeSliders = () => {
    const matjipCards = document.querySelectorAll('.matjipCard');
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
              matjipCards[idx].classList.remove('border-double');
              matjipCards[idx].classList.remove('border-8');
              matjipCards[idx].classList.remove('border-red-200');
              matjipCards[idx].classList.remove('rounded-[18px]');
            } else {
              matjipCards[idx].classList.add('border-double');
              matjipCards[idx].classList.add('border-8');
              matjipCards[idx].classList.add('border-red-200');
              matjipCards[idx].classList.add('rounded-[18px]');
            }
          });
        }
      }, 
      { 
        threshold: 0,
        root: null,
        rootMargin: `0% -50% 0% -50%`
        // rootMargin: `0px ${ Math.abs(size.width - 100 / 2) }px 0px ${ Math.abs(size.width - 100 / 2) }px`
    });
    for(const e of matjipCards) {
      io.observe(e);
    }
  };

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    setMatjipListData([
      ...location.arrLocation.map((e: SearchMatjipInfo, idx: number) => {
        const obj = { id: 0, name: '', latitude: 0, longitude: 0, address: '', region: { key: '', name: '' }, userRegisterDate: '' };
        obj.id = idx;
        obj.name = e.name ?? '';
        obj.latitude = e.latitude;
        obj.longitude = e.longitude;
        obj.address = e.address ?? '';
        obj.region = e.address ? convertWithRegionCode(e.address) : { key: '', name: '' };
        obj.userRegisterDate = e.userRegisterDate;
        return obj;
      }) 
    ]);
  }, [ location.arrLocation ]);

  useEffect(() => {
    // console.log('cardData', matjipListData);
    observeSliders();
  }, [ matjipListData ]);

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
          height: `${ size.width >= size.height ? size.height * 0.7 : size.width >= 330 ? size.height * 0.7 : size.height * 0.9 }px`
        }}
        className={`
          absolute z-40 border-4 border-gray-400 flex flex-col gap-3 animate-openFromRight
          ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
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
            laptop:text-2xl
            tablet:text-2xl
            mobile:text-1xl
          `}>🦐 내 맛집 목록</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 cursor-pointer" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" onClick={ closeModal }>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        { matjipListData !== undefined ? 
        <>
        <div className="
          flex flex-row items-center justify-between h-[15%] border-2 border-gray-300 rounded-[10px] p-2
        ">
          <RegionSelectbox />
          <SearchInputbox />
        </div>
        <div 
          className="
            relative snap-mandatory snap-x flex gap-6 pt-2
            w-full h-full overflow-x-auto
        ">
        <div className={`
          snap-center shrink-0 h-[100%]
          laptop:w-[35%]
          tablet:w-[30%]
          mobile:w-[10%]
          smallest:w-[10%]
          ${ environmentVariables.backgroundMode ? 'bg-white' : 'bg-[#2A303C]' }
        `}>
          <div 
            // style={{width: `${ (size.width >= size.height ? size.width * 0.6 : size.width * 0.9) / 4 }px`}} 
            className="shrink-0"></div>
        </div>
        { matjipListData.map((e: CardDataType, idx: number) => {
          return (
            <Card key={ idx } data={ e } setPosition={ setPosition } closeModal={ closeModal } />
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
          <div 
            // style={{width: `${ (size.width >= size.height ? size.width * 0.6 : size.width * 0.9) / 4 }px`}} 
            className="shrink-0"></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <span className="font-semibold">{ currentCardSequence } / { location.cntLocation }</span>
      </div>
      </> : null
      }

      </div>
    </>
  );
};

export default MatjipSliders;
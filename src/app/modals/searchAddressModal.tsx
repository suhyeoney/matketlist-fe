'use client'

import localFont from 'next/font/local';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setSearchAddressModalOpen } from '@store/features/modalControl/slice';
import { useEffect, useState } from 'react';
import MainService from '@services/main.service';
// import SearchResultsTable from '@tables/searchResultsTable';
import SearchInputbox from './searchInputbox';
import { Subscribe, bind } from '@react-rxjs/core';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import { createSignal } from '@react-rxjs/utils';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { addLocation } from '@store/features/location/slice';
import { storeInputMajip } from '@store/features/inputControl/slice';
import { getToday } from '@utils/dateUtils';

// rxjs
const [ keywordChange$, setKeyword ] = createSignal<string>();
const [ useKeyword, keyword$ ] = bind(
  keywordChange$.pipe(
    debounceTime(300),
    distinctUntilChanged()
  ), '');

interface SearchAddressModalProps {
  size : { width: number, height: number },
};

const Tenada = localFont({
  src: '../assets/fonts/Tenada.woff'
});
  
const SearchAddressModal: React.FC<SearchAddressModalProps> = ({ size }) => {

  const [ searchResultsOrigin, setSearchResultsOrigin ] = useState<any>(undefined);
  const [ searchResultsCopy, setSearchResultsCopy ] = useState<any>(undefined);
  const [ page, setPage ] = useState<number>(0);
  const [ isRegistering, setRegisteringStatus ] = useState<boolean>(false);

	const modalControl = useSelector((state: RootState) => state.modalControl);
  const inputControl = useSelector((state: RootState) => state.inputControl);
  const location = useSelector((state: RootState) => state.location)
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

	const dispatch = useDispatch();
  const keyword = useKeyword();

	const closeModal = () => {
    // DOM에서 모달 엘리먼트가 닫혀서 사라지면, hideModal 에니메이션이 동작할 수 없으므로 
    // 엘리먼트가 실제로 사라지기 전까지 짧게 인터벌을 주고 그 인터벌 사이에 클래스를 
    // hideModal 에니메이션으로 replace 시킴
    document.querySelector('#searchAddressModalWrapper')?.classList.replace('animate-showModal', 'animate-hideModal');
    setTimeout(() => {
      dispatch(setSearchAddressModalOpen(false));
    }, 500);
	};

  const fetchResults = async () => {
    const paramsLocalSearch = {
      query: inputControl.inputMatjip,
      key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
      // display: 5,
      // start: 10,
      // sort: 'random'
    };
    const searchResults = await MainService.getLocalSearchDataApi(paramsLocalSearch);
    
    if(searchResults.length > 0) {
      const formattedResults = searchResults.map((e: any) => {
        let newObj = { 
          address: '', 
          name : '', 
          iconUrl: '', 
          latitude: 0, 
          longitude: 0,
          phoneNumber: '',
          placeId: '',
        };
        newObj['address'] = e.formatted_address.includes('대한민국') ? e.formatted_address.split('대한민국 ')[1] : e.formatted_address;
        newObj['name'] = e.name;
        newObj['iconUrl'] = e.icon;
        newObj['latitude'] = e.geometry.location.lat;
        newObj['longitude'] = e.geometry.location.lng;
        newObj['placeId'] = e.place_id;

        return newObj;
      });

      setSearchResultsOrigin(formattedResults);
      setSearchResultsCopy(formattedResults);
    } else {
      setSearchResultsOrigin([]);
      setSearchResultsCopy([]);
    }
  };

  const registerMatjip = async (e: SearchMatjipInfo) => {
    
    setRegisteringStatus(true);

    const inputLatitude = e.latitude;
    const inputLongitude = e.longitude;
    const inputName = e.name;
    const inputAddress = e.address;
    const inputIconUrl = e.iconUrl;
    const inputPlaceId = e.placeId;

    const isDuplicated = location.arrLocation.find(
      (e: SearchMatjipInfo) => { return e.latitude === inputLatitude && e.longitude === inputLongitude });
    if(isDuplicated) {
      alert('해당 맛집은 이미 등록되어 있습니다.');
      setRegisteringStatus(false);
      return;
    }

    const paramsPlaceDetail = {
      placeid: e.placeId,
      key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
    };
    const placeDetailResult = await MainService.getPlaceDetailDataApi(paramsPlaceDetail);
    const getPhoneNumber = placeDetailResult.formatted_phone_number;
    const getWebsiteUrl = placeDetailResult.website;
    
    dispatch(addLocation({ 
      latitude: inputLatitude, 
      longitude: inputLongitude, 
      name: inputName, 
      address: inputAddress, 
      iconUrl: inputIconUrl, 
      placeId: inputPlaceId, 
      phoneNumber: getPhoneNumber ?? '-',
      website: getWebsiteUrl ?? '-',
      userRegisterDate: getToday('Asia/Seoul'),
    }));
    alert('맛집이 정상적으로 등록되었습니다.');
    dispatch(storeInputMajip(null));
    setRegisteringStatus(false);
    closeModal();
  };

	useEffect(() => {
    if(modalControl.isSearchAddressModalOpen) {
      fetchResults();
    } else {
      setSearchResultsOrigin(undefined);
      setSearchResultsCopy(undefined);
    }
	}, []);

  useEffect(() => {
    if(searchResultsOrigin?.length < 1) {
      alert('검색 결과가 존재하지 않습니다.');
      dispatch(setSearchAddressModalOpen(false));
      return;
    }
  }, [ searchResultsOrigin ]);

  const filter = (keyword: string, dataSet: any[]) => {
    return dataSet.filter(
      (e: SearchMatjipInfo) => e.name?.includes(keyword) || e.address?.includes(keyword));
  };

  useEffect(() => {
    setPage(1);
    if(keyword?.length < 1) {
      setSearchResultsCopy(searchResultsOrigin);
      return;
    }
    if(searchResultsCopy !== undefined || searchResultsCopy?.length < 1) {
      setSearchResultsCopy(filter(keyword, searchResultsOrigin));
      return;
    }

  }, [ keyword ]);

  return (
    <>
      { modalControl.isSearchAddressModalOpen ?
        <>
          <div className="flex justify-center items-center absolute z-10 w-screen h-screen opacity-50 bg-gray-700"></div>
        </> : null
      }
      <div 
        className="container flex justify-center mx-auto">
        <div
          className="absolute z-20 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
        >
          <div 
            id="searchAddressModalWrapper"
            style={{
              width: `${ size.width >= size.height ? 600 : size.width * 0.9  }px`, 
              height: `${ size.width >= size.height ? size.height * 0.7 : size.width >= 375 ? size.height * 1.1 : size.height * 1.1 }px`
            }}
            className={`
              px-5 py-1 divide-y divide-gray-500 border-2 animate-showModal
              ${ environmentVariables.backgroundMode ? 'bg-white border-slate-950' : 'bg-[#2A303C] border-white' }
          `}>
            <div 
              className="flex items-center justify-between py-3"
            >
            <h3 className={`
              ${ Tenada.className }
              ${ environmentVariables.backgroundMode ? 'text-[#2A303C]' : 'text-white' } 
              laptop:text-2xl
              tablet:text-2xl
              mobile:text-1xl
            `}>🦐 검색 결과</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 cursor-pointer" fill="none" viewBox="0 0 24 24"
                stroke={`${ environmentVariables.backgroundMode ? '#2A303C' : 'white' }`} 
                onClick={ closeModal }
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Subscribe>
                <div className="
                  flex items-center justify-center w-full
                ">
                  <SearchInputbox 
                    setKeyword={ setKeyword } 
                    placeholder={ '검색 결과 내 키워드로 조회' } 
                  />
                </div>
                {/* <SearchResultsTable 
                  size={ size }
                  data={ searchResultsCopy } 
                  page={ page }
                  isRegistering={ isRegistering }
                  setData={ setSearchResultsCopy } 
                  setPage={ setPage }
                  registerMatjip={ registerMatjip } 
                /> */}
              </Subscribe>
            </div>
          </div>
        </div>
      </div>
    </>
	);
};

export default SearchAddressModal;
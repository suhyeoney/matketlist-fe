'use client'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchAddressModalOpen } from '../features/modalControl/modalControlSlice';
import { useEffect, useState } from 'react';
import MainService from '../services/main.service';
import SearchResultsTable from '../tables/searchResultsTable';
import SearchInputbox from './searchInputbox';
import { Subscribe, bind } from '@react-rxjs/core';
import { SearchMatjipInfo } from '../dataTypes/Matjip';
import { createSignal } from '@react-rxjs/utils';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { isEmpty } from '../utils/stringUtils';

const [ keywordChange$, setKeyword ] = createSignal<string>();
const [ useKeyword, keyword$ ] = bind(
  keywordChange$.pipe(
    debounceTime(300),
    distinctUntilChanged()
  ), '');
  
const SearchAddressModal: React.FC = () => {

  const [ searchResultsOrigin, setSearchResultsOrigin ] = useState<any>(undefined);
  const [ searchResultsCopy, setSearchResultsCopy ] = useState<any>(undefined);

	const modalControl = useSelector((state: RootState) => state.modalControl);
  const inputControl = useSelector((state: RootState) => state.inputControl);

	const dispatch = useDispatch();
  const keyword = useKeyword();

	const closeModal = () => {
		dispatch(setSearchAddressModalOpen(false));
	};

  const fetchResults = async () => {
    const params = {
      query: inputControl.inputMatjip,
      key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
      // display: 5,
      // start: 10,
      // sort: 'random'
    };
    const searchResults = await MainService.getLocalSearchDataApi(params);
    if(searchResults.length > 0) {
      const formattedResults = searchResults.map((e: any) => {
        let newObj = { 
          address: '', 
          name : '', 
          iconUrl: '', 
          latitude: 0, 
          longitude: 0 
        };
        newObj['address'] = e.formatted_address.includes('대한민국') ? e.formatted_address.split('대한민국 ')[1] : e.formatted_address;
        newObj['name'] = e.name;
        newObj['iconUrl'] = e.icon;
        newObj['latitude'] = e.geometry.location.lat;
        newObj['longitude'] = e.geometry.location.lng;

        return newObj;
      });

      setSearchResultsOrigin(formattedResults);
      setSearchResultsCopy(formattedResults);
    } else {
      setSearchResultsOrigin([]);
      setSearchResultsCopy([]);
    }
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
    if(keyword?.length < 1) {
      setSearchResultsCopy(searchResultsOrigin);
      return;
    }
    if(searchResultsCopy?.length < 1) {
      setSearchResultsCopy(filter(keyword, searchResultsOrigin));
      return;
    }
    if(searchResultsCopy !== undefined) {
      setSearchResultsCopy(filter(keyword, searchResultsCopy));
      return;
    }

  }, [ keyword ]);

  return (
		<div className="container flex justify-center mx-auto">
      <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div className=" p-6 bg-white divide-y divide-gray-500 w-[800px] h-[600px] rounded-[20px]">
            <div className="flex items-center justify-between pb-[15px]">
                <h3 className="text-2xl">🦐 검색결과 (현재 위치 기준 최대 20곳 목록 표시)</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 cursor-pointer" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" onClick={ closeModal }>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
          <div className="flex flex-col justify-center items-center py-3">
            <Subscribe>
              <div>
                <SearchInputbox setKeyword={ setKeyword } />
              </div>
              <SearchResultsTable data={ searchResultsCopy } />
            </Subscribe>
          </div>
        </div>
			</div>
		</div>
	);
};

export default SearchAddressModal;
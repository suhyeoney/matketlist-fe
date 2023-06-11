'use client'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchAddressModalOpen } from '../features/modalControl/modalControlSlice';
import { useCallback, useEffect, useState } from 'react';
import MainService from '../services/main.service';
import SearchResultsTable from '../tables/SearchResultsTable';

const SearchAddressModal: React.FC = () => {

  const [ searchResults, setSearchResults ] = useState<any>([]);

	const modalControl = useSelector((state: RootState) => state.modalControl);
  const inputControl = useSelector((state: RootState) => state.inputControl);

	const dispatch = useDispatch();

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
        let newObj = { address: '', name : '', iconUrl: '', latitude: 0, longitude: 0 };
        newObj['address'] = e.formatted_address.includes('대한민국') ? e.formatted_address.split('대한민국 ')[1] : e.formatted_address;
        newObj['name'] = e.name;
        newObj['iconUrl'] = e.icon;
        newObj['latitude'] = e.geometry.location.lat;
        newObj['longitude'] = e.geometry.location.lng;

        return newObj;
      });

      formattedResults.push({
        name: '가가가가가가가가가가가가가가가가가가가가가가가가',
        address: '가가가가가가가가가가가가가가가가가가가가가가가가',
        iconUrl: '',
        latitude: 0,
        longitude: 0
      });

      
      
      setSearchResults(formattedResults);
    }
  };

	useEffect(() => {
    if(modalControl.isSearchAddressModalOpen) {
      fetchResults();
    } else {
      setSearchResults([]);
    }
	}, []);

  useEffect(() => {
    console.log(searchResults);
  }, [ searchResults ]);

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
          <div className="flex flex-row justify-center items-center">
            <SearchResultsTable data={ searchResults } /> :
          </div>
        </div>
			</div>
		</div>
	);
};

export default SearchAddressModal;
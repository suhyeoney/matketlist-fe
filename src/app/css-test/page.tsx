'use client'

import { SearchMatjipInfo } from '@dataTypes/matjip';
import { getLocalSearchData } from '@features/api/mainApiSlice';
import LoadingSpinner03 from '@spinners/loadingSpinner03';
import { RootState } from '@store/store';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CssTest: React.FC = () => {

  // const [ localSearchData, setLocalSearchData ] = useState<SearchMatjipInfo[]>();
  const [ placeDetailData, setPlaceDetailData ] = useState<SearchMatjipInfo>();
  const [ inputText, setInputText ] = useState<string>('');

  const mainApi = useSelector((state: RootState) => state.mainApi);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getLocalSearchData({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
      query: '카레야상'
    }));
  }, []);

  useEffect(() => {
    setPlaceDetailData(mainApi.placeDetailData);
  }, [ mainApi.placeDetailData ]);

  useEffect(() => {
    if(placeDetailData !== undefined) {
      console.log(placeDetailData);
    }
  }, [ placeDetailData ]);

  const search = useCallback(() => {
    dispatch(getLocalSearchData({ 
      key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY, 
      query: inputText
    }));
  }, [ inputText ]);


  return (
    <div className="h-screen p-5">
      {/* <div className="flex flex-col items-center gap-12">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </div> */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <input onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value) } />
          <button className="btn" onClick={ () => search() }>검색</button>
        </div>
        <div className="flex items-start justify-start">
          { JSON.stringify(placeDetailData) }
        </div>
      </div>
    </div>
  );
};

export default CssTest;
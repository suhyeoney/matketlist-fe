'use client'

import { useSelector } from 'react-redux';
import SearchAddressModal from '../modals/searchAddressModal';
import useNaverMap from '../utils/useNaverMap';
import MatjipInputbox from './matjipInputbox';

import ReduxTest from './reduxTest';
import { RootState } from '../store/store';
import { useState } from 'react';
import LoadingSpinner01 from '../spinners/loadingSpinner01';
import Header from './header';

const Main: React.FC = () => {

  const modalControl = useSelector((state: RootState) => state.modalControl);

  const [ mapObj, setMapObj ] = useState<object>({});

  useNaverMap(setMapObj);

  return (
    <>
      { Object.keys(mapObj).length === 0 ? 
        <>
          <div className="flex justify-center items-center absolute z-20 w-full h-full opacity-50 bg-gray-700"></div>
          <div className="flex justify-center items-center absolute z-40 w-full h-full ">
            <div className="inline-block align-middle leading-normal text-white font-bold">
              <LoadingSpinner01 color={ 'purple' } depth={ '500' } thickness={ '4' } text={ '지도 영역을 불러오고 있습니다.' } />
            </div>
          </div>
        </> : null
      }
      { modalControl.isSearchAddressModalOpen ?
        <>
          <div className="flex justify-center items-center w-full h-full absolute z-10"></div>
        </> : null
       }
      <Header />
      <div className="relative z-10 flex flex-col gap-[10px] justify-center items-center px-[180px]">
        <MatjipInputbox/>
        <div id="map" className="w-[1200px] h-[550px] z-0 self-center border-[1px] border-solid border-grey"></div> 
        {/* <ReduxTest /> */}
        { modalControl.isSearchAddressModalOpen ? <SearchAddressModal /> : null }
      </div>
    </>
  );
};

// 서버사이드 데이터 업데이트가 주기적으로 발생할 시, 호출
// export const getServerSideProps: GetServerSideProps<{}> = async(context) => {

//   return {
//     props: {
      
//     }
//   };
// };

export default Main;
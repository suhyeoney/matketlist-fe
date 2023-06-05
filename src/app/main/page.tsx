'use client'

import { useSelector } from 'react-redux';
import SearchAddressModal from '../modals/searchAddressModal';
import useNaverMap from '../utils/useNaverMap';
import MatjipInputbox from './matjipInputbox';

import ReduxTest from './reduxTest';
import { RootState } from '../store/store';

const Main: React.FC = ({}) => {

  const modalControl = useSelector((state: RootState) => state.modalControl);

  useNaverMap();

  return (
    <div className="flex flex-col gap-[10px] justify-center items-center px-[180px]">
      <MatjipInputbox/>
      <div id="map" className="w-[1200px] h-[600px] self-center border-[1px] border-solid border-grey"></div>
      <ReduxTest />
      
      { modalControl.isSearchAddressModalOpen ? <SearchAddressModal /> : null }
    </div>
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
'use client'

import useNaverMap from '../utils/useNaverMap';
import RegionInputbox from './regionInputbox';
import RegionSelectbox from './regionSelectbox';

import ReduxTest from './reduxTest';

const Main: React.FC = ({}) => {

  useNaverMap();

  return (
    <div className="flex flex-col gap-[10px] justify-center items-center px-[180px]">
      <RegionInputbox/>
      <div id="map" className="w-[1200px] h-[600px] self-center border-[1px] border-solid border-grey"></div>
      
      <ReduxTest />
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
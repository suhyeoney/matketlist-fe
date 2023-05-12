'use client'

import useNaverMap from '../utils/useNaverMap';

const Main: React.FC = ({}) => {

  useNaverMap();

  return (
    <>
      <div id="map" className="w-screen h-screen"></div>
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
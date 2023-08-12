import MainService from '@services/main.service';
import { use } from 'react';

const Ssr: React.FC = () => {

  // const dispatch = useDispatch();
  // const data = useSelector((state: RootState) => state.mainApi.placeDetailData);

  // dispatch(getLocalSearchData({
  //   key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY, 
  //   query: '카레야상'
  // }));

  // const x = use(fetchData());

  return (
    <div className="h-screen p-5">
      {/* <div className="flex flex-col items-center gap-12">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </div> */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-start">
          {/* { JSON.stringify(x) } */}
        </div>
      </div>
      {/* <div id="map" className="w-[400px] h-[400px]"></div> */}
    </div>
  );
};

export default Ssr;

// const fetchData = async() => {
//   const data = MainService.getLocalSearchDataApi({
//     key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY, 
//     query: '카레야상'
//   });
//   return data;
// }
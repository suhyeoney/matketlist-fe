'use client'

import { useDispatch } from 'react-redux';
import { SearchMatjipInfo } from '@dataTypes/matjip';
import LoadingSpinner01 from '@spinners/loadingSpinner01';
import { setSearchAddressModalOpen } from '@features/modalControl/modalControlSlice';
import { useEffect, useState } from 'react';
import image1 from '@assets/icons/choose-from-list.png';
import LoadingSpinner03 from '@spinners/loadingSpinner03';
import Image from 'next/image';

type SearchResultsTableProps = {
  data: any[],
  page: number,
  isRegistering: boolean,
  setData: React.Dispatch<React.SetStateAction<any>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  registerMatjip: (e: SearchMatjipInfo) => void
};

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ 
  data, 
  page, 
  isRegistering,
  setData, 
  setPage, 
  registerMatjip 
}) => {

  const dispatch = useDispatch();

  const SIZE_PER_PAGE = 5;
  // const [ foldedData, setFoldedData ] = useState<any[]>([]);

  // CSS default : tooltip tailwind class 적용 상태.
  // querySelector로 얻은 각 요소들이 truncated 상태인지 체크
  // truncated 상태이면 tooltip 보여줘야 함. (상태유지)
  // is not truncated 상태이면 이미 적용되어 있는 tooltip class를 제거함.
  const processCssTooltip = (selector: string) => {
    const elements = document.querySelectorAll(selector);
    // console.log(elements);
    elements.forEach(e => {
      const clientWidth = e.clientWidth;
      const scrollWidth = e.scrollWidth;
      // console.log('clientWidth', clientWidth);
      // console.log('scrollWidth', scrollWidth);
      if(scrollWidth <= clientWidth) {
        // is not truncated
        e.classList.remove('tooltip');
      }
    });
  };

  useEffect(() => {
    // const arrData = data ?? [];
    // setFoldedData(arrData);
    setPage(1);
  }, []);

  useEffect(() => {
    // console.log(data);
    // console.log(page);
    if(data !== undefined) {
      const arr = data.filter((e: SearchMatjipInfo, idx: number) => idx < SIZE_PER_PAGE * page);
      // console.log(arr);
      // setData(data.filter((e: SearchMatjipInfo, idx: number) => idx < SIZE_PER_PAGE * page));
    }

    processCssTooltip('#name-tooltip');
    processCssTooltip('#address-tooltip');

  }, [ page ]);

  useEffect(() => {
    // console.log(data);
  }, [ data ]);

  const btnShowMore =
    <tr>
      <td colSpan={3} className="px-0">
        <div 
          className="flex justify-center items-center border-[1px] border-grey-700 font-bold mx-5 py-1 cursor-pointer"
          onClick={ () => setPage(page + 1) }
        >더 보기
        </div>
      </td>
      {/* <td></td>
      <td></td> */}
    </tr>;

  const resultTable = 
    <div className="
      overflow-y-scroll scrollbar-hide
      laptop:w-[700px] h-[450px]
      tablet:w-[700px] h-[450px]
      mobile:w-[300px] h-[400px]
    ">
      <table className="table text-sm">
        <thead>
          <tr className="sticky z-10">
            <th className="sticky top-0 px-6 mt-2 text-center">매장명</th>
            <th className="sticky top-0 px-6 mt-2 text-center">주소</th>
            <th className="
              sticky top-0 px-5 mt-2
              mobile:w-[60px]
            "></th>
          </tr>
        </thead>
        <tbody>
          { data?.filter(
            (e: SearchMatjipInfo, idx: number) => idx < SIZE_PER_PAGE * page)?.map(
            (e: SearchMatjipInfo, idx: number) => (
          <tr key={ idx } className="py-10">
            <td className="p-0">
              <div 
                id="name-tooltip"
                data-tip={ e?.name } 
                className="
                  tooltip tooltip-accent tooltip-top before:max-w-fit hover:cursor-default hover:underline hover:decoration-dotted
                  laptop:w-[200px]
                  tablet:w-[200px] 
                  mobile:w-[80px]  
                ">
                <p className="
                  text-left font-bold 
                  laptop: px-7 truncate ...
                  tablet: px-7 whitespace-normal
                  mobile:px-3 whitespace-normal
                ">{ e?.name }</p>
              </div>
            </td>
            <td className="p-0">
              <div
                id="address-tooltip"
                data-tip={ e?.address } 
                className="
                  tooltip tooltip-info tooltip-top before:max-w-fit hover:cursor-default hover:underline hover:decoration-dotted
                  laptop:w-[300px]
                  tablet:w-[300px]
                  mobile:w-[150px] 
                ">
                <p className="
                  text-left px-3 
                  laptop:truncate ...
                  tablet:whitespace-normal
                  mobile:whitespace-normal
                ">{ e?.address }</p>
              </div>
            </td>
            <td className="
              flex justify-center items-center p-0 py-5
              laptop:w-[130px]
              tablet:w-[130px]
              mobile:w-[50px]
            ">
              <button className="
                  btn btn-ghost bg-red-100
                  laptop:w-[60px] h-[60px]
                  tablet:w-[60px] h-[60px]
                  mobile:w-[50px] h-[50px] p-1
                "
                disabled={ isRegistering }
                onClick={ () => registerMatjip(e) }
              >
                <Image 
                  src={ image1.src } 
                  alt=""
                  className="
                    laptop:w-[30px] h-[30px]
                    tablet:w-[30px] h-[30px]
                    mobile:w-[20px] h-[20px]
                "/>
              </button>
            </td>
          </tr>
          ))}
          { data !== undefined && page < data.length / SIZE_PER_PAGE ? btnShowMore : null }
        </tbody>
      </table>
    </div>;

  const isLoading = 
    <div className="fixed z-10 w-full mt-[250px]">
      <div className="
        relative flex flex-col items-center justify-end z-20 h-[300px]
      ">
        <LoadingSpinner03 cubeText={ 'MATKET' } infoText={ '검색 결과를 불러오고 있습니다.' } />
      </div>
    </div>;
     const render = () => {
    if(data === undefined) {
      return isLoading;
    }
    if(data !== undefined && data.length > 0) {
      console.log('>>>>> resultTable');
      return resultTable;
    }
    // return isLoading;
  };
    
  return (
    <>
      { render() }
    </>
  );
};

export default SearchResultsTable;
'use client'

import { useDispatch } from 'react-redux';
import { SearchMatjipInfo } from '../dataTypes/Matjip';
import LoadingSpinner01 from '../spinners/loadingSpinner01';
import { setSearchAddressModalOpen } from '../features/modalControl/modalControlSlice';
import { useEffect, useState } from 'react';

type SearchResultsTableProps = {
  data: any[],
  page: number,
  setData: React.Dispatch<React.SetStateAction<any>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  registerMatjip: (e: SearchMatjipInfo) => void
};

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ data, page, setData, setPage, registerMatjip }) => {

  const dispatch = useDispatch();

  const SIZE_PER_PAGE = 5;
  // const [ foldedData, setFoldedData ] = useState<any[]>([]);

  // CSS default : tooltip tailwind class 적용 상태.
  // querySelector로 얻은 각 요소들이 truncated 상태인지 체크
  // truncated 상태이면 tooltip 보여줘야 함. (상태유지)
  // is not truncated 상태이면 이미 적용되어 있는 tooltip class를 제거함.
  const processCssTooltip = (selector: string) => {
    const elements = document.querySelectorAll(selector);
    console.log(elements);
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
          className="flex justify-center items-center border-[1px] border-grey-700 font-bold px-0 py-1 cursor-pointer"
          onClick={ () => setPage(page + 1) }
        >더 보기
        </div>
      </td>
      <td></td>
      <td></td>
    </tr>;

  const resultTable = 
    <div className="w-[700px] h-[450px] pl-5 pr-0 mb-4 overflow-x-clip overflow-y-scroll">
      <table className="table text-sm font-['NanumGothic']">
        <thead>
          <tr className="sticky z-20">
            <th className="sticky top-0 px-6 py-3 text-center">매장명</th>
            <th className="sticky top-0 px-6 py-3 text-center">주소</th>
            <th className="sticky top-0 px-6 py-3"></th>
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
                className="w-[200px] tooltip tooltip-accent tooltip-top before:max-w-fit hover:cursor-default hover:underline hover:decoration-dotted"
              >
                <p className="text-left px-3 font-bold truncate ...">{ e?.name }</p>
              </div>
            </td>
            <td className="p-0">
              <div
                id="address-tooltip"
                data-tip={ e?.address } 
                className="w-[300px] tooltip tooltip-info tooltip-top before:max-w-fit hover:cursor-default hover:underline hover:decoration-dotted"
              >
                <p className="text-left px-3 truncate ...">{ e?.address }</p>
              </div>
            </td>
            <td className="flex justify-center items-center w-[130px] p-[8px]">
              <button 
                className="font-['NanumGothic'] btn btn-outline btn-primary"
                onClick={ () => registerMatjip(e) }
              >선택
              </button>
            </td>
          </tr>
          ))}
          { data !== undefined && page < data.length / SIZE_PER_PAGE ? btnShowMore : null }
        </tbody>
      </table>
    </div>;

  const isLoading = 
    // <div className="w-[650px] h-[450px] mt-4">
    // </div>;
    <LoadingSpinner01 color={ 'purple' } depth={ '500' } thickness={ '4' } text={ 'Loading...' } />;
  
  const render = () => {
    if(data === undefined) {
      return isLoading;
    }
    if(data !== undefined && data.length > 0) {
      console.log('>>>>> resultTable');
      return resultTable;
    }
  };
    
  return (
    <>
      { render() }
    </>
  );
};

export default SearchResultsTable;
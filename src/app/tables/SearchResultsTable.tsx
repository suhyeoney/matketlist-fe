'use client'

import { useDispatch } from 'react-redux';
import { SearchMatjipInfo } from '../dataTypes/Matjip';
import LoadingSpinner from '../spinners/loadingSpinner';
import { setSearchAddressModalOpen } from '../features/modalControl/modalControlSlice';

type SearchResultsTableProps = {
  data: any[],
  registerMatjip: (e: SearchMatjipInfo) => void
};

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ data, registerMatjip }) => {

  const dispatch = useDispatch();

  const resultTable = 
    <div className="w-[650px] h-[450px] mt-4 overflow-y-scroll">
      <table className="table text-sm">
        <thead>
          <tr>
            <th className="sticky top-0 px-6 py-3 text-center">매장명</th>
            <th className="sticky top-0 px-6 py-3 text-center">주소</th>
            <th className="sticky top-0 px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          { data?.map((e: SearchMatjipInfo, idx: number) => (
          <tr key={ idx } className="py-10 border-b border-gray-200 hover:bg-gray-100">
            <td className="p-0">
              <div className="w-[150px]">
                <p className="px-3 font-bold truncate ...">{ e?.name }</p>
              </div>
            </td>
            <td className="p-0">
              <div className="w-[350px]">
                <p className="px-3 truncate ...">{ e?.address }</p>
              </div>
            </td>
            <td className="flex justify-center items-center w-[130px] p-[8px]">
              <button 
                className="font-['Tenada'] btn btn-outline btn-primary"
                onClick={ () => registerMatjip(e) }
              >
                선택
              </button>
            </td>
          </tr>
          ))}
        </tbody>     
      </table>
    </div>;

  const isLoading = 
    // <div className="w-[650px] h-[450px] mt-4">
    // </div>;
    <LoadingSpinner color={ 'purple' } depth={ '500' } thickness={ '4' } />;
  
  const render = () => {
    if(data === undefined) {
      return isLoading;
    }
    if(data !== undefined && data.length > 0) {
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
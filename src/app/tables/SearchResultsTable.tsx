'use client'

import { SearchMatjipInfo } from "../dataTypes/Matjip";

type SearchResultsTableProps = {
  data: any[]
};

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ data }) => {
  return (
    <>
    { data ? (
      <div className="w-[650px] h-[450px] mt-4 overflow-y-scroll">
        <table className="table text-sm">
          {/* head */}
          <thead>
            <tr>
              {/* <th className="sticky top-0 px-4 py-3">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <th className="sticky top-0 px-6 py-3 text-center">매장명</th>
              <th className="sticky top-0 px-6 py-3 text-center">주소</th>
              {/* <th>Favorite Color</th> */}
              <th className="sticky top-0 px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            { data?.map((e: SearchMatjipInfo, idx: number) => (
            <tr key={ idx }>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <td className="p-0">
                {/* <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={ e?.iconUrl } alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{ e?.name }</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div> */}
                <div className="w-[150px]">
                  <p className="px-3 font-bold truncate ...">{ e?.name }</p>
                </div>
              </td>
              <td className="p-0">
                <div className="w-[350px]">
                  <p className="px-3 truncate ...">{ e?.address }</p>
                </div>
                {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
              </td>
              {/* <td>Purple</td> */}
              <td className="flex justify-center items-center w-[130px] p-[8px]">
                <button className="font-['Tenada'] btn btn-xl bg-red-950">선택</button>
              </td>
            </tr>
            ))}
          </tbody>         
        </table>
      </div> 
      ) : <span className="loading loading-spinner text-primary"></span>
    }
    </>
  );
};

export default SearchResultsTable;
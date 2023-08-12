'use client'

import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

interface SearchInputboxProps {
  setKeyword: (payload: string) => void,
  placeholder: string,
};

const SearchInputbox:React.FC<SearchInputboxProps> = ({ setKeyword, placeholder }) => {

  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const onInputKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);
  };  

  return (
    <>
      <div className="
        flex flex-row justify-center items-center 
        laptop:gap-[20px] p-[10px] border-[1px] border-solid border-grey 
        tablet:gap-[20px] p-[10px] border-[1px] border-solid border-grey 
        mobile:gap-[10px] p-[10px] border-[1px] border-solid border-grey 
        smallest:gap-[5px] border-transparent m-0
      ">
        <div className="flex ">
          <input 
            type="search" 
            placeholder={ placeholder } 
            onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onInputKeywordChange(e) }
            onFocus={ () => document.querySelector('#footer')?.classList.add('hidden') }
            onBlur={ () => document.querySelector('#footer')?.classList.remove('hidden') }
            className={`
              input input-bordered w-[100%]
              ${ environmentVariables.backgroundMode ? 'bg-white text-black focus:text-black' : 'bg-[#2A303C] border-white text-white focus:text-white' }
            `}/>
        </div>
      </div>      
    </>
  );
}

export default SearchInputbox;
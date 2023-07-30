'use client'

import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

type SearchInputboxProps = {
  setKeyword: (payload: string) => void,
  placeholder: string,
};

const SearchInputbox: React.FC<SearchInputboxProps> = ({ setKeyword, placeholder  }) => {
    
  const environmentVariables = useSelector((state: RootState) => state.environmentVariables);

  const onInputKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);
  };  

  return (
    <div className="flex items-center justify-center w-full py-3">
      <input 
        type="text" 
        placeholder={ placeholder }
        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onInputKeywordChange(e) }
        onFocus={ () => document.querySelector('#footer')?.classList.add('hidden') }
        onBlur={ () => document.querySelector('#footer')?.classList.remove('hidden') }
        className={`
          searchInput
          input input-bordered input-info 
          ${ environmentVariables.backgroundMode ? 'bg-white focus:text-black' : 'bg-[#2A303C] border-white focus:text-white' }
          laptop:w-[200px] h-[40px]
          tablet:w-[200px] h-[40px]
          mobile:w-[200px] h-[40px]
          smallest:w-[150px] h-[35px]
        `}/>
    </div>
  );
};

export default SearchInputbox;
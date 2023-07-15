'use client'

type SearchInputboxProps = {
  setKeyword: (payload: string) => void,
  placeholder: string,
};

const SearchInputbox: React.FC<SearchInputboxProps> = ({ setKeyword, placeholder  }) => {
    
  const onInputKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);
  };  

  return (
    <>
      <input 
        type="text" 
        placeholder={ placeholder }
        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onInputKeywordChange(e) }
        onFocus={ () => document.querySelector('#footer')?.classList.add('hidden') }
        onBlur={ () => document.querySelector('#footer')?.classList.remove('hidden') }
        className="
          input input-bordered input-info 
          laptop:w-[200px] h-[40px]
          tablet:w-[200px] h-[40px]
          mobile:w-[200px] h-[40px]
          smallest:w-[150px] h-[35px] mr-8
        "/>
    </>
  );
};

export default SearchInputbox;
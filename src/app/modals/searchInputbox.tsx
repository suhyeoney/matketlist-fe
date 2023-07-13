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
        className="input input-bordered input-info w-[200px] h-[40px]" 
        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onInputKeywordChange(e) }
      />
    </>
  );
};

export default SearchInputbox;
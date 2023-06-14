'use client'

type SearchInputboxProps = {
  setKeyword: (payload: string) => void
};

const SearchInputbox: React.FC<SearchInputboxProps> = ({ setKeyword  }) => {
    
  const onInputKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);
  };  

  return (
    <>
      <input 
        type="text" 
        placeholder="Type here" 
        className="input input-bordered input-info w-full max-w-xs" 
        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onInputKeywordChange(e) }
      />
    </>
  );
};

export default SearchInputbox;
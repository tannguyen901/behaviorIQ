import React, {useState} from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (
  {searchTerm, setSearchTerm}
) => {
  const [typingTimeout, setTypingTimeout] = useState< NodeJS.Timeout | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const newTypingTimeout = setTimeout(() => {
      setSearchTerm(newSearchTerm);
    }, 2000);

    setTypingTimeout(newTypingTimeout);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search"
        onChange={handleInputChange}
        value={searchTerm}
      />
    </div>
  );
};


export default SearchBar;
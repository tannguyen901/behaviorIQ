import React from "react";
import SearchBar from "./SearchBar";
import DefaultBQs from "./DefaultBQs";
import CustomBQsInput from "./CustomBQsInput";

interface BQSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const BQSection: React.FC<BQSectionProps> = (
  { searchTerm, setSearchTerm} //deconstruct props here
) => {

  return (
    <div>
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
      />
      <DefaultBQs />
      <CustomBQsInput />
    </div>
  );
};      

export default BQSection;


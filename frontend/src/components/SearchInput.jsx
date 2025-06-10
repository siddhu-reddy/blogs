import { Search } from "lucide-react";
import React from "react";
//USAGE:
{
  /* <SearchInput
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  placeholder="Seach Service Managers.."
/>; */
}
const SearchInput = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
}) => {
  return (
    <div className="border grid grid-flow-col rounded-3xl gap-2 p-2 px-4 items-center  border-[#D9D9D9]">
      <Search size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        className="focus:outline-none"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;

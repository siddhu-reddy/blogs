import React from "react";

const FilterTabs = ({ filters = [], activeFilter, setActiveFilter }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex flex-wrap gap-4">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-2xl font-bold transition-colors duration-200 ${
              activeFilter === filter
                ? "bg-[#00922f] text-white"
                : "border border-[#00922f] text-[#00922f]"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;

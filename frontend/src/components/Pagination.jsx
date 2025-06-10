import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6 mb-4">
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className="flex items-center text-sm text-gray-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} className="mr-1" />
        First Page
      </button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-8 h-8 flex items-center justify-center rounded ${
              currentPage === page
                ? "bg-[#D7F8E3] border border-[#00922F] text-[#00922F] font-medium"
                : "bg-white border-2 border-[#D7F8E3] text-[#00922F]  hover:bg-[#00922F]/10"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className="flex items-center text-sm text-gray-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Last Page
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default Pagination;

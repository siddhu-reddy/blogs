import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const BookingOverview = () => {
  const [timeFilter, setTimeFilter] = useState("This Month");
  const timeFilterOptions = ["This Week", "This Month", "This Year"];
  return (
    <div>
      <section className="bg-white rounded-xl p-5 shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Booking Overview</span>
          <div className="relative">
            <button
              className="bg-[#E6F4EA] text-[#2B7A4B] px-3 py-1 rounded-lg text-xs flex items-center gap-1"
              onClick={() =>
                setTimeFilter(
                  (prev) =>
                    timeFilterOptions[
                      (timeFilterOptions.indexOf(prev) + 1) %
                        timeFilterOptions.length
                    ]
                )
              }
            >
              {timeFilter} <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Placeholder for chart */}
        <div className="h-40 flex items-center justify-center">
          <span className="text-gray-400">[Chart Placeholder]</span>
        </div>
      </section>
    </div>
  );
};

export default BookingOverview;

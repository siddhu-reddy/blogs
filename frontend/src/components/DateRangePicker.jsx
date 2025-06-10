import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [show, setShow] = useState(false);
  const [range, setRange] = useState(() => ({
    from: startDate ?? null,
    to: endDate ?? null,
  }));

  const pickerRef = useRef(null);
 useEffect(() => {
   setRange({
     from: startDate,
     to: endDate,
   });
 }, [startDate, endDate]);

 // Handle click outside
 useEffect(() => {
   const handleClickOutside = (e) => {
     if (show && pickerRef.current && !pickerRef.current.contains(e.target)) {
       setShow(false);
     }
   };

   document.addEventListener("mousedown", handleClickOutside);
   return () => document.removeEventListener("mousedown", handleClickOutside);
 }, [show, setShow]);

 // Handle range changes
 useEffect(() => {
   if (range?.from && range?.to) {
     // Normal range
     setStartDate(range.from);
     setEndDate(range.to);
   } else if (range?.from && !range?.to) {
     // Same day clicked twice (handle as single-day range)
     setStartDate(range.from);
     setEndDate(range.from);
   } else {
     // No dates selected
     setStartDate(null);
     setEndDate(null);
   }
 }, [range?.from, range?.to, setStartDate, setEndDate]);

  const FilterTower = () => (
    <svg width="20" height="14" viewBox="0 0 22 15" fill="none">
      <path
        d="M20.0938 0C20.8438 0 21.25 0.875 20.7812 1.4375L16 7.21875V12.25C16 12.875 15.3125 13.2188 14.8125 12.875L12.3125 11.125C12.0938 11 12 10.75 12 10.5V7.21875L7.1875 1.4375C6.71875 0.875 7.125 0 7.875 0H20.0938ZM6.375 2C6.40625 2.03125 6.40625 2.0625 6.40625 2.09375L11 7.59375V8.03125L10 9.21875V13.25C10 13.875 9.3125 14.2188 8.8125 13.875L6.3125 12.125C6.09375 12 6 11.75 6 11.5V9.21875L1.1875 3.4375C0.71875 2.875 1.125 2 1.875 2H6.375Z"
        fill="#00922F"
      />
    </svg>
  );

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setShow(!show)}
        className="border border-[#D9D9D9] text-black font-medium text-sm flex items-center gap-2 px-3 py-1 rounded-md bg-white shadow-sm hover:bg-[#00922F]/10"
      >
        {range.from && range.to
          ? `${format(range.from, "LLL dd")} – ${format(range.to, "LLL dd")}`
          : range.from
          ? `${format(range.from, "LLL dd")}`
          : "Filters"}
        <FilterTower />
      </button>

      {show && (
        <div className="absolute z-50 mt-2 right-0 w-[300px] bg-white shadow-lg rounded-lg p-4">
          {/* Styling overrides */}
          <style>
            {`
              .rdp {
                --rdp-accent-color: #00922F;
                --rdp-cell-size: 34px;
                --rdp-background-color: #e5f5e9;
              }
              .rdp-day_selected,
              .rdp-day_range_start,
              .rdp-day_range_end {
                background-color: #00922F !important;
                color: white !important;
              }
              .rdp-day_range_middle {
                background-color: #e5f5e9 !important;
              }
              .rdp-day:hover {
                background-color: #c1eac5 !important;
              }
              .rdp-caption,
              .rdp-head {
                text-align: center;
              }
              .rdp-month {
                width: 100%;
              }
            `}
          </style>

          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            defaultMonth={range?.from || new Date()}
            className="w-full"
          />

          <div className="flex justify-end mt-2 gap-2">
            <button
              onClick={() => {
                setRange({ from: undefined, to: undefined });
                setStartDate(null);
                setEndDate(null);
                setShow(false);
              }}
              className="text-xs text-gray-500 hover:text-red-500"
            >
              Clear
            </button>
            <button
              onClick={() => setShow(false)}
              className="text-xs text-[#00922F] font-medium hover:underline"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

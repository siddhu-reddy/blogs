import useDataManager from "../../hooks/useDataManager";
import DateRangePicker from "../../components/DateRangePicker";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import { useSidebar } from "../../hooks/useSidebar";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookingsAPI } from "../../api/AdminApis/BookingsAPI";
import TableSkeleton from "../../components/Skeletons/TableSkeleton";
import ErrorComponent from "../../components/Skeletons/ErrorComponent";
import { toast } from "sonner";
import { formatDateDetailed, MappingStyles } from "../../utils/utils";
import FilterTabs from "../../components/Filters";

const Bookings = () => {
  const [activeFilter, setActiveFilter] = useState("All Bookings");

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: BookingsAPI.fetchBookings,
    onSuccess: (data) => {
      if (data) {
        toast.success("Bookings fetched successfully!");
      }
    },
    onError: (error) => {
      toast.error("Failed to fetch bookings. Please try again later.");
      console.error("Error fetching bookings:", error);
    },
  });

  // Ensure we have a valid array of bookings
  const safeBookings = useMemo(
    () => (Array.isArray(bookings) ? bookings : []),
    [bookings]
  );

  // Filter data based on active status before passing to useDataManager
  const statusFilteredBookings = useMemo(() => {
    if (activeFilter === "All Bookings") return safeBookings;
    return safeBookings.filter((item) => item.status === activeFilter);
  }, [activeFilter, safeBookings]);

  const {
    paginatedData,
    currentPage,
    totalPages,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    goToPage,
    searchTerm,
    setSearchTerm,
  } = useDataManager(statusFilteredBookings, {
    dateKey: "createdAt",
    searchKey: "customerName",
    rowsPerPageDefault: 10,
    selectionKey: "_id",
  });
  

  const { isMobile, sidebarExpanded } = useSidebar();

  return (
    <div
      className="flex flex-col w-full mt-[60px] min-h-screen bg-gray-50 p-4 md:p-6"
      style={{
        marginLeft: isMobile ? "0" : sidebarExpanded ? "220px" : "80px",
        width: isMobile
          ? "100%"
          : `calc(100% - ${sidebarExpanded ? "220px" : "80px"})`,
      }}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-xl font-medium">Service Bookings</h1>
        </div>
      </div>

      <FilterTabs
        filters={["All Bookings", "Ongoing", "Upcoming", "Cancelled"]}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <div className="flex justify-between items-center">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Seach Bookings"
        />
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
      <div
        className={`transition-opacity duration-300 mt-4 ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="overflow-hidden rounded-[10px] border border-[#d9d9d9]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#f4f4f4] text-xs text-left text-black">
                  <th className="p-4 border border-[#d9d9d9] font-medium">
                    BOOKING ID
                  </th>
                  <th className="p-4 border border-[#d9d9d9] font-medium">
                    CUSTOMER
                  </th>
                  <th className="p-4 border border-[#d9d9d9] font-medium">
                    SERVICE TYPE
                  </th>
                  <th className="p-4 border border-[#d9d9d9] font-medium">
                    LOCATION
                  </th>
                  <th className="p-4 border border-[#d9d9d9] font-medium">
                    STATUS
                  </th>
                  <th className="p-4 border border-[#d9d9d9] font-medium">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableSkeleton />
                ) : isError ? (
                  <ErrorComponent message="Failed to load bookings." />
                ) : paginatedData.length === 0 ? ( // Check paginatedData for "No bookings"
                  <tr>
                    <td colSpan="7" className="p-6 text-center text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  Array.isArray(paginatedData) &&
                  paginatedData.map((row) => (
                    <tr
                      key={row._id}
                      className="hover:bg-gray-50 border-t border-[#d9d9d9]"
                    >
                      <td className="p-4 border border-[#d9d9d9]">
                        <div className="font-medium">{row.bookingId}</div>
                        <div className="text-xs">
                          {formatDateDetailed(row.createdAt)}
                        </div>
                      </td>
                      <td className="p-4 border border-[#d9d9d9] font-medium">
                        {row.customerName}
                      </td>
                      <td className="p-4 border border-[#d9d9d9] font-medium text-center">
                        {row.serviceType}
                      </td>
                      <td className="p-4 border border-[#d9d9d9] font-medium">
                        {row.location}
                      </td>
                      <td className="p-4 border border-[#d9d9d9]">
                        <div
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${MappingStyles(
                            row.status
                          )} `}
                        >
                          <span className="text-sm">{row.status}</span>
                        </div>
                      </td>
                      <td className="p-4 border border-[#d9d9d9] text-[#00922f] font-semibold cursor-pointer">
                        View Booking
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </div>
  );
};

export default Bookings;

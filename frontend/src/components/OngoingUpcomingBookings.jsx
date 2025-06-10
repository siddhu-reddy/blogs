import React, { useMemo } from "react";
import SearchInput from "./SearchInput";
import DateRangePicker from "./DateRangePicker";
import { useQuery } from "@tanstack/react-query";
import useDataManager from "../hooks/useDataManager";
import { formatDate, MappingStyles } from "../utils/utils";
import ErrorComponent from "./Skeletons/ErrorComponent";
import TableSkeleton from "./Skeletons/TableSkeleton";
import { BookingsAPI } from "../api/AdminApis/BookingsAPI";

const OngoingUpcomingBookings = () => {
  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: BookingsAPI.fetchBookings,
  });

  const {
    searchTerm,
    setSearchTerm,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    filteredData,
  } = useDataManager(bookings, {
    dateKey: "serviceDate",
    searchKey: "customerName",
    rowsPerPageDefault: 3,
  });

  // Get only upcoming and ongoing bookings and sort by date
  const upcomingBookings = useMemo(() => {
    if (!Array.isArray(filteredData)) return [];
    return filteredData
      .filter((booking) => ["Upcoming", "Ongoing"].includes(booking.status))
      .sort((a, b) => new Date(a.serviceDate) - new Date(b.serviceDate))
      .slice(0, 3);
  }, [filteredData]);

  return (
    <section className="bg-white rounded-xl p-5 shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Ongoing & Upcoming Bookings</span>
        <button className="text-[#2B7A4B] text-xs font-semibold">
          Go to All Bookings <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="flex justify-between items-center mb-2">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Bookings"
        />
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2 px-2 font-normal">BOOKING ID</th>
              <th className="py-2 px-2 font-normal">CUSTOMER</th>
              <th className="py-2 px-2 font-normal">SERVICE</th>
              <th className="py-2 px-2 font-normal">SERVICE TYPE</th>
              <th className="py-2 px-2 font-normal">DATE & TIME</th>
              <th className="py-2 px-2 font-normal">LOCATION</th>
              <th className="py-2 px-2 font-normal">AMOUNT</th>
              <th className="py-2 px-2 font-normal">STATUS</th>
              <th className="py-2 px-2 font-normal">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton />
            ) : isError ? (
              <ErrorComponent message="Failed to load bookings." />
            ) : upcomingBookings.length === 0 ? (
              <ErrorComponent message="No upcoming bookings found" />
            ) : (
              upcomingBookings.map((booking) => (
                <tr
                  key={booking.bookingId}
                  className="border-t border-gray-100"
                >
                  <td className="py-2 px-2">
                    <div className="font-medium">#{booking.bookingId}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="font-medium">{booking.customerName}</div>
                    <div className="text-xs text-gray-500">
                      {booking.customerPhoneNumber}
                    </div>
                  </td>
                  <td className="py-2 px-2">{booking.serviceName}</td>
                  <td className="py-2 px-2">{booking.serviceType}</td>
                  <td className="py-2 px-2">
                    <div className="font-medium">
                      {formatDate(booking.serviceDate)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {booking.pujariSlots?.[0]?.startTime ||
                        booking.bhajantriSlots?.[0]?.startTime}
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="text-xs">{booking.location}</div>
                  </td>
                  <td className="py-2 px-2">
                    ₹{booking.amount?.toLocaleString()}
                  </td>
                  <td className="py-2 px-2">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${MappingStyles(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <button className="text-[#2B7A4B] text-xs font-semibold">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OngoingUpcomingBookings;

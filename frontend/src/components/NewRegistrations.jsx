import React, { useMemo } from "react";
import { ServiceProvidersAPI } from "../api/AdminApis/ServiceProvidersAPI";
import useDataManager from "../hooks/useDataManager";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "./SearchInput";
import DateRangePicker from "./DateRangePicker";
import TableSkeleton from "./Skeletons/TableSkeleton";
import ErrorComponent from "./Skeletons/ErrorComponent";

const NewRegistrations = () => {
  const {
    data: serviceProviders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["serviceProviders"],
    queryFn: ServiceProvidersAPI.fetchServiceProviders,
  });

  const {
    searchTerm,
    setSearchTerm,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    filteredData,
  } = useDataManager(serviceProviders, {
    dateKey: "createdAt",
    searchKey: "fullName",
    rowsPerPageDefault: 3,
  });

  // Get only pending service providers and sort by newest first
  const pendingProviders = useMemo(() => {
    if (!Array.isArray(filteredData)) return [];
    return filteredData
      .filter((provider) => provider.status === "Pending")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [filteredData]);

  return (
    <div className="bg-white rounded-xl p-5 shadow col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">New Registrations</span>
        <button className="text-[#2B7A4B] text-xs font-semibold">
          Go to All Service Providers <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="flex items-center justify-between mb-2">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Service Providers"
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
              <th className="py-2 px-2 font-normal">REGISTRATION ID</th>
              <th className="py-2 px-2 font-normal">NAME</th>
              <th className="py-2 px-2 font-normal">SERVICE TYPE</th>
              <th className="py-2 px-2 font-normal">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton />
            ) : isError ? (
              <ErrorComponent message="Failed to load service providers." />
            ) : pendingProviders.length === 0 ? (
              <ErrorComponent message="No new registrations found" />
            ) : (
              pendingProviders.map((provider) => (
                <tr key={provider._id} className="border-t border-gray-100">
                  <td className="py-2 px-2">
                    <div className="font-medium">#{provider._id}</div>
                  </td>
                  <td className="py-2 px-2">
                    {provider.userType === "Store" ? (
                      <>
                        <div className="font-medium">{provider.storeName}</div>
                        <div className="text-xs text-gray-500">
                          {provider.phoneNumber}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-medium">{provider.fullName}</div>
                        <div className="text-xs text-gray-500">
                          {provider.phoneNumber}
                        </div>
                      </>
                    )}
                  </td>
                  <td className="py-2 px-2">{provider.userType}</td>
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
    </div>
  );
};

export default NewRegistrations;

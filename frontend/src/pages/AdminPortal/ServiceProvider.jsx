import { useState, useMemo } from "react";
import useDataManager from "../../hooks/useDataManager";
import DownloadTableData from "../../components/DownloadData";
import DateRangePicker from "../../components/DateRangePicker";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import { useSidebar } from "../../hooks/useSidebar";
import FilterTabs from "../../components/Filters";
import { ServiceProvidersAPI } from "../../api/AdminApis/ServiceProvidersAPI";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "../../components/Skeletons/TableSkeleton";
import ErrorComponent from "../../components/Skeletons/ErrorComponent";
import ServiceProviderTable from "../../components/Tables/ServiceProviderTable";

const ServiceProvider = () => {
  const [activeTab, setActiveTab] = useState("New Registrations");
  const [activeServiceType, setActiveServiceType] = useState(
    "All Service Providers"
  );

  const {
    data: serviceProviders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["serviceProviders"],
    queryFn: ServiceProvidersAPI.fetchServiceProviders,
    onSuccess: (data) => {
      console.log("Service Providers Data:", data);
      toast.success("Service Providers fetched successfully");
    },
    onError: (error) => {
      console.error("Error fetching service providers:", error);
      toast.error("Error fetching service providers");
    },
  });

  // Filter data based on active tab and service type
  const filteredData = useMemo(() => {
    if (!Array.isArray(serviceProviders)) return [];

    return serviceProviders.filter((item) => {
      const statusMatch =
        activeTab === "New Registrations"
          ? item.status === "Pending"
          : item.status === "Approved";
      const serviceTypeMatch =
        activeServiceType === "All Service Providers" ||
        item.userType === activeServiceType;
      return statusMatch && serviceTypeMatch;
    });
  }, [serviceProviders, activeTab, activeServiceType]);

  const {
    paginatedData,
    selectedRows,
    currentPage,
    totalPages,
    startDate,
    endDate,
    selectedIds,
    setStartDate,
    setEndDate,
    goToPage,
    searchTerm,
    setSearchTerm,
    toggleRowSelection,
  } = useDataManager(filteredData, {
    dateKey: "createdAt",
    searchKey: "fullName",
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
          <h1 className="text-xl font-medium">Service Provider Management</h1>
          <div className="flex items-center gap-4">
            <DownloadTableData
              selectedRows={selectedRows}
              filteredData={paginatedData}
              fileName="ServiceProviderData"
              buttonLabel="Download Excel ZIP"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 border-b border-[#d9d9d9]">
          <button
            className={`px-4 py-4 border-b-2 ${
              activeTab === "New Registrations"
                ? "border-[#00922f] text-[#00922f]"
                : "border-transparent text-black"
            } font-bold`}
            onClick={() => setActiveTab("New Registrations")}
          >
            New Registrations
          </button>
          <button
            className={`px-4 py-4 border-b-2 ${
              activeTab === "Verified Users"
                ? "border-[#00922f] text-[#00922f]"
                : "border-transparent text-black"
            } font-bold`}
            onClick={() => setActiveTab("Verified Users")}
          >
            Verified Users
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <FilterTabs
        filters={["All Service Providers", "Pujari", "Bhajantri", "Store"]}
        activeFilter={activeServiceType}
        setActiveFilter={setActiveServiceType}
      />
      <div className="flex justify-between items-center">
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

      <div
        className={`transition-opacity duration-300 mt-4 ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="overflow-hidden rounded-[10px] border border-[#d9d9d9]">
          {isLoading ? (
            <TableSkeleton />
          ) : isError ? (
            <ErrorComponent message="Failed to load service providers." />
          ) : paginatedData.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No service providers found.
            </div>
          ) : (
            <ServiceProviderTable
              data={paginatedData}
              selectedIds={selectedIds}
              toggleRowSelection={toggleRowSelection}
            />
          )}
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

export default ServiceProvider;

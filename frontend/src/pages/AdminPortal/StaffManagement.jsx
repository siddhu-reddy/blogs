import React from "react";
import useDataManager from "../../hooks/useDataManager";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../hooks/useSidebar";
import { useQuery } from "@tanstack/react-query";
import { StaffAPI } from "../../api/AdminApis/StaffAPI";
import { toast } from "sonner";
import TableSkeleton from "../../components/Skeletons/TableSkeleton";
import ErrorComponent from "../../components/Skeletons/ErrorComponent";
import { formatDateDetailed, MappingStyles } from "../../utils/utils";

const StaffManagement = () => {
  const {
    data: staff,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff"],
    queryFn: StaffAPI.fetchAllStaff,
    onSuccess: (data) => {
      console.log("Fetched staff data:", data);
      toast.success("Staff data fetched successfully");
    },
    onError: (error) => {
      console.error("Error fetching staff data:", error);
      toast.error("Error fetching staff data");
    },
  });
  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPage,
    selectedIds,
    toggleRowSelection,
  } = useDataManager(staff);

  const { isMobile, sidebarExpanded } = useSidebar();
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-full mt-[60px] min-h-screen bg-white p-4 md:p-6"
      style={{
        marginLeft: isMobile ? "0" : sidebarExpanded ? "220px" : "80px",
        width: isMobile
          ? "100%"
          : `calc(100% - ${sidebarExpanded ? "220px" : "80px"})`,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">Staff Management</h1>
        <button
        onClick={() => navigate("/admin/staff/add")}
         className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          <span className="text-xl">+</span> Add New Staff
        </button>
      </div>

      <p className="text-sm mb-2">Select to enable bulk options</p>

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
                  <th className="p-4">SELECT </th>
                  <th className="p-4">STAFF ID</th>
                  <th className="p-4">NAME</th>
                  <th className="p-4">EMAIL ID</th>
                  <th className="p-4">PHONE NUMBER</th>
                  <th className="p-4">DATE ADDED</th>
                  <th className="p-4">ROLE</th>
                  <th className="p-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableSkeleton />
                ) : isError ? (
                  <ErrorComponent message="Failed to load staff." />
                ) : paginatedData.length === 0 ? ( // Check paginatedData for "No bookings"
                  <ErrorComponent message="No staff found." />
                ) : (
                  Array.isArray(paginatedData) &&
                  paginatedData.map((row) => (
                    <tr
                      key={row._id}
                      className="hover:bg-gray-50 border-t border-[#d9d9d9]"
                    >
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(row._id)}
                          onChange={() => toggleRowSelection(row)}
                          className="form-checkbox"
                        />
                      </td>
                      <td className="p-4">{row._id}</td>
                      <td className="p-4 font-medium">{row.fullName}</td>
                      <td className="p-4">{row.email}</td>
                      <td className="p-4">{row.phoneNumber}</td>
                      <td className="p-4">
                        {formatDateDetailed(row.createdAt)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${MappingStyles(
                            row.userType
                          )}`}
                        >
                          {row.userType}
                        </span>
                      </td>
                      <td className="p-4 text-green-600 font-medium cursor-pointer">
                        View
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

export default StaffManagement;

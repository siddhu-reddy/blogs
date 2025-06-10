import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ServiceProvidersAPI } from "../api/AdminApis/ServiceProvidersAPI";
import TableSkeleton from "./Skeletons/TableSkeleton";
import ErrorComponent from "./Skeletons/ErrorComponent";
import { ChevronDown } from "lucide-react";

const TopPerformers = () => {
  const [activeServiceType, setActiveServiceType] = useState("Pujari");
  const [timeFilter, setTimeFilter] = useState("This Month");

  const {
    data: serviceProviders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["serviceProviders"],
    queryFn: ServiceProvidersAPI.fetchServiceProviders,
  });
  // console.log(serviceProviders);
  // Filter and sort top performers based on service type and time period
  const topPerformers = useMemo(() => {
    if (!Array.isArray(serviceProviders)) return [];

    const now = new Date();

    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);

    const monthAgo = new Date(now);
    monthAgo.setMonth(now.getMonth() - 1);

    const yearAgo = new Date(now);
    yearAgo.setFullYear(now.getFullYear() - 1);

    const filteredProviders = serviceProviders.filter((provider) => {
      // ✅ Basic null/undefined safety checks
      if (!provider) return false;

      const isTypeMatch =
        provider.userType === activeServiceType &&
        provider.status === "Approved";

      if (!isTypeMatch) return false;

      const createdAt = new Date(provider.createdAt);
      if (isNaN(createdAt)) return false; // invalid date safety

      let isTimeMatch = true;
      switch (timeFilter) {
        case "This Week":
          isTimeMatch = createdAt >= weekAgo;
          break;
        case "This Month":
          isTimeMatch = createdAt >= monthAgo;
          break;
        case "This Year":
          isTimeMatch = createdAt >= yearAgo;
          break;
        default:
          isTimeMatch = true;
      }

      return isTimeMatch;
    });

    // 🔍 Optional: log filtered result if debugging
    // console.log("Filtered providers:", filteredProviders);

    return filteredProviders
      .sort((a, b) => {
        const ratingA =
          typeof a.rating === "object" ? a.rating?.overall ?? 0 : a.rating ?? 0;
        const ratingB =
          typeof b.rating === "object" ? b.rating?.overall ?? 0 : b.rating ?? 0;

        const ratingDiff = ratingB - ratingA;
        if (ratingDiff !== 0) return ratingDiff;

        return (b.totalBookings ?? 0) - (a.totalBookings ?? 0);
      })
      .slice(0, 3);
  }, [serviceProviders, activeServiceType, timeFilter]);

  const timeFilterOptions = ["This Week", "This Month", "This Year"];

  return (
    <div className="bg-white rounded-xl p-5 shadow flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Top Performers</span>
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
      <div className="flex gap-2 mb-2">
        <button
          className={`font-semibold text-xs pb-1 ${
            activeServiceType === "Pujari"
              ? "text-[#2B7A4B] border-b-2 border-[#2B7A4B]"
              : "text-gray-400"
          }`}
          onClick={() => setActiveServiceType("Pujari")}
        >
          Pujari
        </button>
        <button
          className={`font-semibold text-xs pb-1 ${
            activeServiceType === "Bhajantri"
              ? "text-[#2B7A4B] border-b-2 border-[#2B7A4B]"
              : "text-gray-400"
          }`}
          onClick={() => setActiveServiceType("Bhajantri")}
        >
          Bhanjantri
        </button>
        <button
          className={`font-semibold text-xs pb-1 ${
            activeServiceType === "Store"
              ? "text-[#2B7A4B] border-b-2 border-[#2B7A4B]"
              : "text-gray-400"
          }`}
          onClick={() => setActiveServiceType("Store")}
        >
          Store
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <TableSkeleton rows={3} columns={4} />
        ) : isError ? (
          <ErrorComponent message="Failed to load performers." />
        ) : topPerformers.length === 0 ? (
          <ErrorComponent message="No performers found." />
        ) : (
          topPerformers.map((performer) => (
            <div key={performer._id} className="flex items-center gap-3">
              <img
                src={
                  performer.profilePicture ||
                  `https://randomuser.me/api/portraits/men/${Math.floor(
                    Math.random() * 50
                  )}.jpg`
                }
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-[#2B7A4B]"
              />
              <div className="flex-1">
                <div className="font-semibold">
                  {performer.userType === "Store"
                    ? performer.storeName
                    : performer.fullName}
                  {performer.status === "Approved" && (
                    <span className="text-green-500 ml-1">✔️</span>
                  )}
                </div>
                <div className="text-xs text-yellow-500">
                  {"★".repeat(
                    Math.round(
                      typeof performer.rating === "object"
                        ? performer.rating.overall
                        : performer.rating || 0
                    )
                  )}
                  <span className="text-gray-500 ml-1">
                    {(typeof performer.rating === "object"
                      ? performer.rating.overall
                      : performer.rating || 0
                    ).toFixed(1)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {performer.totalBookings || 0} Bookings Completed
                </div>
              </div>
              <button className="text-[#2B7A4B] text-xs font-semibold">
                View Profile
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopPerformers;

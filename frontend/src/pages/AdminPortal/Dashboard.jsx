import React from "react";
import { useSidebar } from "../../hooks/useSidebar";
import BookingOverview from "../../components/BookingOverview";
import NewRegistrations from "../../components/NewRegistrations";
import TopPerformers from "../../components/TopPerformers";
import OngoingUpcomingBookings from "../../components/OngoingUpcomingBookings";

const Dashboard = () => {
  const { isMobile, sidebarExpanded } = useSidebar();


  return (
    <div
      className="flex flex-col w-full mt-20 min-h-screen bg-gray-50 p-4 md:p-6"
      style={{
        marginLeft: isMobile ? "0" : sidebarExpanded ? "220px" : "80px",
        width: isMobile
          ? "100%"
          : `calc(100% - ${sidebarExpanded ? "220px" : "80px"})`,
      }}
    >
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 space-y-6">
          {/* Dashboard Overview */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-2">
              <span className="text-xs text-gray-500">
                TOTAL SERVICE PROVIDERS
              </span>
              <span className="text-2xl font-bold">1,234</span>
              <div className="flex items-center gap-2 text-green-600 text-xs">
                <i className="fas fa-arrow-up"></i> 12.5%{" "}
                <span className="text-gray-400">vs last month</span>
              </div>
              <div className="flex gap-4 text-xs mt-2">
                <span>
                  Pujaris <b>1,100</b>
                </span>
                <span>
                  Bhanjantris <b>100</b>
                </span>
                <span>
                  Stores <b>34</b>
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-2">
              <span className="text-xs text-gray-500">TOTAL ACTIVE USERS</span>
              <span className="text-2xl font-bold">4,321</span>
              <div className="flex items-center gap-2 text-green-600 text-xs">
                <i className="fas fa-arrow-up"></i> 12.5%{" "}
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-2">
              <span className="text-xs text-gray-500">
                TOTAL BOOKINGS COMPLETED
              </span>
              <span className="text-2xl font-bold">830</span>
              <div className="flex items-center gap-2 text-green-600 text-xs">
                <i className="fas fa-arrow-up"></i> 12.5%{" "}
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-2">
              <span className="text-xs text-gray-500">TOTAL COMMISSION</span>
              <span className="text-2xl font-bold">₹2,00,000</span>
              <div className="flex items-center gap-2 text-green-600 text-xs">
                <i className="fas fa-arrow-up"></i> 12.5%{" "}
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
          </section>

          {/* Booking Overview Graph */}
          <BookingOverview />

          {/* Registrations and Top Performers */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* New Registrations */}
            <NewRegistrations />
            {/* Top Performers */}
            <TopPerformers />
          </section>

          {/* Ongoing & Upcoming Bookings */}
          <OngoingUpcomingBookings />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

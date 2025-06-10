import React, { useState } from "react";
import { useSidebar } from "../../hooks/useSidebar";

const Revenue = () => {
  const [activeTab, setActiveTab] = useState("Store Earnings");
  const [activeFilter, setActiveFilter] = useState("All");
  const { isMobile, sidebarExpanded } = useSidebar();
  return (
    <div className="flex flex-col w-full mt-[60px] min-h-screen bg-gray-50 p-4 md:p-6"
    style={{
      marginLeft: isMobile ? "0" : sidebarExpanded ? "220px" : "80px",
      width: isMobile
        ? "100%"
        : `calc(100% - ${sidebarExpanded ? "220px" : "80px"})`,
    }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-medium">Revenue Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-6 shadow border flex flex-col justify-between">
          <div className="text-xs text-gray-500 mb-2">TOTAL REVENUE</div>
          <div className="text-2xl font-bold">₹1,00,000</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow border flex flex-col justify-between">
          <div className="text-xs text-gray-500 mb-2">EARNINGS THIS MONTH</div>
          <div className="text-2xl font-bold">₹80,000</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow border flex flex-col justify-between">
          <div className="text-xs text-gray-500 mb-2">PENDING WITHDRAWALS</div>
          <div className="text-2xl font-bold">₹23,000</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow border col-span-2 min-h-[250px] flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium">Revenue Overview</div>
            <button className="text-xs border rounded px-2 py-1">All Time</button>
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-400">[Line Chart Placeholder]</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow border min-h-[250px] flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium">Top Performing</div>
            <button className="text-xs border rounded px-2 py-1">All Time</button>
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-400">[Bar Chart Placeholder]</div>
          <div className="mt-2 text-xs text-gray-500">Most Earning: <span className="font-semibold">Internal Store (₹37,000)</span></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b flex gap-4">
        {['Store Earnings', 'Commission Earnings', 'Recent Withdrawals'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${activeTab === tab ? 'border-[#00922f] text-[#00922f]' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Earnings Summary & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex gap-6">
          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="text-xs text-gray-500 mb-1">TOTAL EARNINGS</div>
            <div className="text-xl font-bold">₹38,500</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="text-xs text-gray-500 mb-1">EARNED THIS MONTH</div>
            <div className="text-xl font-bold">₹5,200</div>
          </div>
        </div>
        <div className="flex gap-2">
          {['All', 'Internal Store', 'Partner Stores'].map(filter => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-2xl font-bold ${activeFilter === filter ? 'bg-[#00922f] text-white' : 'border border-[#00922f] text-[#00922f]'}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-[10px] border border-[#d9d9d9] bg-white">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#f4f4f4] text-xs text-left text-black">
              <th className="p-4 border border-[#d9d9d9] font-medium">INVOICE ID</th>
              <th className="p-4 border border-[#d9d9d9] font-medium">DATE & TIME</th>
              <th className="p-4 border border-[#d9d9d9] font-medium">ITEMS</th>
              <th className="p-4 border border-[#d9d9d9] font-medium">LOCATION</th>
              <th className="p-4 border border-[#d9d9d9] font-medium">AMOUNT</th>
              <th className="p-4 border border-[#d9d9d9] font-medium">INVOICE</th>
              <th className="p-4 border border-[#d9d9d9] font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows */}
            <tr>
              <td className="p-4 border border-[#d9d9d9]">#202521021234</td>
              <td className="p-4 border border-[#d9d9d9]">Mon, 24th Feb, 2025 07:30 PM</td>
              <td className="p-4 border border-[#d9d9d9]">5 Items</td>
              <td className="p-4 border border-[#d9d9d9]">Hyderabad</td>
              <td className="p-4 border border-[#d9d9d9] text-green-700 font-bold">₹5,400</td>
              <td className="p-4 border border-[#d9d9d9] text-[#00922f] font-semibold cursor-pointer">Download</td>
              <td className="p-4 border border-[#d9d9d9] text-[#00922f] font-semibold cursor-pointer">View Order</td>
            </tr>
            {/* Add more placeholder rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Revenue; 
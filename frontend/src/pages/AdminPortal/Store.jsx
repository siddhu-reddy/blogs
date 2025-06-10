import React, { useState } from "react";
import { useSidebar } from "../../hooks/useSidebar";

const TABS = ["Orders", "Products", "Earnings", "Reviews"];

const ordersData = [
  {
    id: "#123456",
    status: "NEW",
    date: "05 Mar '25 07:30PM",
    customer: "Rahul Sharma",
    items: "3 Items",
    location: "Hyderabad",
    amount: "₹580",
    delivered: true,
  },
  {
    id: "#123456",
    status: "",
    date: "07 Mar '25 06:30AM",
    customer: "Rohit Suresh",
    items: "10 Items",
    location: "Hyderabad",
    amount: "₹1,200",
    delivered: true,
  },
];

const productsData = [
  {
    name: "Brass Diya – Set of 5",
    category: "Puja Items",
    description: "Torem ipsum dolor sit a...",
    price: "₹150",
    lastUpdated: "05 May 2025",
    status: "In Stock",
  },
  {
    name: "Ganesh Idol - Eco-friendly",
    category: "Idols",
    description: "Torem ipsum dolor sit a...",
    price: "₹350",
    lastUpdated: "05 May 2025",
    status: "Out of Stock",
  },
];

const earningsData = [
  { id: "E001", date: "05 Mar '25", order: "#123456", amount: "₹580" },
  { id: "E002", date: "07 Mar '25", order: "#123457", amount: "₹1,200" },
];

const reviewsData = [
  { id: "R001", customer: "Rahul Sharma", rating: 5, comment: "Great service!" },
  { id: "R002", customer: "Rohit Suresh", rating: 4, comment: "Good products." },
];

const Store = () => {
  const { isMobile, sidebarExpanded } = useSidebar();
  const [activeTab, setActiveTab] = useState("Orders");
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Modal component
  const AddProductModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add Product</h3>
        {/* Add your form fields here */}
        <input className="border rounded-lg px-3 py-2 w-full mb-3" placeholder="Product Name" />
        <input className="border rounded-lg px-3 py-2 w-full mb-3" placeholder="Category" />
        <input className="border rounded-lg px-3 py-2 w-full mb-3" placeholder="Description" />
        <input className="border rounded-lg px-3 py-2 w-full mb-3" placeholder="Price" />
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-gray-200"
            onClick={() => setShowAddProduct(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-[#19A463] text-white"
            onClick={() => setShowAddProduct(false)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="flex flex-col w-full mt-20 min-h-screen bg-gray-50 p-4 md:p-6"
      style={{
        marginLeft: isMobile ? "0" : sidebarExpanded ? "220px" : "80px",
        width: isMobile ? "100%" : `calc(100% - ${sidebarExpanded ? "220px" : "80px"})`,
      }}
    >
      <div className="max-w-6xl mx-auto w-full px-2 md:px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 p-4">Pravishto Store Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-[#F6FCF8]">
              <div className="bg-[#C7E9D5] p-2 rounded-full">
                <i className="fas fa-shopping-bag text-[#2B7A4B]"></i>
              </div>
              <div>
                <div className="text-xs text-gray-500">TOTAL ORDERS</div>
                <div className="text-xl font-bold">1,234</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-[#F6FCF8]">
              <div className="bg-[#C7E9D5] p-2 rounded-full">
                <i className="fas fa-shopping-bag text-[#2B7A4B]"></i>
              </div>
              <div>
                <div className="text-xs text-gray-500">ORDERS DELIVERED TODAY</div>
                <div className="text-xl font-bold">12</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-[#F6FCF8]">
              <div className="bg-[#C7E9D5] p-2 rounded-full">
                <i className="fas fa-store text-[#2B7A4B]"></i>
              </div>
              <div>
                <div className="text-xs text-gray-500">ITEMS IN STORE</div>
                <div className="text-xl font-bold">16</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-[#F6FCF8]">
              <div className="bg-[#C7E9D5] p-2 rounded-full">
                <i className="fas fa-rupee-sign text-[#2B7A4B]"></i>
              </div>
              <div>
                <div className="text-xs text-gray-500">EARNINGS FROM STORE</div>
                <div className="text-xl font-bold">₹1,00,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex gap-6 border-b border-gray-200 mb-4 p-4">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`pb-2 text-sm font-semibold transition-colors duration-150 ${
                  activeTab === tab
                    ? "border-b-2 border-[#2B7A4B] text-[#2B7A4B]"
                    : "text-gray-500 hover:text-[#2B7A4B]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-2 md:p-4">
            {activeTab === "Orders" && (
              <div>
                <div className="flex items-center gap-2 mb-4 ">
                  <input
                    className="border rounded-lg px-2 py-1 text-sm flex-1"
                    placeholder="Search Bookings"
                  />
                  <button className="bg-[#E6F4EA] px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                    <i className="fas fa-filter"></i> Filters
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <thead>
                      <tr className="bg-[#D9D9D9]">
                        <th className="py-3 px-3 font-normal border-b border-gray-200">ORDER ID</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">DATE & TIME</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">CUSTOMER</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">ITEMS</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">LOCATION</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">AMOUNT</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersData.map((order, idx) => (
                        <tr className="border-b last:border-b-0" key={idx}>
                          <td className="py-3 px-3 flex items-center gap-2 whitespace-nowrap">
                            {order.id}
                            {order.status && (
                              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                                {order.status}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">{order.date}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{order.customer}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{order.items}</td>
                          <td className="py-3 px-3 flex items-center gap-1 whitespace-nowrap">
                            {order.location}
                            <i className="fas fa-location-arrow text-[#2B7A4B] text-xs"></i>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">{order.amount}</td>
                          <td className="py-3 px-3 flex gap-2 items-center whitespace-nowrap">
                            <span className="text-green-600 text-xs font-semibold flex items-center gap-1">
                              <i className="fas fa-check"></i> Delivered
                            </span>
                            <span className="text-[#2B7A4B] font-semibold text-xs cursor-pointer">View</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === "Products" && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 w-full">
                  <div className="flex flex-1 gap-2">
                    <input
                      className="border rounded-lg px-2 py-1 text-sm flex-1"
                      placeholder="Search Products"
                    />
                    <button className="bg-[#E6F4EA] px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                      <i className="fas fa-filter"></i> Filters
                    </button>
                  </div>
                  <button
                    className="bg-[#19A463] hover:bg-[#158a53] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ml-auto"
                    onClick={() => setShowAddProduct(true)}
                  >
                    <i className="fas fa-plus"></i> Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <thead>
                      <tr className="bg-[#D9D9D9]">
                        <th className="py-3 px-3 font-normal border-b border-gray-200">PRODUCT NAME</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">CATEGORY</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">DESCRIPTION</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">PRICE</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">LAST UPDATED</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">STATUS</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsData.map((product, idx) => (
                        <tr className="border-b last:border-b-0" key={idx}>
                          <td className="py-3 px-3 whitespace-nowrap">{product.name}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{product.category}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{product.description}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{product.price}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{product.lastUpdated}</td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            {product.status === "In Stock" ? (
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">In Stock</span>
                            ) : (
                              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">Out of Stock</span>
                            )}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="text-[#2B7A4B] font-semibold text-xs cursor-pointer">View Item</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {showAddProduct && <AddProductModal />}
              </div>
            )}
            {activeTab === "Earnings" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    className="border rounded-lg px-2 py-1 text-sm flex-1"
                    placeholder="Search Earnings"
                  />
                  <button className="bg-[#E6F4EA] px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                    <i className="fas fa-filter"></i> Filters
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <thead>
                      <tr className="bg-[#D9D9D9]">
                        <th className="py-3 px-3 font-normal border-b border-gray-200">EARNING ID</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">DATE</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">ORDER</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {earningsData.map((earning, idx) => (
                        <tr className="border-b last:border-b-0" key={idx}>
                          <td className="py-3 px-3 whitespace-nowrap">{earning.id}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{earning.date}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{earning.order}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{earning.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === "Reviews" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    className="border rounded-lg px-2 py-1 text-sm flex-1"
                    placeholder="Search Reviews"
                  />
                  <button className="bg-[#E6F4EA] px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                    <i className="fas fa-filter"></i> Filters
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <thead>
                      <tr className="bg-[#D9D9D9]">
                        <th className="py-3 px-3 font-normal border-b border-gray-200">REVIEW ID</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">CUSTOMER</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">RATING</th>
                        <th className="py-3 px-3 font-normal border-b border-gray-200">COMMENT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviewsData.map((review, idx) => (
                        <tr className="border-b last:border-b-0" key={idx}>
                          <td className="py-3 px-3 whitespace-nowrap">{review.id}</td>
                          <td className="py-3 px-3 whitespace-nowrap">{review.customer}</td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <span key={i} className="text-yellow-500">★</span>
                            ))}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">{review.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store; 
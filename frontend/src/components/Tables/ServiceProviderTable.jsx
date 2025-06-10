import { formatDate, MappingStyles } from "../../utils/utils";

const ServiceProviderTable = ({ data, selectedIds, toggleRowSelection }) => {
  const isApproved = (status) => status === "Approved";

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#f4f4f4] text-xs text-left text-black">
            <th className="p-4 border border-[#d9d9d9] font-medium">SELECT</th>
            <th className="p-4 border border-[#d9d9d9] font-medium">
              REGISTRATION ID
            </th>
            <th className="p-4 border border-[#d9d9d9] font-medium">NAME</th>
            <th className="p-4 border border-[#d9d9d9] font-medium">
              PHONE NUMBER
            </th>
            <th className="p-4 border border-[#d9d9d9] font-medium">
              SERVICE TYPE
            </th>
            <th className="p-4 border border-[#d9d9d9] font-medium">
              LOCATION
            </th>
            {/* Conditional columns for approved providers */}
            {data.some((item) => isApproved(item.status)) && (
              <>
                <th className="p-4 border border-[#d9d9d9] font-medium">
                  EXPERIENCE
                </th>
                <th className="p-4 border border-[#d9d9d9] font-medium">
                  RATING
                </th>
                <th className="p-4 border border-[#d9d9d9] font-medium">
                  BOOKINGS
                </th>
                <th className="p-4 border border-[#d9d9d9] font-medium">
                  EARNINGS
                </th>
              </>
            )}
            {/* Status column only for pending providers */}
            {data.some((item) => !isApproved(item.status)) && (
              <th className="p-4 border border-[#d9d9d9] font-medium">
                STATUS
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row._id}
              className="hover:bg-gray-50 border-t border-[#d9d9d9]"
            >
              <td className="p-4 border border-[#d9d9d9] text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.has(row._id)}
                  onChange={() => toggleRowSelection(row)}
                  className="form-checkbox"
                />
              </td>
              <td className="p-4 border border-[#d9d9d9]">
                <div className="font-medium">#{row._id}</div>
                <div className="text-xs">{formatDate(row.createdAt)}</div>
              </td>
              <td className="p-4 border border-[#d9d9d9] font-medium">
                {row.userType === "Store" ? (
                  <>
                    <div>{row.storeName}</div>
                    <div className="text-xs text-gray-500">{row.fullName}</div>
                  </>
                ) : (
                  row.fullName
                )}
              </td>
              <td className="p-4 border border-[#d9d9d9] font-medium">
                {row.phoneNumber}
              </td>
              <td className="p-4 border border-[#d9d9d9] font-medium text-center">
                {row.userType}
              </td>
              <td className="p-4 border border-[#d9d9d9] font-medium">
                {row.location}
              </td>
              {/* Conditional columns for approved providers */}
              {isApproved(row.status) && (
                <>
                  <td className="p-4 border border-[#d9d9d9] font-medium text-center">
                    {row.experience ? `${row.experience} years` : "-"}
                  </td>
                  <td className="p-4 border border-[#d9d9d9] font-medium text-center">
                    {row.rating?.overall ? (
                      <div className="flex items-center justify-center gap-1">
                        <span>{row.rating.overall.toFixed(1)}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-4 border border-[#d9d9d9] font-medium text-center">
                    {row.totalBookings || "-"}
                  </td>
                  <td className="p-4 border border-[#d9d9d9] font-medium text-center">
                    {row.totalEarnings
                      ? `₹${row.totalEarnings.toLocaleString()}`
                      : "-"}
                  </td>
                </>
              )}
              {/* Status column only for pending providers */}
              {!isApproved(row.status) && (
                <td className="p-4 border border-[#d9d9d9]">
                  <div
                    className={`inline-flex items-center gap-1 px-3 py-1 ${MappingStyles(
                      row.status
                    )} rounded-full text-sm`}
                  >
                    <span className="text-sm">{row.status}</span>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceProviderTable;

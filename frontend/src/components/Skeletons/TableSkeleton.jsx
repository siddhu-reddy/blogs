const TableSkeleton = ({ rows = 5, columns = 7 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse border-t border-[#d9d9d9]">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="p-4 border border-[#d9d9d9]">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;

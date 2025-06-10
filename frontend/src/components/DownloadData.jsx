import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";
//USAGE:
{
  /* <DownloadTableData
  selectedRows={selectedRows}
  filteredData={paginatedData}
  fileName="ServiceProviderData"
  buttonLabel="Download Excel ZIP"
/>
 */
}
// Props:
// selectedRows = selected filtered rows (subset)
// filteredData = all filtered rows (based on search + date filters)
// fileName = output file base name
// buttonLabel = button text

const DownloadTableData = ({
  selectedRows = [],
  filteredData = [],
  fileName = "export",
  buttonLabel = "Download as ZIP",
}) => {
  const handleExport = async () => {
    const exportData = selectedRows.length > 0 ? selectedRows : filteredData;

    if (!exportData || exportData.length === 0) {
      toast.error("No data to export.");
      return;
    }

    try {
      // Create worksheet from JSON data
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Write workbook to ArrayBuffer
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Convert ArrayBuffer to Uint8Array for JSZip
      const uint8Array = new Uint8Array(excelBuffer);

      // Create ZIP and add Excel file
      const zip = new JSZip();
      zip.file(`${fileName}.xlsx`, uint8Array);

      // Generate ZIP blob
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Trigger download
      saveAs(zipBlob, `${fileName}.zip`);

      toast.success("ZIP with Excel exported successfully!");
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to export ZIP.");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-white border-2 border-[#00922F] text-[#00922F] font-semibold px-4 py-2 rounded-md hover:bg-[#00922F]/10"
    >
      {buttonLabel}
    </button>
  );
};

export default DownloadTableData;

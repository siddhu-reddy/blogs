import React, {useState, useRef} from 'react'
import { useSidebar } from '../../hooks/useSidebar';
import { useNavigate } from 'react-router-dom';

const AddStaff = () => {
    const { isMobile, sidebarExpanded } = useSidebar();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: "",
    staffId: "",
    email: "",
    phone: "",
    password: "",
    profilePicture: null,
    role: "",
    });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Basic validation for file type and size
      const supportedFormats = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      const maxSizeMB = 10;

      if (!supportedFormats.includes(file.type)) {
        alert('Unsupported file format. Please upload PDF, JPG, or PNG.');
        setSelectedFile(null);
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size exceeds ${maxSizeMB} MB. Please choose a smaller file.`);
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } });
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

    const handleRoleSelect = (selectedRole) => {
      setFormData(prevFormData => ({
        ...prevFormData,
        role: selectedRole
      }));
    };
  return (
    <div
     className="flex flex-col w-full mt-[60px] min-h-screen bg-[#f9fafb] p-4 md:p-5"
      style={{
        marginLeft: isMobile ? "0" : sidebarExpanded ? "200px" : "70px",
        width: isMobile ? "100%" : `calc(100% - ${sidebarExpanded ? "220px" : "80px"})`
      }}>

        {/* Breadcrumb Navigation */}
      <div className="flex items-center font-semibold font-uber mb-6">
          <a
            className="text-[#00922F] hover:underline hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/staff");
            }}
          >
            Staff Management
          </a>
          <span className="mx-2 text-gray-500">{">"}</span>
          <span>Create New Staff</span>
        </div>

        {/* Form for Adding New Staff */}
      <form >
        {/* Basic Details Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-300 mb-6">
            <div className='mb-4 flex items-start gap-2'>
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.625 12.375C14.4141 12.375 17.5 15.4609 17.5 19.25C17.5 19.9531 16.9141 20.5 16.25 20.5H1.25C0.546875 20.5 0 19.9531 0 19.25C0 15.4609 3.04688 12.375 6.875 12.375H10.625ZM1.875 18.625H15.5859C15.2734 16.1641 13.1641 14.25 10.625 14.25H6.875C4.29688 14.25 2.1875 16.1641 1.875 18.625ZM8.75 10.5C5.97656 10.5 3.75 8.27344 3.75 5.5C3.75 2.76562 5.97656 0.5 8.75 0.5C11.4844 0.5 13.75 2.76562 13.75 5.5C13.75 8.27344 11.4844 10.5 8.75 10.5ZM8.75 2.375C6.99219 2.375 5.625 3.78125 5.625 5.5C5.625 7.25781 6.99219 8.625 8.75 8.625C10.4688 8.625 11.875 7.25781 11.875 5.5C11.875 3.78125 10.4688 2.375 8.75 2.375Z" fill="#00922F"/>
</svg>

                <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Staff Name*</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter staff name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Staff Id*</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter staff email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Id*</label>
            <input type="tel" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter staff phone number" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter staff role" />
          </div>
        </div>
        </div>

        {/* Verfication Details Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-300 mb-6">
            <div className='mb-4 flex items-start gap-2'>
                <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2578 4.17188C14.7266 4.64062 15 5.26562 15 5.92969V18C15 19.4062 13.8672 20.5 12.5 20.5H2.5C1.09375 20.5 0 19.4062 0 18V3C0 1.63281 1.09375 0.5 2.5 0.5H9.57031C10.2344 0.5 10.8594 0.773438 11.3281 1.24219L14.2578 4.17188ZM13.125 18V6.75H10C9.29688 6.75 8.75 6.20312 8.75 5.5V2.41406H2.5C2.14844 2.41406 1.875 2.6875 1.875 3.03906V18C1.875 18.3516 2.14844 18.625 2.5 18.625H12.5C12.8125 18.625 13.125 18.3516 13.125 18ZM6.48438 13.1953L9.57031 9.60156C9.92188 9.21094 10.5078 9.17188 10.8984 9.48438C11.2891 9.83594 11.3281 10.4219 11.0156 10.8125L7.26562 15.1875C7.07031 15.3828 6.83594 15.5 6.5625 15.5C6.28906 15.5 6.05469 15.4219 5.89844 15.2266L4.02344 13.3516C3.63281 13 3.63281 12.4141 4.02344 12.0625C4.375 11.6719 4.96094 11.6719 5.3125 12.0625L6.48438 13.1953Z" fill="#00922F"/>
</svg>

                <div>
                    <h2 className="text-xl font-semibold">Verification</h2>
                    <p className='text-xs'>Can be uploaded by User after Creation</p>
                </div>   
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="sm:p-1 lg:p-2"> {/* Responsive padding */}
      <h2 className="block text-sm font-medium text-gray-700 mb-1">ID Proof*</h2>

      <div
        className="relative w-full border-2 border-gray-300 rounded-lg p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-green-500 transition-colors duration-200"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf, .jpg, .jpeg, .png"
        />

        <div className="mb-3">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
        </div>

        <p className="text-sm sm:text-base text-gray-700 font-semibold mb-1">
          Click to browse files
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          Supported formats: PDF, JPG, PNG (Max 10 MB)
        </p>

        {selectedFile && (
          <p className="mt-4 text-sm sm:text-base text-green-600">
            Selected file: {selectedFile.name}
          </p>
        )}
      </div>
    </div>
    <div className="sm:p-1 lg:p-2"> {/* Responsive padding */}
      <h2 className="block text-sm font-medium text-gray-700 mb-1">Address Proof*</h2>

      <div
        className="relative w-full border-2 border-gray-300 rounded-lg p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-green-500 transition-colors duration-200"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf, .jpg, .jpeg, .png"
        />

        <div className="mb-3">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
        </div>

        <p className="text-sm sm:text-base text-gray-700 font-semibold mb-1">
          Click to browse files
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          Supported formats: PDF, JPG, PNG (Max 10 MB)
        </p>

        {selectedFile && (
          <p className="mt-4 text-sm sm:text-base text-green-600">
            Selected file: {selectedFile.name}
          </p>
        )}
      </div>
    </div>
        </div>
        </div>


        {/* Role Selection Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-300 mb-6">
        <h2 className="text-xl font-semibold mb-4">Role Selection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
                onClick={() => handleRoleSelect("Admin")}
                className={`p-4 border ${
                  formData.role === "Admin"
                    ? "border-[#00922F] bg-[#00922F]/10"
                    : "border-[#D9D9D9] hover:border-[#00922F]/50" // Added hover effect
                } rounded cursor-pointer`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="45"
                      height="45"
                      rx="4"
                      fill={
                        formData.role === "Admin"
                          ? "#00922F"
                          : "#D7F8E3"
                      }
                    />{" "}
                    {/* Conditional fill, added stroke */}
                    <path
                      d="M32.3438 14.4375C33.1875 14.8125 33.75 15.6094 33.75 16.5C33.75 28.6875 24.7969 34.5 22.4531 34.5C20.1094 34.5 11.25 28.5938 11.25 16.5C11.25 15.6094 11.7656 14.8125 12.6094 14.4375L21.6094 10.6875C21.8906 10.5938 22.1719 10.5 22.5 10.5C22.7812 10.5 23.0625 10.5938 23.3438 10.6875L32.3438 14.4375ZM22.5 32.25C25.5938 30.9844 31.5 26.0156 31.5 16.5L22.5 12.7969V32.25Z"
                      fill={formData.role === "Admin" ? "#D7F8E3" : "#00922F"}
                    />
                  </svg>

                  <div>
                    <h3 className="font-semibold">Admin</h3>
                    <p className="text-xs text-gray-400">Full System Access</p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleRoleSelect("Subadmin")}
                className={`p-4 border ${
                  formData.role === "Subadmin"
                    ? "border-[#00922F] bg-[#00922F]/10"
                    : "border-[#D9D9D9] hover:border-[#00922F]/50" // Added hover effect
                } rounded cursor-pointer`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    width="46"
                    height="45"
                    viewBox="0 0 46 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 4C0.5 1.79086 2.29086 0 4.5 0H41.5C43.7091 0 45.5 1.79086 45.5 4V41C45.5 43.2091 43.7091 45 41.5 45H4.5C2.29086 45 0.5 43.2091 0.5 41V4Z"
                      fill={
                        formData.role === "Subadmin"
                          ? "#00922F"
                          : "#D7F8E3"
                      }
                    />{" "}
                    {/* Conditional fill, added stroke */}
                    <path
                      d="M26.375 10.5C31.1094 10.5 35 14.3906 35 19.125C35 24.3281 30.2656 28.5469 24.9219 27.6094L23.9844 28.5469C23.6094 28.875 23.1875 29.0625 22.7188 29.0625H21.4062V30C21.4062 30.9844 20.5625 31.7812 19.5781 31.7812H18.6875V32.7188C18.6875 33.7031 17.8438 34.5 16.8594 34.5H12.7812C11.7969 34.5 11 33.7031 11 32.7188V28.5C11 27.8438 11.2344 27.2344 11.7031 26.7656L17.8906 20.5781C17.7969 20.0625 17.7969 19.5938 17.7969 19.125C17.7969 14.3906 21.6406 10.5 26.375 10.5ZM24.8281 25.2656C29.0469 26.3438 32.75 23.1094 32.75 19.125C32.75 15.6094 29.8906 12.75 26.375 12.75C22.8594 12.75 20.0469 15.6094 20.0469 19.125C20.0469 19.6406 20.0938 20.1562 20.2344 20.6719L20.375 21.2812L13.2969 28.3594C13.25 28.4062 13.25 28.4531 13.25 28.5V32.25H16.4375V29.5312H19.1562V26.8125H22.5312L24.2188 25.125L24.8281 25.2656ZM28.25 15.75C29.0469 15.75 29.75 16.4531 29.75 17.25C29.75 18.0938 29.0469 18.75 28.25 18.75C27.4062 18.75 26.75 18.0938 26.75 17.25C26.75 16.4531 27.4062 15.75 28.25 15.75Z"
                      fill={
                        formData.role === "Subadmin" ? "#D7F8E3" : "#00922F"
                      }
                    />
                  </svg>

                  <div>
                    <h3 className="font-semibold">Sub-Admin</h3>
                    <p className="text-xs text-gray-400">
                      Limited Admin Access
                    </p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleRoleSelect("Staff")}
                className={`p-4 border ${
                  formData.role === "Staff"
                    ? "border-[#00922F] bg-[#00922F]/10"
                    : "border-[#D9D9D9] hover:border-[#00922F]/50" // Added hover effect
                } rounded cursor-pointer`}
              >
                <div className="flex items-center gap-2">
                  <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.333374 4C0.333374 1.79086 2.12424 0 4.33337 0H41.3334C43.5425 0 45.3334 1.79086 45.3334 4V41C45.3334 43.2091 43.5425 45 41.3334 45H4.33337C2.12423 45 0.333374 43.2091 0.333374 41V4Z" fill={
                                        formData.role === "Staff"
                                          ? "#00922F"
                                          : "#D7F8E3"
                      }/>
                    <path d="M26.4896 24.8906C30.3802 25.5938 33.3334 28.9688 33.3334 33C33.3334 33.8438 32.6302 34.5 31.8334 34.5H13.8334C12.9896 34.5 12.3334 33.8438 12.3334 33C12.3334 28.9688 15.2396 25.5938 19.1302 24.8906L21.2396 29.1562L22.0834 26.25L20.5834 24H25.0834L23.5834 26.25L24.3802 29.1562L26.4896 24.8906ZM14.5834 32.25H20.3021L17.9584 27.6094C16.1302 28.5 14.8646 30.2344 14.5834 32.25ZM25.3177 32.25H31.0365C30.7552 30.2344 29.4896 28.5 27.6615 27.6094L25.3177 32.25ZM22.8334 22.5C19.5052 22.5 16.8334 19.8281 16.8334 16.5C16.8334 13.2188 19.5052 10.5 22.8334 10.5C26.1146 10.5 28.8334 13.2188 28.8334 16.5C28.8334 19.8281 26.1146 22.5 22.8334 22.5ZM22.8334 12.75C20.724 12.75 19.0834 14.4375 19.0834 16.5C19.0834 18.6094 20.724 20.25 22.8334 20.25C24.8959 20.25 26.5834 18.6094 26.5834 16.5C26.5834 14.4375 24.8959 12.75 22.8334 12.75Z" fill={
                                            formData.role === "Staff" ? "#D7F8E3" : "#00922F"
                                          }/>
                    </svg>


                  <div>
                    <h3 className="font-semibold">Staff</h3>
                    <p className="text-xs text-gray-400">
                      Limited Access to Portal
                    </p>
                  </div>
                </div>
              </div>
        </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white p-6 flex justify-between rounded-lg border border-gray-300 mb-6">
        <button
          type="submit"
          className=" bg-white hover:bg-red-200 border border-gray-900 text-black px-4 py-2 rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          className=" bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Create Staff ✓
        </button>
        </div>
        
        </form>
    </div>
  )
}

export default AddStaff

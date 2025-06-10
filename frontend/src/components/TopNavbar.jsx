import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import NotificationPage from "./Notification";
import { useSidebar } from "../hooks/useSidebar";
import {
  Bookings,
  Chat,
  Dashboard,
  Logout,
  Revenue,
  ServierProvider,
  Staff,
  Store,
} from "../assets/Icons";

// NavItem component for mobile menu
const NavItem = ({
  to,
  icon,
  label,
  active = false,
  onClick,
  logout = false,
}) => {
  return (
    <li>
      <button
        onClick={() => onClick(to)}
        className={`flex items-center justify-start
         w-full px-3 py-2 cursor-pointer ${
           active
             ? "bg-[#00922F] text-white"
             : "text-[#00922F] hover:bg-[#00922F] hover:text-white"
         }
        transition-colors relative`}
      >
        <span className={`mr-3 ${logout ? "text-red-500" : "text-inherit"}`}>
          {icon}
        </span>
        <span>{label}</span>
      </button>
    </li>
  );
};

const TopNavbar = () => {
  const {
    sidebarExpanded,
    // toggleSidebar,
    isMobile,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useSidebar();
  const { user, logout } = useAuth();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const role = user?.role || "customer";

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  // Handle click outside for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    // Add a small delay to prevent immediate closing
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen, setMobileMenuOpen]);

  // Helper function to navigate with role-based routing
  const handleNavigation = (path) => {
    if (path === "logout") {
      handleLogout();
      return;
    }

    const routeMap = {
      dashboard: `/${role}/dashboard`,
      bookings: `/${role}/bookings`,
      store: `/${role}/store`,
      revenue: `/${role}/revenue`,
      "service-provider": `/${role}/service-provider`,
      staff: `/${role}/staff`,
      "support-chat": `/${role}/support-chat`,
    };

    const targetPath = routeMap[path] || path;
    navigate(targetPath);

    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      sessionStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const navbarStyle = isMobile
    ? { width: "100%", marginLeft: 0 }
    : {
        marginLeft: sidebarExpanded ? "220px" : "80px",
        width: `calc(100% - ${sidebarExpanded ? "220px" : "80px"})`,
      };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-20 bg-[#D7F8E3] border-b border-gray-800"
        style={navbarStyle}
      >
        <div className="px-4 py-3 flex justify-between items-center">
          {/* Left side - Hamburger menu for mobile */}
          <div className="flex items-center justify-center gap-2">
            {isMobile && (
              <button
                ref={buttonRef}
                className="mr-4 text-gray-400 hover:text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}

            {/* Logo */}
            <div className="m-4">
              <img src={"/Pravishto.png"} alt="Logo" />
            </div>
          </div>

          {/* Right side - User and notifications */}
          <div className="flex items-center">
            {/* Notifications */}
            {role !== "admin" && (
              <button
                className="mr-5 relative text-gray-400 hover:text-white focus:outline-none"
                onClick={toggleNotification}
              >
                <svg
                  width="30"
                  height="28"
                  viewBox="0 0 46 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="45"
                    height="47"
                    rx="3.5"
                    fill={
                      notificationOpen ? "#00922F" : "rgba(255, 202, 32, 0.3)"
                    }
                    stroke="#00922F"
                  />
                  <path
                    d="M23 34.5C21.5938 34.5 20.5 33.4062 20.5 32H25.5C25.5 33.4062 24.3672 34.5 23 34.5ZM31.3984 28.6797C31.6328 28.9141 31.75 29.2266 31.75 29.5C31.7109 30.1641 31.2422 30.75 30.4609 30.75H15.5C14.7578 30.75 14.25 30.1641 14.25 29.5C14.25 29.2266 14.3281 28.9141 14.5625 28.6797C15.3047 27.8594 16.75 26.6484 16.75 22.625C16.75 19.6172 18.8594 17.1953 21.75 16.5703V15.75C21.75 15.0859 22.2969 14.5 23 14.5C23.6641 14.5 24.25 15.0859 24.25 15.75V16.5703C27.1016 17.1953 29.2109 19.6172 29.2109 22.625C29.2109 26.6484 30.6562 27.8594 31.3984 28.6797Z"
                    fill={notificationOpen ? "#51EE68FF" : "#00922F"}
                  />
                </svg>
              </button>
            )}

            {/* User profile */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#00922F] flex items-center justify-center text-black font-semibold overflow-hidden mr-2">
                <img
                  src="https://s3-alpha-sig.figma.com/img/49bf/9183/6dfc0f84b01d94c67e8e96bbdd6b10fe?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hjcNe7qYhuNWrZc-g7GU7Bg9To6Tct0q46UEvID~aEYvehggi70aqzgYDswe9Fs2a2hK-aW2OYfzSIIiZS-GNdTp5YB2NYvwXqyofyMdLQwgdUQyfd2qycUHnCdlHOmDuqWbmhbEekyRqkxlTGxFfLEK-PbyPanp8Q1ditWp22Pn98Of~gQBtOPFyBFHMZpEkvrjRlX4JUUY6SLo-ZAcbnyOwIFQwMl42RRQgjGnRAz8qGoUrh-QS6q7oB-nJfHVs7~UQm71UEqZDaMZ9wI33-1u-VfTObZz5muAPm7zA~PcKkU4JAm-xOrZT1cEzASoomZaJgQoryu4USHIjIo07g__"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium">
                  {user?.name || "User Name"}
                </div>
                <div className="text-xs text-gray-400 capitalize">{role}</div>
              </div>
              <ChevronDown className="ml-2 text-gray-400 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Notification component */}
      <NotificationPage
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-80 z-50"> {/* Adjusted top position */}
          <div
            ref={menuRef}
            className="bg-[#D7F8E3] p-4 h-full overflow-y-auto"
          >
            <nav className="space-y-6 list-none"> {/* Added list-none */}
              {["admin", "staff"].includes(role) && (
                <NavItem
                  to="dashboard"
                  icon={<Dashboard />}
                  label="Dashboard"
                  active={currentPath.includes("/dashboard")}
                  onClick={handleNavigation}
                />
              )}

              {["admin", "staff"].includes(role) && (
                <NavItem
                  to="bookings"
                  icon={<Bookings />}
                  label="Bookings"
                  active={currentPath.includes("/bookings")}
                  onClick={handleNavigation}
                />
              )}
              {role === "admin" && (
                <NavItem
                  to="store"
                  icon={<Store />}
                  label="Store"
                  active={currentPath.includes("/store")}
                  onClick={handleNavigation}
                />
              )}
              {role === "admin" && (
                <NavItem
                  to="revenue"
                  icon={<Revenue />}
                  label="Revenue"
                  active={currentPath.includes("/revenue")}
                  onClick={handleNavigation}
                />
              )}

              {role === "admin" && (
                <NavItem
                  to="service-provider"
                  icon={<ServierProvider />}
                  label="Service Provider"
                  active={currentPath.includes("/service-provider")}
                  onClick={handleNavigation}
                />
              )}

              {role === "admin" && (
                <NavItem
                  to="staff"
                  icon={<Staff />}
                  label="Staff Management"
                  active={currentPath.includes("/staff")}
                  onClick={handleNavigation}
                />
              )}
              {["admin", "staff"].includes(role) && (
                <NavItem
                  to="support-chat"
                  icon={<Chat />}
                  label="Support Chat"
                  active={currentPath.includes("/support-chat")}
                  onClick={handleNavigation}
                />
              )}

              {/* User Profile & Logout */}
              <div className="pt-6 mt-6 border-t border-gray-800">
                <div className="flex items-center py-2 px-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/49bf/9183/6dfc0f84b01d94c67e8e96bbdd6b10fe?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hjcNe7qYhuNWrZc-g7GU7Bg9To6Tct0q46UEvID~aEYvehggi70aqzgYDswe9Fs2a2hK-aW2OYfzSIIiZS-GNdTp5YB2NYvwXqyofyMdLQwgdUQyfd2qycUHnCdlHOmDuqWbmhbEekyRqkxlTGxFfLEK-PbyPanp8Q1ditWp22Pn98Of~gQBtOPFyBFHMZpEkvrjRlX4JUUY6SLo-ZAcbnyOwIFQwMl42RRQgjGnRAz8qGoUrh-QS6q7oB-nJfHVs7~UQm71UEqZDaMZ9wI33-1u-VfTObZz5muAPm7zA~PcKkU4JAm-xOrZT1cEzASoomZaJgQoryu4USHIjIo07g__"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">
                      {user?.name || "User Name"}
                    </div>
                    <div className="text-sm text-gray-400 capitalize">
                      {role}
                    </div>
                  </div>
                </div>

                <NavItem
                  to="logout"
                  icon={<Logout size={20} />}
                  label="Logout"
                  active={false}
                  logout={true}
                  onClick={handleNavigation}
                />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavbar;

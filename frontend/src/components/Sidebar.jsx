import { ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import useAuth from "../hooks/useAuth";
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

const Sidebar = () => {
  const { sidebarExpanded, setSidebarExpanded, isMobile, setMobileMenuOpen } =
    useSidebar();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const role = user?.role || "customer";

  const handleNavigation = (path) => {
    const routeMap = {
      dashboard: `/${role}/dashboard`,
      staff: `/admin/staff`,
    };

    const targetPath = routeMap[path] || path;
    navigate(targetPath);

    if (isMobile) setMobileMenuOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

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

  if (isMobile) return null;

  return (
    <aside
      className="fixed top-0 left-0 h-full bg-[#D7F8E3] z-5 w-full  flex flex-col items-center py-4"
      style={{ width: sidebarExpanded ? "220px" : "80px" }}
    >
      {/* Expand Button */}
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center w-full py-2 text-[#00922F] font-medium mb-4 hover:bg-[#00922F]/10 transition-colors rounded"
      >
        {sidebarExpanded ? (
          <div className="flex items-center text-sm">
            <span className="mr-2">Collapse</span>
            <ChevronRight className="rotate-180" size={16} />
          </div>
        ) : (
          <ChevronRight size={16} />
        )}
      </button>

      {/* Menu Items */}
      <div className="flex flex-col gap-4 w-full items-center">
        {["admin", "staff"].includes(role) && (
          <NavItem
            to="dashboard"
            icon={<Dashboard />}
            label="Dashboard"
            expanded={sidebarExpanded}
            active={currentPath.includes("/dashboard")}
            onClick={handleNavigation}
          />
        )}

        {["admin", "staff"].includes(role) && (
          <NavItem
            to="bookings"
            icon={<Bookings />}
            label="Bookings"
            expanded={sidebarExpanded}
            active={currentPath.includes("/bookings")}
            onClick={handleNavigation}
          />
        )}
        {role === "admin" && (
          <NavItem
            to="store"
            icon={<Store />}
            label="Store"
            expanded={sidebarExpanded}
            active={currentPath.includes("/store")}
            onClick={handleNavigation}
          />
        )}
        {role === "admin" && (
          <NavItem
            to="revenue"
            icon={<Revenue />}
            label="Revenue"
            expanded={sidebarExpanded}
            active={currentPath.includes("/revenue")}
            onClick={handleNavigation}
          />
        )}

        {role === "admin" && (
          <NavItem
            to="service-provider"
            icon={<ServierProvider />}
            label="Servie Provider"
            expanded={sidebarExpanded}
            active={currentPath.includes("/service-provider")}
            onClick={handleNavigation}
          />
        )}

        {role === "admin" && (
          <>
            <NavItem
              to="staff"
              icon={<Staff />}
              label="Staff Management"
              expanded={sidebarExpanded}
              active={currentPath.includes("/staff")}
              onClick={handleNavigation}
            />
          </>
        )}
        {["admin", "staff"].includes(role) && (
          <NavItem
            to="support-chat"
            icon={<Chat />}
            label="Support Chart"
            expanded={sidebarExpanded}
            active={currentPath.includes("/support-chat")}
            onClick={handleNavigation}
          />
        )}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto mb-4 text-red-500 px-4 py-2 rounded-lg  hover:bg-red-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Logout />
          {sidebarExpanded && <span>Log Out</span>}
        </div>
      </button>
    </aside>
  );
};

const NavItem = ({ to, icon, label, expanded, active = false, onClick }) => {
  return (
    <button
      onClick={() => onClick(to)}
      className={`flex items-center justify-${
        expanded ? "start" : "center"
      } w-full px-3 py-2 cursor-pointer
        ${
          active
            ? "text-[#00922F] bg-[#00922F]/20"
            : "text-[#00922F] hover:bg-[#00922F]/20 hover:text-[#00922F]"
        }
        transition-colors relative`}
      style={{ width: expanded ? "90%" : "70%", borderRadius: "4px" }}
    >
      <div
        className={`flex items-center ${
          expanded ? "justify-start" : "justify-center"
        } ${expanded ? "w-full" : ""}`}
      >
        {icon}
        {expanded && (
          <span className="ml-3 text-sm font-medium whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </button>
  );
};

export default Sidebar;

import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/AdminPortal/Dashboard";
import MainLayout from "./MainLayout";
import NotFound from "../pages/NotFound";
import Bookings from "../pages/AdminPortal/Bookings";
import Revenue from "../pages/AdminPortal/Revenue";
import ServiceProvider from "../pages/AdminPortal/ServiceProvider";
import Store from "../pages/AdminPortal/Store";
import SupportChat from "../pages/AdminPortal/SupportChat";
import StaffManagement from "../pages/AdminPortal/StaffManagement";
import AddStaff from "../pages/AdminPortal/AddStaff";
const AdminLayout = () => {
  return (
    <MainLayout>
      <Routes>
        {/* Admin Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="Revenue" element={<Revenue />} />
        <Route path="service-provider" element={<ServiceProvider />} />
        <Route path="store" element={<Store />} />
        <Route path="support-chat" element={<SupportChat />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="staff/add" element={<AddStaff />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default AdminLayout;

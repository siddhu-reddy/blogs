import { UserProvider } from "../context/UserContext";
import TopNavbar from "../components/TopNavbar";
import { SidebarProvider } from "../context/SidebarProvider";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <UserProvider>
      <SidebarProvider>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          <div className="flex flex-col w-full">
            {/* TopBar */}
            <TopNavbar />
            <div className="flex-1 p-4">{children}</div>
          </div>
        </div>
      </SidebarProvider>
    </UserProvider>
  );
};

export default MainLayout;

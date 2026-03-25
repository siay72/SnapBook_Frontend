import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">

      {/* Drawer toggle */}
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col min-h-screen">
        <Navbar />

        <main className="bg-white">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <Sidebar />

    </div>
  );
};

export default DashboardLayout;
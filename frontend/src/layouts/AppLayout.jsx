import { Outlet } from "react-router";
import AddApplicationModal from "../components/AppApplicationModal";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#050b18] text-slate-100">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Topbar />

        <main className="px-8 py-8">
          <Outlet />
        </main>
      </div>

      <AddApplicationModal />
    </div>
  );
}

export default AppLayout;
import {
  BarChart3,
  CircleHelp,
  LayoutDashboard,
  Plus,
  Settings,
  SquareKanban,
  User,
} from "lucide-react";
import { NavLink } from "react-router";
import { useAppData } from "../context/AppDataContext";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Tracker", to: "/tracker", icon: SquareKanban },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Profile", to: "/profile", icon: User },
];

function Sidebar() {
  const { openAddApplicationModal } = useAppData();

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-4 py-3 font-mono text-sm font-semibold tracking-wide transition ${
      isActive
        ? "bg-blue-100 text-blue-700"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-700/70 bg-[#030816]">
      <div className="px-6 py-7">
        <h1 className="text-2xl font-bold text-blue-100">OPTrack</h1>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300">
          Application Manager
        </p>
      </div>

      <nav className="mt-6 space-y-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.to} to={item.to} className={navClass}>
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-700/70 p-4">
        <button
          onClick={openAddApplicationModal}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-mono text-sm font-bold text-white transition hover:bg-blue-500 active:scale-[0.98]"
        >
          <Plus size={18} />
          Add Application
        </button>

        <div className="space-y-2">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 rounded-md px-4 py-3 font-mono text-sm font-semibold text-slate-300 hover:bg-slate-800"
          >
            <Settings size={18} />
            Settings
          </NavLink>

          <NavLink 
           to="/support"
           className="flex w-full items-center gap-3 rounded-md px-4 py-3 font-mono text-sm font-semibold text-slate-300 hover:bg-slate-800">
            <CircleHelp size={18} />
            Support
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
import { Bell, History, Search, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAppData } from "../context/AppDataContext";
import { useAuth } from "../context/AuthContext";

function Topbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const {
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationsRead,
    profile,
  } = useAppData();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut]= useState(false);
  const unreadCount = notifications.filter((item) => item.unread).length;
  const profileInitial = profile.name?.charAt(0).toUpperCase() || "U";

  function toggleNotifications() {
    setIsNotificationsOpen((prev) => !prev);
    setIsProfileOpen(false);
    markNotificationsRead();
  }

  function toggleProfile() {
    setIsProfileOpen((prev) => !prev);
    setIsNotificationsOpen(false);
  }

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();

      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsProfileOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  }

  return (
    <>
    <header className="sticky top-0 z-20 border-b border-slate-700/70 bg-[#050b18]/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="relative w-full max-w-xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search applications, companies, or tasks..."
            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-12 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400"
          />
        </div>

        <div className="relative flex items-center gap-5">
          <button
            onClick={() => {
              localStorage.removeItem("trackflow_applications");
              window.location.reload();
            }}
            className="text-slate-300 transition hover:rotate-[-25deg] hover:text-white"
            title="Reset mock data"
          >
            <History size={20} />
          </button>

          <button
            onClick={toggleNotifications}
            className="relative text-slate-300 hover:text-white"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleProfile}
            className="flex items-center gap-3 border-l border-slate-700 pl-5"
          >
            <div className="text-right">
              <p className="text-sm font-bold text-slate-100">
                {profile.name || "User"}
              </p>
              <p className="text-xs text-slate-400">{profile.headline}</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400 bg-slate-800 text-sm font-bold">
              {profileInitial}
            </div>
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                className="absolute right-20 top-12 w-80 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-2xl shadow-black/40"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
              >
                <h3 className="mb-3 font-bold text-slate-100">
                  Notifications
                </h3>

                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="rounded-lg border border-slate-700 bg-slate-950 p-3"
                    >
                      <p className="font-semibold text-slate-100">
                        {notification.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        {notification.message}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {isProfileOpen && (
              <motion.div
                className="absolute right-0 top-12 w-56 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl shadow-black/40"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
              >
                <Link
                  to="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <User size={18} />
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-red-300 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut size={18} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
    {isLoggingOut && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
        <div className="flex flex-col items-center rounded-2xl border border-slate-700 bg-slate-900 px-8 py-6 shadow-2xl shadow-black/40">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-400" />

          <p className="mt-4 font-mono text-sm font-semibold text-slate-100">
            Logging out...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Taking you back to InternTrack
          </p>
        </div>
      </div>
    )}
    </>
  );
}

export default Topbar;
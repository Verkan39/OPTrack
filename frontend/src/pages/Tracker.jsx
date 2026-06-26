import { Filter, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import KanbanColumn from "../components/KanbanColumn";
import { useAppData } from "../context/AppDataContext";

const columns = [
  { title: "Wishlist", status: "wishlist", color: "bg-slate-400" },
  { title: "Applied", status: "applied", color: "bg-cyan-300" },
  { title: "Interviewing", status: "interview", color: "bg-pink-300" },
  { title: "Offer", status: "offer", color: "bg-blue-300" },
  { title: "Rejected", status: "rejected", color: "bg-red-300" },
];

function TrackerPage() {
  const { filteredApplications, setIsAddModalOpen } = useAppData();
  const [activeStatus, setActiveStatus] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const visibleApplications = useMemo(() => {
    if (activeStatus === "all") return filteredApplications;

    return filteredApplications.filter(
      (application) => application.status === activeStatus
    );
  }, [activeStatus, filteredApplications]);

  const totalVisible = visibleApplications.length;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-blue-300">
            Tracker
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-100">
            Application Board
          </h2>

          <p className="mt-2 text-lg text-slate-300">
            Manage your job search pipeline across multiple stages.
          </p>
        </div>

        <div className="relative flex gap-3">
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-5 py-3 font-mono font-bold text-slate-100 transition hover:bg-slate-700 active:scale-[0.98]"
          >
            <Filter size={18} />
            Filter
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-mono font-bold text-white transition hover:bg-blue-500 active:scale-[0.98]"
          >
            <Plus size={18} />
            Add Application
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                className="absolute right-0 top-14 z-20 w-64 rounded-xl border border-slate-700 bg-slate-900 p-3 shadow-2xl shadow-black/40"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
              >
                <div className="mb-2 flex items-center justify-between px-2">
                  <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
                    Filter Status
                  </p>

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-slate-500 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                {["all", "wishlist", "applied", "interview", "offer", "rejected"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setActiveStatus(status);
                        setIsFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-mono text-sm capitalize transition ${
                        activeStatus === status
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {status}
                      {activeStatus === status && <span>✓</span>}
                    </button>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {activeStatus !== "all" && (
        <motion.div
          className="flex items-center justify-between rounded-xl border border-blue-400/30 bg-blue-400/10 px-5 py-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-mono text-sm text-blue-200">
            Showing {totalVisible} application(s) with status:{" "}
            <span className="font-bold uppercase">{activeStatus}</span>
          </p>

          <button
            onClick={() => setActiveStatus("all")}
            className="font-mono text-sm font-bold text-blue-200 hover:text-white"
          >
            Clear Filter
          </button>
        </motion.div>
      )}

      <section className="grid gap-6 2xl:grid-cols-5 xl:grid-cols-3">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            color={column.color}
            applications={visibleApplications.filter(
              (application) => application.status === column.status
            )}
          />
        ))}
      </section>
    </motion.div>
  );
}

export default TrackerPage;
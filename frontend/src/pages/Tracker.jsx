import { AlertCircle, Filter, Loader2, Plus, X } from "lucide-react";
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

const filterOptions = [
  { label: "All", status: "all" },
  { label: "Wishlist", status: "wishlist" },
  { label: "Applied", status: "applied" },
  { label: "Interview", status: "interview" },
  { label: "Offer", status: "offer" },
  { label: "Rejected", status: "rejected" },
];

function TrackerPage() {
  const {
    applications,
    openAddApplicationModal,
    isLoadingApplications,
    apiError,
  } = useAppData();

  const [activeStatus, setActiveStatus] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const visibleApplications = useMemo(() => {
    if (activeStatus === "all") return applications;

    return applications.filter(
      (application) => application.status === activeStatus
    );
  }, [activeStatus, applications]);

  const totalVisible = visibleApplications.length;
  const hasApplications = applications.length > 0;
  const isFiltered = activeStatus !== "all";

  function clearFilters() {
    setActiveStatus("all");
  }

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

          <p className="mt-2 max-w-2xl text-lg text-slate-300">
            Manage your job search pipeline across wishlist, applied,
            interview, offer, and rejected stages.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddApplicationModal}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-mono font-bold text-white transition hover:bg-blue-500 active:scale-[0.98]"
        >
          <Plus size={18} />
          Add Application
        </button>
      </section>

      {apiError && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-amber-100">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />
          <p className="text-sm">{apiError}</p>
        </div>
      )}

      <section className="rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-sm text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-100">{totalVisible}</span> of{" "}
            <span className="font-bold text-slate-100">
              {applications.length}
            </span>{" "}
            application(s)
          </p>

          <div className="relative flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-5 py-3 font-mono font-bold text-slate-100 transition hover:bg-slate-700 active:scale-[0.98]"
            >
              <Filter size={18} />
              {activeStatus === "all" ? "Filter" : activeStatus}
            </button>

            {isFiltered && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-2 rounded-lg border border-blue-400/30 bg-blue-400/10 px-5 py-3 font-mono font-bold text-blue-200 transition hover:bg-blue-400/20 active:scale-[0.98]"
              >
                <X size={18} />
                Clear
              </button>
            )}

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
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      className="text-slate-500 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {filterOptions.map((option) => (
                    <button
                      type="button"
                      key={option.status}
                      onClick={() => {
                        setActiveStatus(option.status);
                        setIsFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-mono text-sm transition ${
                        activeStatus === option.status
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {option.label}
                      {activeStatus === option.status && <span>✓</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {activeStatus !== "all" && (
          <div className="mt-4 border-t border-slate-800 pt-4">
            <p className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-blue-200">
              Status: {activeStatus}
            </p>
          </div>
        )}
      </section>

      {isLoadingApplications ? (
        <section className="flex min-h-80 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 p-8">
          <div className="text-center">
            <Loader2 className="mx-auto animate-spin text-blue-300" size={32} />
            <p className="mt-4 font-mono text-sm uppercase tracking-widest text-slate-400">
              Loading applications
            </p>
          </div>
        </section>
      ) : !hasApplications ? (
        <section className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-10 text-center shadow-2xl shadow-black/20">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
            <Plus size={26} />
          </div>

          <h3 className="mt-5 text-2xl font-bold text-slate-100">
            No applications yet
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-slate-400">
            Add your first application to start tracking companies, platforms,
            deadlines, statuses, notes, and follow-ups.
          </p>

          <button
            type="button"
            onClick={openAddApplicationModal}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-mono text-sm font-bold text-white transition hover:bg-blue-500 active:scale-[0.98]"
          >
            <Plus size={18} />
            Add First Application
          </button>
        </section>
      ) : totalVisible === 0 ? (
        <section className="rounded-2xl border border-slate-800 bg-slate-950 p-10 text-center shadow-2xl shadow-black/20">
          <h3 className="text-2xl font-bold text-slate-100">
            No applications in this status
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-slate-400">
            Your applications exist, but none are currently in this status.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-blue-400/30 bg-blue-400/10 px-5 py-3 font-mono text-sm font-bold text-blue-200 transition hover:bg-blue-400/20 active:scale-[0.98]"
          >
            Clear Filter
          </button>
        </section>
      ) : (
        <section className="grid gap-6 xl:grid-cols-3 2xl:grid-cols-5">
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
      )}
    </motion.div>
  );
}

export default TrackerPage;
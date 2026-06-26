import { Filter } from "lucide-react";
import { motion } from "motion/react";
import KanbanColumn from "../components/KanbanColumn";
import { useAppData } from "../context/AppDataContext";

const columns = [
  { title: "Wishlist", status: "wishlist", color: "bg-slate-400" },
  { title: "Applied", status: "applied", color: "bg-cyan-300" },
  { title: "Interviewing", status: "interview", color: "bg-pink-300" },
  { title: "Offer", status: "offer", color: "bg-blue-300" },
];

function TrackerPage() {
  const { filteredApplications } = useAppData();

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <section className="flex items-start justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100">
            Application Board
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            Manage your job search pipeline across multiple stages.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-5 py-3 font-mono font-bold text-slate-100 transition hover:bg-slate-700 active:scale-[0.98]">
          <Filter size={18} />
          Filter
        </button>
      </section>

      <section className="grid gap-6 xl:grid-cols-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            color={column.color}
            applications={filteredApplications.filter(
              (application) => application.status === column.status
            )}
          />
        ))}
      </section>
    </motion.div>
  );
}

export default TrackerPage;
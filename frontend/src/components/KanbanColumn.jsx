import { MoreHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ApplicationCard from "./ApplicationCard";

function KanbanColumn({ title, color, applications }) {
  return (
    <section className="min-h-[620px] rounded-2xl border border-slate-800 bg-slate-900/50 p-4 shadow-2xl shadow-black/10">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${color}`} />

          <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-slate-100">
            {title}
          </h3>

          <span className="rounded-full bg-slate-700 px-2 py-1 text-xs font-bold text-slate-300">
            {applications.length}
          </span>
        </div>

        <button className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <motion.div layout className="space-y-4">
        <AnimatePresence>
          {applications.length === 0 ? (
            <motion.div
              className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 p-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-mono text-sm text-slate-500">
                No cards here
              </p>
            </motion.div>
          ) : (
            applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default KanbanColumn;
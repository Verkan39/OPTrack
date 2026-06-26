import { MoreHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ApplicationCard from "./ApplicationCard";

function KanbanColumn({ title, color, applications }) {
  return (
    <section className="min-h-[650px] rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${color}`} />
          <h3 className="font-mono text-lg font-bold uppercase tracking-widest text-slate-100">
            {title}
          </h3>
          <span className="rounded-full bg-slate-700 px-2 py-1 text-xs font-bold text-slate-300">
            {applications.length}
          </span>
        </div>

        <MoreHorizontal size={20} className="text-slate-400" />
      </div>

      <motion.div layout className="space-y-4">
        <AnimatePresence>
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default KanbanColumn;
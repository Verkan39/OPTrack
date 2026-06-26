import { Eye, Paperclip } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

function ApplicationCard({ application }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/applications/${application.id}`}
        className="block rounded-xl border border-slate-700 bg-slate-800/70 p-4 transition hover:border-blue-400 hover:bg-slate-800"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 font-bold text-blue-300">
            {application.company.charAt(0)}
          </div>

          <span className="font-mono text-sm text-slate-300">
            {application.lastUpdated}
          </span>
        </div>

        <div className="mt-5">
          <h4 className="font-bold text-slate-100">{application.role}</h4>
          <p className="text-slate-300">{application.company}</p>
        </div>

        <div className="mt-5 border-t border-slate-700 pt-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-lg font-bold text-blue-100">
              {application.salary}
            </p>

            <div className="flex gap-2 text-slate-400">
              <Paperclip size={16} />
              <Eye size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ApplicationCard;
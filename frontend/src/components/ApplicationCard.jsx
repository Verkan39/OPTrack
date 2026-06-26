import { Eye, MapPin, Paperclip } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import StatusBadge from "./StatusBadge";

function ApplicationCard({ application }) {
  const companyInitial = application.company?.charAt(0) || "?";

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
        className="group block rounded-xl border border-slate-700 bg-slate-800/70 p-4 transition hover:border-blue-400 hover:bg-slate-800 hover:shadow-xl hover:shadow-blue-950/30"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 font-bold text-blue-300 transition group-hover:border-blue-400">
            {companyInitial}
          </div>

          <span className="font-mono text-xs text-slate-400">
            {application.lastUpdated}
          </span>
        </div>

        <div className="mt-5">
          <h4 className="font-bold text-slate-100 group-hover:text-blue-200">
            {application.role}
          </h4>

          <p className="mt-1 text-sm font-semibold text-slate-300">
            {application.company}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <MapPin size={14} />
            <span>{application.location}</span>
          </div>
        </div>

        <div className="mt-4">
          <StatusBadge status={application.status} />
        </div>

        <div className="mt-5 border-t border-slate-700 pt-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm font-bold text-blue-100">
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
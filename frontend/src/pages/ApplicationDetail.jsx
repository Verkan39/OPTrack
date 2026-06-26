import { CalendarDays, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import StatusBadge from "../components/StatusBadge";
import { useAppData } from "../context/AppDataContext";

function ApplicationDetailPage() {
  const { id } = useParams();
  const { applications, updateApplicationStatus } = useAppData();

  const application = applications.find((item) => item.id === Number(id));

  if (!application) {
    return <p className="text-slate-300">Application not found.</p>;
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="font-mono text-sm text-slate-400">
        <Link
          to="/tracker"
          className="text-slate-400 transition hover:text-blue-300 hover:underline"
        >
          Applications
        </Link>{" "}
        &gt;{" "}
        <span className="text-slate-100">
          {application.role} at {application.company}
        </span>
      </p>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-100">
                {application.role}
              </h2>

              <p className="mt-2 text-lg text-slate-300">
                {application.company} • {application.location || "Location not added"}
              </p>
            </div>

            <StatusBadge status={application.status} />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Info label="Salary" value={application.salary || "Not added"} />
            <Info label="Platform" value={application.platform || "Not added"} />
            <Info label="Last Updated" value={application.lastUpdated || "Recently"} />
          </div>
        </div>

        <div className="rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-600 to-blue-900 p-8 shadow-xl shadow-blue-950/40">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-blue-100">
            Update Status
          </p>

          <p className="mt-3 text-sm text-blue-100/80">
            Move this application across your pipeline.
          </p>

          <select
            value={application.status}
            onChange={(event) =>
              updateApplicationStatus(application.id, event.target.value)
            }
            className="mt-6 w-full rounded-lg border border-blue-300 bg-slate-900 px-4 py-3 font-bold text-white outline-none"
          >
            <option value="wishlist">Wishlist</option>
            <option value="applied">Applied</option>
            <option value="online_assessment">Online Assessment</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="ghosted">Ghosted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <article className="rounded-2xl border border-slate-700 bg-slate-900">
          <div className="border-b border-slate-700 p-6">
            <h3 className="text-xl font-bold text-slate-100">Notes</h3>
            <p className="mt-1 text-sm text-slate-400">
              Important context, recruiter details, preparation points, or follow-up reminders.
            </p>
          </div>

          <div className="p-6 text-slate-300">
            {application.notes ? (
              <p className="whitespace-pre-wrap leading-7">{application.notes}</p>
            ) : (
              <p className="text-slate-500">No notes added yet.</p>
            )}
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h3 className="font-bold text-slate-100">Application Link</h3>

            {application.applicationLink ? (
              <a
                href={application.applicationLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-blue-400/30 bg-blue-400/10 px-4 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-400/20"
              >
                <span className="truncate">Open application</span>
                <ExternalLink size={16} />
              </a>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                No application link added.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h3 className="font-bold text-slate-100">Important Dates</h3>

            <div className="mt-4 space-y-3">
              <DateRow
                label="Applied Date"
                value={application.appliedDate}
              />

              <DateRow
                label="Next Follow-up"
                value={application.nextFollowUp}
              />

              <DateRow
                label="Deadline"
                value={application.deadline}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h3 className="font-bold text-slate-100">Resume Version</h3>

            <p className="mt-4 text-sm text-slate-300">
              {application.resumeVersion || "No resume version added."}
            </p>
          </div>
        </aside>
      </section>

      <Link to="/tracker" className="inline-block text-blue-300 hover:underline">
        Back to tracker
      </Link>
    </motion.div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-2 font-bold capitalize text-slate-100">{value}</p>
    </div>
  );
}

function DateRow({ label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
      <div className="rounded-lg bg-blue-400/10 p-2 text-blue-300">
        <CalendarDays size={16} />
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-200">
          {formatDate(value)}
        </p>
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "Not added";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default ApplicationDetailPage;
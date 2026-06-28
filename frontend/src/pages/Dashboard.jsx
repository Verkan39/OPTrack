import {
  AlertCircle,
  ArrowRight,
  Award,
  CalendarDays,
  Loader2,
  Plus,
  Send,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { useAppData } from "../context/AppDataContext";
import { useAuth } from "../context/AuthContext";

const statusGroups = [
  { label: "Wishlist", status: "wishlist", barClass: "bg-slate-400" },
  { label: "Applied", status: "applied", barClass: "bg-cyan-300" },
  { label: "Interview", status: "interview", barClass: "bg-pink-300" },
  { label: "Offer", status: "offer", barClass: "bg-blue-300" },
  { label: "Rejected", status: "rejected", barClass: "bg-red-300" },
];

function formatDate(value) {
  if (!value) return "Recently";

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusCount(applications, status) {
  return applications.filter((application) => application.status === status)
    .length;
}

function Dashboard() {
  const { applications, isLoadingApplications, apiError, openAddApplicationModal } =
    useAppData();
  const { user } = useAuth();

  const username = user?.username || "there";
  const totalApplications = applications.length;

  const interviewCount = getStatusCount(applications, "interview");
  const offerCount = getStatusCount(applications, "offer");
  const activeCount = applications.filter((application) =>
    ["applied", "interview"].includes(application.status)
  ).length;
  const responseCount = applications.filter((application) =>
    ["interview", "offer", "rejected"].includes(application.status)
  ).length;

  const responseRate =
    totalApplications > 0
      ? Math.round((responseCount / totalApplications) * 100)
      : 0;

  const recentApplications = applications.slice(0, 5);

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-blue-300">
            Dashboard
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-100">
            Hey, {username}
          </h2>

          <p className="mt-2 max-w-2xl text-slate-300">
            Track all your applications at one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openAddApplicationModal}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-mono text-sm font-bold text-white transition hover:bg-blue-500 active:scale-[0.98]"
          >
            <Plus size={18} />
            Add Application
          </button>

          <Link
            to="/tracker"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 font-mono text-sm font-bold text-slate-100 transition hover:border-blue-400 hover:text-blue-200 active:scale-[0.98]"
          >
            Open Tracker
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {apiError && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-amber-100">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />
          <p className="text-sm">{apiError}</p>
        </div>
      )}

      {isLoadingApplications ? (
        <section className="flex min-h-80 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 p-8">
          <div className="text-center">
            <Loader2 className="mx-auto animate-spin text-blue-300" size={32} />
            <p className="mt-4 font-mono text-sm uppercase tracking-widest text-slate-400">
              Loading dashboard data
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="grid gap-5 lg:grid-cols-4">
            <StatCard
              icon={Send}
              label="Applications Sent"
              value={String(totalApplications).padStart(2, "0")}
              pill=""
              tone="blue"
            />

            <StatCard
              icon={CalendarDays}
              label="Interviews"
              value={String(interviewCount).padStart(2, "0")}
              pill=""
              tone="cyan"
            />

            <StatCard
              icon={Award}
              label="Offers Received"
              value={String(offerCount).padStart(2, "0")}
              pill=""
              tone="pink"
            />

            <StatCard
              icon={TrendingUp}
              label="Response Rate"
              value={`${responseRate}%`}
              pill={`${activeCount} active`}
              tone="blue"
            />
          </section>

          {totalApplications === 0 ? (
            <section className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-10 text-center shadow-2xl shadow-black/20">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                <Send size={26} />
              </div>

              <h3 className="mt-5 text-2xl font-bold text-slate-100">
                Start building your application pipeline
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-slate-400">
                Add your first internship or job application and this dashboard
                will automatically show your progress, recent activity, and
                status distribution.
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
          ) : (
            <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl shadow-black/20">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">
                    Pipeline Snapshot
                  </h3>
                  <p className="text-sm text-slate-400">
                    Current status distribution across all applications.
                  </p>
                </div>

                <div className="mt-7 space-y-5">
                  {statusGroups.map((group) => {
                    const count = getStatusCount(applications, group.status);
                    const percentage =
                      totalApplications > 0
                        ? Math.round((count / totalApplications) * 100)
                        : 0;

                    return (
                      <div key={group.status}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-semibold text-slate-200">
                            {group.label}
                          </span>
                          <span className="font-mono text-slate-400">
                            {count} · {percentage}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                          <motion.div
                            className={`h-full rounded-full ${group.barClass}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.45 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/20">
                <div className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100">
                      Recent Applications
                    </h3>
                    <p className="text-sm text-slate-400">
                      Latest opportunities added to your pipeline.
                    </p>
                  </div>

                  <Link
                    to="/tracker"
                    className="hidden rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-200 active:scale-[0.98] sm:inline-flex"
                  >
                    View All
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left">
                    <thead className="bg-slate-900">
                      <tr className="font-mono text-xs uppercase tracking-widest text-slate-400">
                        <th className="px-6 py-4">Company</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Source</th>
                        <th className="px-6 py-4">Updated</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentApplications.map((application) => (
                        <tr
                          key={application.id}
                          className="border-t border-slate-800 text-sm transition hover:bg-slate-900/70"
                        >
                          <td className="px-6 py-5">
                            <Link
                              to={`/applications/${application.id}`}
                              className="font-bold text-slate-100 hover:text-blue-300"
                            >
                              {application.company}
                            </Link>
                          </td>

                          <td className="px-6 py-5">
                            <p className="font-semibold text-slate-100">
                              {application.role}
                            </p>
                            <p className="text-xs text-slate-400">
                              {application.location || "Location not added"}
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <StatusBadge status={application.status} />
                          </td>

                          <td className="px-6 py-5 text-slate-400">
                            {application.platform || "Manual"}
                          </td>

                          <td className="px-6 py-5 text-slate-400">
                            {formatDate(application.lastUpdated)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-slate-800 p-4 sm:hidden">
                  <Link
                    to="/tracker"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-200 active:scale-[0.98]"
                  >
                    View Full Tracker
                  </Link>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </motion.div>
  );
}

export default Dashboard;
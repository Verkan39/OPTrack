import { Award, CalendarDays, Send, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { useAppData } from "../context/AppDataContext";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
const [momentumView, setMomentumView] = useState("weekly");
  const { applications, isLoadingApplications, apiError } = useAppData();
  const {user} =useAuth();
  const username=user?.username || "there";

  const totalApplications = applications.length;
  const interviewCount = applications.filter(
    (application) => application.status === "interview"
  ).length;
  const offerCount = applications.filter(
    (application) => application.status === "offer"
  ).length;
  const activeCount = applications.filter(
    (application) =>
      application.status === "applied" || application.status === "interview"
  ).length;

  const dailyBars = [30, 55, 42, 70, 36, 85, 62];
    const weeklyBars = [45, 65, 35, 85, 55, 70, 40];

  const momentumBars = momentumView === "daily" ? dailyBars : weeklyBars;

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

          <p className="mt-2 text-slate-300">
            You currently have{" "}
            <span className="font-bold text-blue-300">
              {interviewCount} interviews
            </span>{" "}
            and{" "}
            <span className="font-bold text-emerald-300">
              {activeCount} active applications
            </span>
            .
          </p>
        </div>

        <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 font-mono text-xs text-slate-400">
          Last updated: Just now
        </span>
      </section>

      <section className="grid gap-5 lg:grid-cols-4">
        <StatCard
          icon={Send}
          label="Applications Sent"
          value={String(totalApplications).padStart(2, "0")}
          pill="+ mock data"
          tone="blue"
        />

        <StatCard
          icon={CalendarDays}
          label="Interviews"
          value={String(interviewCount).padStart(2, "0")}
          pill="active"
          tone="cyan"
        />

        <StatCard
          icon={Award}
          label="Offers Received"
          value={String(offerCount).padStart(2, "0")}
          pill="pending"
          tone="pink"
        />

        <StatCard
          icon={TrendingUp}
          label="Active Pipeline"
          value={String(activeCount).padStart(2, "0")}
          pill="in progress"
          tone="blue"
        />
      </section>

      <section className="rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-100">
              Application Momentum
            </h3>
            <p className="text-slate-400">Last 30 days activity volume</p>
          </div>

          <div className="rounded-lg bg-slate-900 p-1">
            <button
                onClick={() => setMomentumView("daily")}
                className={`rounded-md px-4 py-2 transition ${
                momentumView === "daily"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
            >
                Daily
            </button>

            <button
                onClick={() => setMomentumView("weekly")}
                className={`rounded-md px-4 py-2 transition ${
                momentumView === "weekly"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
            >
                Weekly
            </button>
            </div>
        </div>

        <div className="mt-12 flex h-64 items-end gap-5 border-b border-slate-700 px-4">
          {momentumBars.map((height, index) => (
            <motion.div
              key={index}
              className={`w-full rounded-t-lg ${
                index === 3
                  ? "bg-blue-500 shadow-lg shadow-blue-500/30"
                  : "bg-slate-800"
              }`}
              style={{ height: `${height}%` }}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.08 }}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-4 font-mono text-xs text-slate-400">
            {momentumView === "weekly" ? (
                <>
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span className="text-blue-300">Week 4 Current</span>
                </>
            ) : (
                <>
                <span>Mon</span>
                <span>Tue/Wed</span>
                <span>Thu/Fri</span>
                <span className="text-blue-300">Weekend</span>
                </>
            )}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between p-6">
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
            className="rounded-lg bg-blue-100 px-5 py-2 font-semibold text-blue-900 transition hover:bg-blue-200 active:scale-[0.98]"
          >
            View Full Tracker
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-180 text-left">
            <thead className="bg-slate-900">
              <tr className="font-mono text-xs uppercase tracking-widest text-slate-400">
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Last Updated</th>
              </tr>
            </thead>

            <tbody>
              {applications.slice(0, 5).map((application) => (
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
                      {application.location}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={application.status} />
                  </td>

                  <td className="px-6 py-5 text-slate-400">
                    {application.platform}
                  </td>

                  <td className="px-6 py-5 text-slate-400">
                    {application.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}

export default Dashboard;
import { Award, CalendarDays, Send } from "lucide-react";
import { Link } from "react-router";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import {useAppData} from "../context/AppDataContext";

function Dashboard() {
    const { applications } = useAppData();
  return (
    <div className="space-y-8">
      <section className="flex items-start justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100">
            Good Morning, Alex
          </h2>
          <p className="mt-2 text-slate-300">
            You have{" "}
            <span className="font-bold text-blue-300">3 interviews</span>{" "}
            scheduled for this week. Stay focused!
          </p>
        </div>

        <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 font-mono text-xs text-slate-400">
          Last updated: Just now
        </span>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <StatCard
          icon={Send}
          label="Applications Sent"
          value="48"
          pill="+12% vs last month"
          tone="blue"
        />
        <StatCard
          icon={CalendarDays}
          label="Interviews Scheduled"
          value="12"
          pill="3 this week"
          tone="cyan"
        />
        <StatCard
          icon={Award}
          label="Offers Received"
          value="02"
          pill="2 pending response"
          tone="pink"
        />
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-950 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-100">
              Application Momentum
            </h3>
            <p className="text-slate-400">Last 30 days activity volume</p>
          </div>

          <div className="rounded-lg bg-slate-900 p-1">
            <button className="rounded-md px-4 py-2 text-slate-400">Daily</button>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
              Weekly
            </button>
          </div>
        </div>

        <div className="mt-12 flex h-64 items-end gap-5 border-b border-slate-700 px-4">
          {[45, 65, 35, 85, 55, 70, 40].map((height, index) => (
            <div
              key={index}
              className={`w-full rounded-t-lg ${
                index === 3 ? "bg-blue-600" : "bg-slate-800"
              }`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-4 font-mono text-xs text-slate-400">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span className="text-blue-300">Week 4 Current</span>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
        <div className="flex items-center justify-between p-6">
          <h3 className="text-2xl font-bold text-slate-100">
            Recent Applications
          </h3>

          <Link
            to="/tracker"
            className="rounded-lg bg-blue-100 px-5 py-2 font-semibold text-blue-900 hover:bg-blue-200"
          >
            View Full Tracker
          </Link>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-900">
            <tr className="font-mono text-xs uppercase tracking-widest text-slate-400">
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {applications.slice(0, 3).map((application) => (
              <tr
                key={application.id}
                className="border-t border-slate-800 text-sm"
              >
                <td className="px-6 py-5 font-bold text-slate-100">
                  {application.company}
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
                  {application.lastUpdated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Dashboard;
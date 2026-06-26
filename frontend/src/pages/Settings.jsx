import { useState } from "react";

function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [compactCards, setCompactCards] = useState(false);

  return (
    <div className="space-y-8">
      <section>
        <p className="font-mono text-sm uppercase tracking-[0.35em] text-blue-300">
          Settings
        </p>
        <h2 className="mt-3 text-4xl font-bold text-slate-100">Settings</h2>
        <p className="mt-2 text-slate-300">
          Manage your profile, notifications, and tracker preferences.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h3 className="text-xl font-bold text-slate-100">
            Notification Preferences
          </h3>

          <div className="mt-6 space-y-4">
            <ToggleRow
              title="Email alerts"
              description="Receive reminders for interviews and follow-ups."
              enabled={emailAlerts}
              onChange={() => setEmailAlerts((prev) => !prev)}
            />

            <ToggleRow
              title="Weekly digest"
              description="Get a weekly summary of your job search progress."
              enabled={weeklyDigest}
              onChange={() => setWeeklyDigest((prev) => !prev)}
            />

            <ToggleRow
              title="Compact tracker cards"
              description="Show smaller cards on the kanban board."
              enabled={compactCards}
              onChange={() => setCompactCards((prev) => !prev)}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h3 className="text-xl font-bold text-slate-100">Profile</h3>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-400 bg-slate-800 text-xl font-bold text-blue-200">
              V
            </div>

            <div>
              <p className="font-bold text-slate-100">Vedanshu</p>
              <p className="text-sm text-slate-400">Job Seeker Pro</p>
            </div>
          </div>

          <button className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-mono font-bold text-white hover:bg-blue-500">
            Edit Profile
          </button>
        </div>
      </section>
    </div>
  );
}

function ToggleRow({ title, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 p-4">
      <div>
        <p className="font-bold text-slate-100">{title}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>

      <button
        onClick={onChange}
        className={`relative h-7 w-12 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export default SettingsPage;
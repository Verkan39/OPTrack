import {
  Bell,
  CheckCircle2,
  Database,
  FileText,
  Lock,
  MonitorCog,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useAppData } from "../context/AppDataContext";

function SettingsPage() {
  const { profile, applications, isLoadingProfile, apiError } = useAppData();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [compactCards, setCompactCards] = useState(false);

  const profileInitial = useMemo(() => {
    const name = profile?.name || "User";
    return name.trim().charAt(0).toUpperCase() || "U";
  }, [profile?.name]);

  const accountDetails = [
    { label: "Name", value: profile?.name || "Not added" },
    { label: "Headline", value: profile?.headline || "Not added" },
    { label: "Email", value: profile?.email || "Not added" },
    { label: "Target role", value: profile?.targetRole || "Not added" },
    { label: "Location", value: profile?.location || "Not added" },
  ];

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-blue-300">
            Settings
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-100">
            Workspace Settings
          </h2>

          <p className="mt-2 max-w-2xl text-slate-300">
            Manage your account overview, tracker preferences, and data safety
            information for OPTrack.
          </p>
        </div>

        <Link
          to="/profile"
          className="rounded-lg bg-blue-600 px-5 py-3 font-mono text-sm font-bold text-white transition hover:bg-blue-500 active:scale-[0.98]"
        >
          Edit Profile
        </Link>
      </section>

      {apiError && (
        <section className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm text-amber-100">
          {apiError}
        </section>
      )}

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-black/20">
          <div className="flex align-middle gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-400/40 bg-blue-500/10 text-blue-200">
              <UserRound size={26} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-100 items-center justify-center">
                Account Overview
              </h3>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 md:flex-row md:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-blue-400/60 bg-slate-950 text-3xl font-black text-blue-200">
              {profileInitial}
            </div>

            <div className="min-w-0">
              <p className="text-2xl font-bold text-slate-100">
                {isLoadingProfile ? "Loading profile..." : profile?.name || "Profile incomplete"}
              </p>
              <p className="mt-1 text-slate-400">
                {profile?.headline || "Add a headline from your profile page."}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-blue-300">
                {applications.length} saved application(s)
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {accountDetails.map((item) => (
              <InfoRow key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-3">
              <Bell className="text-blue-300" size={22} />
              <h3 className="text-xl font-bold text-slate-100">
                Preferences
              </h3>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              These are MVP interface preferences. Backend persistence can be
              added later if needed.
            </p>

            <div className="mt-6 space-y-4">
              <ToggleRow
                title="Email alerts"
                description="Reminder preference for interviews and follow-ups."
                enabled={emailAlerts}
                onChange={() => setEmailAlerts((prev) => !prev)}
              />

              <ToggleRow
                title="Weekly digest"
                description="Summarize application progress once a week."
                enabled={weeklyDigest}
                onChange={() => setWeeklyDigest((prev) => !prev)}
              />

              <ToggleRow
                title="Compact tracker cards"
                description="Prepare a smaller kanban-card layout preference."
                enabled={compactCards}
                onChange={() => setCompactCards((prev) => !prev)}
              />
            </div>
          </div> */}

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-300" size={22} />
              <h3 className="text-xl font-bold text-slate-100">
                Data & Privacy
              </h3>
            </div>

            <div className="mt-5 space-y-3">
              <SafetyItem
                icon={Lock}
                title="Session based authentication"
                description="Your data is safe with our robust tech stack."
              />

              <SafetyItem
                icon={Database}
                title="Private database layer"
                description="The database is being accessed by backend making it secure"
              />

              <SafetyItem
                icon={CheckCircle2}
                title="User-owned records"
                description="Applications are scoped to the logged-in user."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <ActionCard
          icon={FileText}
          title="Export data"
          description="CSV/PDF export feature will soon be added."
          tag="Coming soon"
        />

        <ActionCard
          icon={MonitorCog}
          title="Appearance"
          description="Theme and layout controls will be persisted later."
          tag="Coming Soon"
        />

        <ActionCard
          icon={Bell}
          title="Smart reminders"
          description="Follow-up reminders will be generated from application deadlines."
          tag="Coming Soon"
        />
      </section>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function ToggleRow({ title, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div>
        <p className="font-bold text-slate-100">{title}</p>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
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

function SafetyItem({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="mt-0.5 text-blue-300">
        <Icon size={18} />
      </div>

      <div>
        <p className="font-bold text-slate-100">{title}</p>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, description, tag }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-blue-300">
          <Icon size={22} />
        </div>

        <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-blue-200">
          {tag}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-100">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

export default SettingsPage;
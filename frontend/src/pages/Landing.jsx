import { Link } from "react-router";
import { ArrowRight, BarChart3, Briefcase, CheckCircle2, Layers } from "lucide-react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          InternTrack
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.35em] text-blue-300">
              Application Tracker
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              Track every internship application in one clean dashboard.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              InternTrack helps students manage applications across LinkedIn,
              WellFound, Internshala, company websites, referrals and more.
              Keep track of deadlines, interviews, offers, notes and follow-ups
              without losing context.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Start Tracking
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl shadow-blue-950/30">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Pipeline Overview</p>
                  <h2 className="text-2xl font-bold text-white">
                    24 Applications
                  </h2>
                </div>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
                  Active
                </span>
              </div>

              <div className="space-y-4">
                {[
                  ["Google", "SWE Intern", "Interview"],
                  ["Razorpay", "Backend Intern", "Applied"],
                  ["Zepto", "Frontend Intern", "OA"],
                  ["Atlan", "Product Intern", "Wishlist"],
                ].map(([company, role, status]) => (
                  <div
                    key={company}
                    className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-4"
                  >
                    <div>
                      <p className="font-semibold text-slate-100">{company}</p>
                      <p className="text-sm text-slate-400">{role}</p>
                    </div>

                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-blue-300">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-20 md:grid-cols-3">
          <FeatureCard
            icon={Briefcase}
            title="Centralized tracking"
            description="Manage applications from different platforms in one place."
          />

          <FeatureCard
            icon={BarChart3}
            title="Analytics dashboard"
            description="See your active pipeline, interviews, offers and progress."
          />

          <FeatureCard
            icon={Layers}
            title="Resume and notes"
            description="Store resume versions, links, notes, deadlines and follow-ups."
          />
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-300">
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 leading-7 text-slate-400">{description}</p>
    </div>
  );
}

export default LandingPage;
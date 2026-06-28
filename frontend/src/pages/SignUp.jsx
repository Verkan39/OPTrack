import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          OPTrack
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-900 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_460px]">
        <section>
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-blue-300">
            Start Tracking
          </p>

          <h1 className="mt-5 max-w-2xl text-5xl font-bold leading-tight tracking-tight text-white">
            Build your personal job-search command center.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Create an account to save applications, deadlines, links, resume
            versions, notes, follow-ups, interviews and offers.
          </p>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
            <FeaturePill
              icon={Briefcase}
              title="Application Board"
              description="Organize opportunities by status."
            />

            <FeaturePill
              icon={BarChart3}
              title="Progress Dashboard"
              description="See your job search momentum."
            />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl shadow-blue-950/30">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                Create account
              </h2>
              <p className="mt-2 text-slate-400">
                Sign up and start managing your applications.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                  Username
                </span>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-11 py-3 text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-400"
                    placeholder="Choose username"
                    required
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                  Email
                </span>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-11 py-3 text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                  Password
                </span>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-11 py-3 text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-400"
                    placeholder="Create password"
                    required
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-mono font-bold text-white transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating account..." : "Sign up"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-300 hover:text-blue-200 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeaturePill({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <div className="mb-3 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-300">
        <Icon size={22} />
      </div>

      <h3 className="font-bold text-white">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

export default SignupPage;
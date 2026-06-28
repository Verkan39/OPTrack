import { useMemo, useState } from "react";
import {
  Bug,
  Clock,
  ExternalLink,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const supportEmail = "vedanshumeharia0@gmail.com"; // replace with your real email
const githubIssuesUrl = "https://github.com/Verkan39/OPTrack/issues"; // replace

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Bug Report",
    message: "",
  });

  const mailtoLink = useMemo(() => {
    const subject = encodeURIComponent(`[OPTrack Support] ${formData.category}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.category}\n\nMessage:\n${formData.message}`
    );

    return `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    window.location.href = mailtoLink;
  };

  const faqs = [
    {
      question: "What is OPTrack used for?",
      answer:
        "OPTrack helps you track internship and job applications across platforms like LinkedIn, WellFound, Internshala, referrals, and company career pages.",
    },
    {
      question: "Is my application data saved?",
      answer:
        "Yes. Your applications and profile data are saved through the Django backend and are linked to your logged-in account.",
    },
    {
      question: "Can I edit or delete an application?",
      answer:
        "Yes. You can add, edit, update status, and delete applications from the Tracker page.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
            <LifeBuoy size={16} />
            Support Center
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How can we help?
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Find answers, report issues, or send feedback about OPTrack. This page keeps support
            simple and transparent for the MVP.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <a
            href={`mailto:${supportEmail}`}
            className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-cyan-400/40 hover:bg-slate-900"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <Mail size={22} />
            </div>

            <h2 className="text-lg font-semibold text-white">Email support</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Send a direct email for bugs, feedback, or suggestions.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-cyan-300">
              Contact now
              <ExternalLink size={15} className="transition group-hover:translate-x-0.5" />
            </div>
          </a>

          <a
            href={githubIssuesUrl}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-purple-400/40 hover:bg-slate-900"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-400/10 text-purple-300">
              <Bug size={22} />
            </div>

            <h2 className="text-lg font-semibold text-white">Report on GitHub</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Open an issue if something is broken or needs improvement.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-purple-300">
              Create issue
              <ExternalLink size={15} className="transition group-hover:translate-x-0.5" />
            </div>
          </a>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
              <Clock size={22} />
            </div>

            <h2 className="text-lg font-semibold text-white">MVP support</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              This is an early project, so support is currently handled manually through email or
              GitHub issues.
            </p>

            <div className="mt-4 text-sm text-emerald-300">Simple. Honest. Useful.</div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <MessageCircle size={21} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">Send a support request</h2>
                <p className="text-sm text-slate-400">
                  This opens your mail app with the request pre-filled.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                >
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Account/Profile Issue</option>
                  <option>Application Tracking Issue</option>
                  <option>General Feedback</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe the issue or suggestion..."
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Open email request
                <Mail size={17} />
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                  <HelpCircle size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">FAQs</h2>
                  <p className="text-sm text-slate-400">Common questions about OPTrack.</p>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <h3 className="text-sm font-semibold text-white">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <ShieldCheck size={21} />
                </div>

                <h2 className="text-xl font-semibold text-white">Before reporting</h2>
              </div>

              <ul className="space-y-3 text-sm leading-6 text-slate-400">
                <li className="flex gap-3">
                  <Bug className="mt-0.5 shrink-0 text-slate-500" size={17} />
                  Mention what page the issue happened on.
                </li>
                <li className="flex gap-3">
                  <Bug className="mt-0.5 shrink-0 text-slate-500" size={17} />
                  Include what you expected and what actually happened.
                </li>
                <li className="flex gap-3">
                  <Bug className="mt-0.5 shrink-0 text-slate-500" size={17} />
                  Add browser console errors if available.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
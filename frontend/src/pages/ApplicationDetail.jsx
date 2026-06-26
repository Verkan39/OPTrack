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
    <div className="space-y-6">
      <p className="font-mono text-sm text-slate-400">
        Applications &gt;{" "}
        <span className="text-slate-100">
          {application.role} at {application.company}
        </span>
      </p>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-100">
                {application.role}
              </h2>
              <p className="mt-2 text-lg text-slate-300">
                {application.company} • {application.location}
              </p>
            </div>

            <StatusBadge status={application.status} />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Info label="Salary Range" value={application.salary} />
            <Info label="Source" value={application.platform} />
            <Info label="Last Updated" value={application.lastUpdated} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-blue-600 p-8">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-blue-100">
            Update Status
          </p>

          <select
            value={application.status}
            onChange={(event) => updateApplicationStatus(application.id, event.target.value)}
            className="mt-6 w-full rounded-lg border border-blue-300 bg-slate-800 px-4 py-3 font-bold text-white"
            >
                <option value="wishlist">Wishlist</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
            </select>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <article className="rounded-2xl border border-slate-700 bg-slate-900">
          <div className="border-b border-slate-700 p-6">
            <h3 className="text-xl font-bold text-slate-100">
              Job Description
            </h3>
          </div>

          <div className="space-y-5 p-6 text-slate-300">
            <p>
              This is a static placeholder for the job description. Later, this
              page will show the real application details from the Django API.
            </p>

            <h4 className="font-bold text-slate-100">Key Responsibilities</h4>

            <ul className="list-disc space-y-2 pl-6">
              <li>Track application progress across multiple platforms.</li>
              <li>Store notes, recruiter details, and important documents.</li>
              <li>Help users prepare for interviews and follow-ups.</li>
            </ul>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h3 className="font-bold text-slate-100">Contact Info</h3>
            <p className="mt-4 text-slate-300">Recruiter Name</p>
            <p className="text-sm text-slate-500">recruiter@example.com</p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h3 className="font-bold text-slate-100">Timeline</h3>
            <div className="mt-4 space-y-4 text-sm text-slate-300">
              <p>✓ Application Submitted</p>
              <p>✓ Recruiter Review</p>
              <p>○ Screening Call</p>
            </div>
          </div>
        </aside>
      </section>

      <Link to="/tracker" className="inline-block text-blue-300 hover:underline">
        Back to tracker
      </Link>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-2 font-bold text-slate-100">{value}</p>
    </div>
  );
}

export default ApplicationDetailPage;
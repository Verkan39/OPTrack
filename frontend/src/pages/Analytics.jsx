import { useMemo } from "react";
import { useAppData } from "../context/AppDataContext";

const statusMeta = {
  wishlist: {
    label: "Wishlist",
    description: "Saved roles you are planning to apply for.",
  },
  applied: {
    label: "Applied",
    description: "Applications submitted and waiting for updates.",
  },
  interview: {
    label: "Interview",
    description: "Applications that converted into interview rounds.",
  },
  rejected: {
    label: "Rejected",
    description: "Applications that have been closed or rejected.",
  },
  offer: {
    label: "Offer",
    description: "Applications that converted into offers.",
  },
};

const statusOrder = ["wishlist", "applied", "interview", "rejected", "offer"];

function normalizeStatus(status) {
  const normalizedStatus = String(status || "")
    .toLowerCase()
    .trim();

  if (normalizedStatus === "saved") return "wishlist";

  return normalizedStatus || "wishlist";
}

function formatPercentage(value) {
  if (!Number.isFinite(value)) return "0%";

  return `${Math.round(value)}%`;
}

function getTopEntry(counts) {
  const entries = Object.entries(counts);

  if (entries.length === 0) return null;

  return entries.sort((a, b) => b[1] - a[1])[0];
}

function StatCard({ label, value, helper }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
        {label}
      </p>
      <p className="mt-4 text-3xl font-bold text-slate-100">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{helper}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 p-8 text-center">
      <p className="text-lg font-semibold text-slate-100">No applications yet</p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
        Add your first application from the tracker page and this analytics
        dashboard will start showing conversion rates, platform performance, and
        your current pipeline.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <section className="grid gap-5 md:grid-cols-4">
      {["one", "two", "three", "four"].map((item) => (
        <div
          key={item}
          className="h-36 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70"
        />
      ))}
    </section>
  );
}

function AnalyticsPage() {
  const { applications, isLoadingApplications, apiError } = useAppData();

  const analytics = useMemo(() => {
    const totalApplications = applications.length;

    const statusCounts = statusOrder.reduce((counts, status) => {
      counts[status] = 0;
      return counts;
    }, {});

    const platformCounts = {};

    applications.forEach((application) => {
      const status = normalizeStatus(application.status);
      const platform = application.platform?.trim() || "Unknown";

      statusCounts[status] = (statusCounts[status] || 0) + 1;
      platformCounts[platform] = (platformCounts[platform] || 0) + 1;
    });

    const interviewCount = statusCounts.interview || 0;
    const offerCount = statusCounts.offer || 0;
    const rejectedCount = statusCounts.rejected || 0;
    const respondedCount = interviewCount + offerCount + rejectedCount;
    const activePipelineCount =
      (statusCounts.wishlist || 0) +
      (statusCounts.applied || 0) +
      (statusCounts.interview || 0);

    const topPlatform = getTopEntry(platformCounts);

    return {
      totalApplications,
      statusCounts,
      platformStats: Object.entries(platformCounts).sort((a, b) => b[1] - a[1]),
      interviewRate:
        totalApplications === 0
          ? 0
          : ((interviewCount + offerCount) / totalApplications) * 100,
      responseRate:
        totalApplications === 0 ? 0 : (respondedCount / totalApplications) * 100,
      offerRate: totalApplications === 0 ? 0 : (offerCount / totalApplications) * 100,
      activePipelineCount,
      bestPlatform: topPlatform ? topPlatform[0] : "No data yet",
      bestPlatformCount: topPlatform ? topPlatform[1] : 0,
      recentApplications: applications.slice(0, 5),
    };
  }, [applications]);

  if (isLoadingApplications) {
    return (
      <div className="space-y-6">
        <section>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">
            Analytics
          </p>
          <h2 className="mt-3 text-4xl font-bold text-slate-100">
            Performance Analytics
          </h2>
          <p className="mt-2 max-w-2xl text-slate-300">
            Loading your application data from Django...
          </p>
        </section>

        <LoadingState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-xl shadow-slate-950/30">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">
          Analytics
        </p>
        <h2 className="mt-3 text-4xl font-bold text-slate-100">
          Performance Analytics
        </h2>
        <p className="mt-2 max-w-2xl text-slate-300">
          Track your application volume, response rate, interview conversion,
          and strongest platforms using live data from your tracker.
        </p>
      </section>

      {apiError && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
          {apiError}
        </div>
      )}

      {analytics.totalApplications === 0 ? (
        <EmptyState />
      ) : (
        <>
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Applications"
              value={analytics.totalApplications}
              helper="All tracked roles in your pipeline."
            />
            <StatCard
              label="Interview Rate"
              value={formatPercentage(analytics.interviewRate)}
              helper="Applications that reached interview or offer stage."
            />
            <StatCard
              label="Response Rate"
              value={formatPercentage(analytics.responseRate)}
              helper="Interview, offer, and rejected applications combined."
            />
            <StatCard
              label="Best Platform"
              value={analytics.bestPlatform}
              helper={`${analytics.bestPlatformCount} application${
                analytics.bestPlatformCount === 1 ? "" : "s"
              } tracked here.`}
            />
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                    Status Distribution
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-100">
                    Current pipeline health
                  </h3>
                </div>
                <p className="text-sm text-slate-400">
                  Active pipeline: {analytics.activePipelineCount}
                </p>
              </div>

              <div className="mt-6 space-y-5">
                {statusOrder.map((status) => {
                  const count = analytics.statusCounts[status] || 0;
                  const percentage =
                    analytics.totalApplications === 0
                      ? 0
                      : (count / analytics.totalApplications) * 100;

                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-slate-100">
                            {statusMeta[status].label}
                          </p>
                          <p className="text-slate-500">
                            {statusMeta[status].description}
                          </p>
                        </div>
                        <p className="font-mono text-slate-300">
                          {count} · {formatPercentage(percentage)}
                        </p>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-cyan-400"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Platform Breakdown
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-100">
                Where your applications are going
              </h3>

              <div className="mt-6 space-y-4">
                {analytics.platformStats.map(([platform, count]) => {
                  const percentage =
                    analytics.totalApplications === 0
                      ? 0
                      : (count / analytics.totalApplications) * 100;

                  return (
                    <div
                      key={platform}
                      className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-medium text-slate-100">{platform}</p>
                        <p className="font-mono text-sm text-slate-400">
                          {count} · {formatPercentage(percentage)}
                        </p>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-emerald-400"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Conversion Snapshot
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-100">
                Quick success signals
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">Offer Rate</p>
                  <p className="mt-2 text-2xl font-bold text-slate-100">
                    {formatPercentage(analytics.offerRate)}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">Applications in Progress</p>
                  <p className="mt-2 text-2xl font-bold text-slate-100">
                    {analytics.activePipelineCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Recent Activity
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-100">
                Latest tracked applications
              </h3>

              <div className="mt-6 divide-y divide-slate-800 overflow-hidden rounded-xl border border-slate-800">
                {analytics.recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex flex-col gap-2 bg-slate-950/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-100">
                        {application.role}
                      </p>
                      <p className="text-sm text-slate-400">
                        {application.company} · {application.platform}
                      </p>
                    </div>
                    <span className="w-fit rounded-full border border-slate-700 px-3 py-1 text-xs font-medium capitalize text-slate-300">
                      {normalizeStatus(application.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default AnalyticsPage;
function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-4xl font-bold text-slate-100">
          Performance Analytics
        </h2>
        <p className="mt-2 max-w-2xl text-slate-300">
          Track conversion rates, platform effectiveness, and application
          momentum. We will build this after the tracker is connected to the API.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {["Total Applications", "Interview Rate", "Avg. Response Time", "Best Platform"].map(
          (item) => (
            <div
              key={item}
              className="rounded-xl border border-slate-700 bg-slate-900 p-6"
            >
              <p className="font-mono text-sm uppercase tracking-widest text-slate-400">
                {item}
              </p>
              <p className="mt-4 text-2xl font-bold text-slate-100">--</p>
            </div>
          )
        )}
      </section>
    </div>
  );
}

export default AnalyticsPage;
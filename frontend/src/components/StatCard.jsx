function StatCard({ icon: Icon, label, value, pill, tone = "blue" }) {
  const toneClasses = {
    blue: "bg-blue-600 text-white",
    cyan: "bg-cyan-500 text-slate-950",
    pink: "bg-pink-500 text-white",
  };

  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg shadow-black/20">
      <div className="flex items-start justify-between">
        <div className={`rounded-lg p-3 ${toneClasses[tone]}`}>
          <Icon size={24} />
        </div>

        {pill && (
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
            {pill}
          </span>
        )}
      </div>

      <p className="mt-5 font-mono text-xs uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className="mt-3 text-4xl font-semibold text-slate-100">{value}</p>
    </article>
  );
}

export default StatCard;
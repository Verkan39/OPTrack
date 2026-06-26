const statusStyles = {
  wishlist: "border-slate-500 bg-slate-500/10 text-slate-300",
  applied: "border-blue-400 bg-blue-400/10 text-blue-300",
  interview: "border-pink-400 bg-pink-400/10 text-pink-300",
  offer: "border-emerald-400 bg-emerald-400/10 text-emerald-300",
  rejected: "border-red-400 bg-red-400/10 text-red-300",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase ${
        statusStyles[status] || statusStyles.applied
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
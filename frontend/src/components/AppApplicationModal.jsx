import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAppData } from "../context/AppDataContext";

function AddApplicationModal() {
  const { isAddModalOpen, setIsAddModalOpen, addApplication } = useAppData();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    platform: "",
    location: "",
    salary: "",
    status: "applied",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    addApplication(formData);

    setFormData({
      company: "",
      role: "",
      platform: "",
      location: "",
      salary: "",
      status: "applied",
    });
  }

  return (
    <AnimatePresence>
      {isAddModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-black/50"
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">
                  Add Application
                </h2>
                <p className="text-sm text-slate-400">
                  Add a new opportunity to your tracker.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
              <Input
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
              <Input
                label="Platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                placeholder="LinkedIn, WellFound..."
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              <Input
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="$100k - $150k"
              />

              <label className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                  Status
                </span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-400"
                >
                  <option value="wishlist">Wishlist</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-mono font-bold text-white transition hover:bg-blue-500 active:scale-[0.98]"
            >
              Save Application
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="space-y-2">
      <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-400"
      />
    </label>
  );
}

export default AddApplicationModal;
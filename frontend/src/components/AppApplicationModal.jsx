import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAppData } from "../context/AppDataContext";

const initialFormData = {
  company: "",
  role: "",
  platform: "other",
  location: "",
  salary: "",
  status: "wishlist",
  applicationLink: "",
  resumeVersion: "",
  notes: "",
  appliedDate: "",
  deadline: "",
  nextFollowUp: "",
};

function getFormDataFromApplication(application) {
  return {
    company: application.company || "",
    role: application.role || "",
    platform: application.platform || "other",
    location: application.location === "Not added" ? "" : application.location || "",
    salary: application.salary === "Not added" ? "" : application.salary || "",
    status: application.rawStatus || application.status || "wishlist",
    applicationLink: application.applicationLink || "",
    resumeVersion: application.resumeVersion || "",
    notes: application.notes || "",
    appliedDate: application.appliedDate || "",
    deadline: application.deadline || "",
    nextFollowUp: application.nextFollowUp || "",
  };
}

function AddApplicationModal() {
  const {
    isAddModalOpen,
    editingApplication,
    closeApplicationModal,
    addApplication,
    updateApplicationDetails,
    isSavingApplication,
  } = useAppData();

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");

  const isEditMode = Boolean(editingApplication);

  useEffect(() => {
    if (!isAddModalOpen) return;

    if (editingApplication) {
      setFormData(getFormDataFromApplication(editingApplication));
    } else {
      setFormData(initialFormData);
    }

    setFormError("");
  }, [isAddModalOpen, editingApplication]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setFormError("");

      if (isEditMode) {
        await updateApplicationDetails(editingApplication.id, formData);
      } else {
        await addApplication(formData);
      }

      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
      setFormError(
        isEditMode
          ? "Could not update application. Please try again."
          : "Could not save application. Please try again."
      );
    }
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
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto custom-scrollbar rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-black/50"
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">
                  {isEditMode ? "Edit Application" : "Add Application"}
                </h2>
                <p className="text-sm text-slate-400">
                  {isEditMode
                    ? "Update this opportunity, notes, dates, and follow-ups."
                    : "Add a new opportunity with dates, links, notes, and follow-ups."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeApplicationModal}
                disabled={isSavingApplication}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {formError}
              </div>
            )}

            <div className="space-y-6">
              <section>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-blue-300">
                  Basic Details
                </p>

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

                  <Select
                    label="Platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    options={[
                      ["other", "Other"],
                      ["linkedin", "LinkedIn"],
                      ["wellfound", "WellFound"],
                      ["internshala", "Internshala"],
                      ["unstop", "Unstop"],
                      ["company_website", "Company Website"],
                      ["referral", "Referral"],
                      ["cold_email", "Cold Email"],
                    ]}
                  />

                  <Select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={[
                      ["wishlist", "Wishlist"],
                      ["applied", "Applied"],
                      ["online_assessment", "Online Assessment"],
                      ["interview", "Interview"],
                      ["offer", "Offer"],
                      ["rejected", "Rejected"],
                      ["ghosted", "Ghosted"],
                      ["closed", "Closed"],
                    ]}
                  />

                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Remote, Bangalore..."
                  />

                  <Input
                    label="Salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="₹50k/month, $100k..."
                  />
                </div>
              </section>

              <section>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-blue-300">
                  Timeline
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Input
                    label="Applied Date"
                    type="date"
                    name="appliedDate"
                    value={formData.appliedDate}
                    onChange={handleChange}
                  />

                  <Input
                    label="Deadline"
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                  />

                  <Input
                    label="Next Follow-up"
                    type="date"
                    name="nextFollowUp"
                    value={formData.nextFollowUp}
                    onChange={handleChange}
                  />
                </div>
              </section>

              <section>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-blue-300">
                  Extra Information
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Application Link"
                    type="url"
                    name="applicationLink"
                    value={formData.applicationLink}
                    onChange={handleChange}
                    placeholder="https://..."
                  />

                  <Input
                    label="Resume Version"
                    name="resumeVersion"
                    value={formData.resumeVersion}
                    onChange={handleChange}
                    placeholder="SDE Resume v1"
                  />
                </div>

                <label className="mt-4 block space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                    Notes
                  </span>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Referral info, recruiter name, next steps..."
                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-400"
                  />
                </label>
              </section>
            </div>

            <button
              type="submit"
              disabled={isSavingApplication}
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-mono font-bold text-white transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSavingApplication
                ? isEditMode
                  ? "Updating..."
                  : "Saving..."
                : isEditMode
                  ? "Update Application"
                  : "Save Application"}
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

function Select({ label, options, ...props }) {
  return (
    <label className="space-y-2">
      <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
        {label}
      </span>

      <select
        {...props}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-400"
      >
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default AddApplicationModal;
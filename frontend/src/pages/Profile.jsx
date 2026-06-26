import { Mail, MapPin, Pencil, Save, Target, UserRound } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAppData } from "../context/AppDataContext";

function ProfilePage() {
  const { profile, updateProfile, applications } = useAppData();
  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const initials = profile.name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const activeApplications = applications.filter(
    (application) =>
      application.status === "applied" || application.status === "interview"
  ).length;

  const offers = applications.filter(
    (application) => application.status === "offer"
  ).length;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  }

  function handleCancel() {
    setFormData(profile);
    setIsEditing(false);
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-blue-300">
            Profile
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-100">
            Your Job Search Profile
          </h2>

          <p className="mt-2 text-slate-300">
            Manage the personal details used across your tracker.
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-mono font-bold text-white transition hover:bg-blue-500 active:scale-[0.98]"
          >
            <Pencil size={18} />
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="rounded-lg border border-slate-600 bg-slate-800 px-5 py-3 font-mono font-bold text-slate-100 transition hover:bg-slate-700"
          >
            Cancel
          </button>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-black/20">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border border-blue-400 bg-slate-800 text-4xl font-bold text-blue-200 shadow-xl shadow-blue-950/40">
                {initials}
              </div>

              <h3 className="mt-5 text-2xl font-bold text-slate-100">
                {profile.name}
              </h3>

              <p className="mt-1 text-slate-400">{profile.headline}</p>

              <div className="mt-6 w-full space-y-3 text-left">
                <ProfileInfo icon={Mail} label={profile.email} />
                <ProfileInfo icon={MapPin} label={profile.location} />
                <ProfileInfo icon={Target} label={profile.targetRole} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MiniStat label="Total" value={applications.length} />
            <MiniStat label="Active" value={activeApplications} />
            <MiniStat label="Offers" value={offers} />
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-black/20"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-600 p-3 text-white">
              <UserRound size={22} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-100">
                Profile Details
              </h3>
              <p className="text-sm text-slate-400">
                These details are currently stored locally for the mock frontend.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              label="Headline"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              label="Target Role"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              label="Preferred Platforms"
              name="preferredPlatforms"
              value={formData.preferredPlatforms}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <label className="mt-5 block space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Bio
            </span>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows={5}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </label>

          {isEditing && (
            <button
              type="submit"
              className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-mono font-bold text-white transition hover:bg-blue-500 active:scale-[0.98]"
            >
              <Save size={18} />
              Save Changes
            </button>
          )}
        </form>
      </section>
    </motion.div>
  );
}

function ProfileInfo({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300">
      <Icon size={16} className="text-blue-300" />
      <span>{label}</span>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-center">
      <p className="text-2xl font-bold text-slate-100">{value}</p>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-500">
        {label}
      </p>
    </div>
  );
}

function Input({ label, disabled, ...props }) {
  return (
    <label className="space-y-2">
      <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
        {label}
      </span>

      <input
        {...props}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
      />
    </label>
  );
}

export default ProfilePage;
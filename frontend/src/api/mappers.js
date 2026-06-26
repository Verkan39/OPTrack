function normalizeStatus(status) {
  const statusMap = {
    saved: "wishlist",
    wishlist: "wishlist",
    applied: "applied",
    online_assessment: "interview",
    interview: "interview",
    offer: "offer",
    rejected: "rejected",
    ghosted: "rejected",
    closed: "rejected",
  };

  return statusMap[status] || "wishlist";
}

export function mapApplicationFromApi(application) {
  return {
    id: application.id,
    company: application.company || application.company_name || "Unknown Company",
    role: application.role || "Unknown Role",
    platform: application.platform || "other",
    status: normalizeStatus(application.status),
    rawStatus: application.status,
    location: application.location || "Not added",
    salary: application.salary || "Not added",
    applicationLink:
      application.application_link || application.job_url || "",
    resumeVersion: application.resume_version || "",
    notes: application.notes || "",
    appliedDate: application.applied_date || "",
    deadline: application.deadline || "",
    nextFollowUp: application.next_follow_up || "",
    lastUpdated: application.updated_at
      ? new Date(application.updated_at).toLocaleDateString()
      : "Recently",
  };
}

export function mapProfileFromApi(profile) {
  return {
    name: profile.name || profile.username || "User",
    headline: profile.headline || "Job Seeker Pro",
    email: profile.email || "",
    location: profile.location || "",
    targetRole: profile.target_role || "",
    preferredPlatforms: profile.preferred_platforms || "",
    bio: profile.bio || "",
  };
}

export function mapApplicationToApi(application) {
  const payload = {
    company: application.company,
    role: application.role,
    platform: application.platform || "other",
    status: application.status || "wishlist",
    location: application.location || "",
    salary: application.salary || "",
  };

  if (application.applicationLink) {
    payload.application_link = application.applicationLink;
  }

  if (application.resumeVersion) {
    payload.resume_version = application.resumeVersion;
  }

  if (application.notes) {
    payload.notes = application.notes;
  }

  if (application.appliedDate) {
    payload.applied_date = application.appliedDate;
  }

  if (application.deadline) {
    payload.deadline = application.deadline;
  }

  if (application.nextFollowUp) {
    payload.next_follow_up = application.nextFollowUp;
  }

  return payload;
}
import { apiFetch } from "./client";
import { mapProfileFromApi } from "./mappers";

function mapProfileToApi(profile) {
  return {
    name: profile.name,
    headline: profile.headline,
    email: profile.email,
    location: profile.location,
    target_role: profile.targetRole,
    preferred_platforms: profile.preferredPlatforms,
    bio: profile.bio,
  };
}

export async function getProfile() {
  const profile = await apiFetch("/api/profile/");
  return mapProfileFromApi(profile);
}

export async function updateProfileApi(profileData) {
  const updatedProfile = await apiFetch("/api/profile/", {
    method: "PATCH",
    body: JSON.stringify(mapProfileToApi(profileData)),
  });

  return mapProfileFromApi(updatedProfile);
}
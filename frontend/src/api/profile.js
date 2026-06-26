import { apiFetch } from "./client";
import { mapProfileFromApi } from "./mappers";

export async function getProfile() {
  const profile = await apiFetch("/api/profile/");
  return mapProfileFromApi(profile);
}
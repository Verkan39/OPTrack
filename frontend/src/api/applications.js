import { apiFetch } from "./client";
import { mapApplicationFromApi } from "./mappers";

export async function getApplications() {
  const response = await apiFetch("/api/applications/");

  const applications = Array.isArray(response)
    ? response
    : response.results || [];

  return applications.map(mapApplicationFromApi);
}
import { apiFetch } from "./client";
import { mapApplicationFromApi, mapApplicationToApi } from "./mappers";

export async function getApplications() {
  const response = await apiFetch("/api/applications/");

  const applications = Array.isArray(response)
    ? response
    : response.results || [];

  return applications.map(mapApplicationFromApi);
}

export async function createApplication(applicationData) {
  const createdApplication = await apiFetch("/api/applications/", {
    method: "POST",
    body: JSON.stringify(mapApplicationToApi(applicationData)),
  });

  return mapApplicationFromApi(createdApplication);
}

export async function updateApplication(id, applicationData) {
  const updatedApplication = await apiFetch(`/api/applications/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(mapApplicationToApi(applicationData)),
  });

  return mapApplicationFromApi(updatedApplication);
}

export async function updateApplicationStatusApi(id, status) {
  const updatedApplication = await apiFetch(`/api/applications/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  return mapApplicationFromApi(updatedApplication);
}
import { apiFetch } from "./client";

export function getApplications() {
  return apiFetch("/api/applications/");
}
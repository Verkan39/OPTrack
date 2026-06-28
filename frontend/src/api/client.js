const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

let csrfToken = null;

function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

async function ensureCsrfToken() {
  if (csrfToken) {
    return csrfToken;
  }

  const response = await fetch(apiUrl("/api/auth/csrf/"), {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Could not set CSRF token");
  }

  const data = await response.json();
  csrfToken = data.csrfToken;

  return csrfToken;
}

export async function apiFetch(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const isUnsafeMethod = !["GET", "HEAD", "OPTIONS"].includes(method);

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (isUnsafeMethod) {
    headers["X-CSRFToken"] = await ensureCsrfToken();
  }

  const response = await fetch(apiUrl(path), {
    ...options,
    method,
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
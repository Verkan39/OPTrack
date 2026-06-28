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

export async function getCurrentUser() {
  const response = await fetch(apiUrl("/api/auth/me/"), {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }

  const data = await response.json();
  return data.user;
}

export async function loginUser({ username, password }) {
  const token = await ensureCsrfToken();

  const response = await fetch(apiUrl("/api/auth/login/"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data.user;
}

export async function signupUser({ username, email, password }) {
  const token = await ensureCsrfToken();

  const response = await fetch(apiUrl("/api/auth/signup/"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Signup failed");
  }

  return data.user;
}

export async function logoutUser() {
  const token = await ensureCsrfToken();

  const response = await fetch(apiUrl("/api/auth/logout/"), {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRFToken": token,
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  csrfToken = null;
}
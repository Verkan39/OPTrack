function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split("; ") : [];

  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");

    if (key === name) {
      return decodeURIComponent(value);
    }
  }

  return null;
}

async function ensureCsrfCookie() {
  const response = await fetch("/api/auth/csrf/", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Could not set CSRF cookie");
  }
}

export async function getCurrentUser() {
  const response = await fetch("/api/auth/me/", {
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
  await ensureCsrfCookie();

  const response = await fetch("/api/auth/login/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
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
  await ensureCsrfCookie();

  const response = await fetch("/api/auth/signup/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
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
  await ensureCsrfCookie();

  const response = await fetch("/api/auth/logout/", {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}
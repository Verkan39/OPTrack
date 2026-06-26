function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

async function ensureCsrfCookie() {
  if (getCookie("csrftoken")) {
    return;
  }

  const response = await fetch("/api/csrf/", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Could not set CSRF cookie");
  }
}

export async function apiFetch(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const isUnsafeMethod = !["GET", "HEAD", "OPTIONS"].includes(method);

  if (isUnsafeMethod) {
    await ensureCsrfCookie();
  }

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (isUnsafeMethod) {
    headers["X-CSRFToken"] = getCookie("csrftoken") || "";
  }

  const response = await fetch(path, {
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
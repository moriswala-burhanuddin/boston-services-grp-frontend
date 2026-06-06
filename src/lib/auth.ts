export function getToken() {
  return localStorage.getItem('access_token');
}

export function setToken(access: string, refresh: string) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

export function removeToken() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = {
    ...options.headers,
  } as Record<string, string>;

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`http://localhost:8000${url}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    // Basic unauthorized handling: clear token and throw so UI can redirect
    removeToken();
    throw new Error('Unauthorized');
  }

  return res;
}

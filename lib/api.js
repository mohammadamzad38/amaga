const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "https://apiprod.itagama.com";

async function handleResponse(res) {
  const body = await res.json();

  if (!res.ok) {
    const message = body?.error || `Request Faild(${res.status})`;
    return { data: null, error: message };
  }
  return { data: body, error: null };
}

export async function signIn({ email, password }) {
  const base = getApiUrl();
  const res = await fetch(`${base}/auth/oauth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();
  return json;
}

export async function signUp({
  email,
  company_name,
  password,
  last_name,
  first_name,
}) {
  const base = getApiUrl();
  const payload = {
    email,
    company_name,
    password,
    last_name,
    first_name,
    role_id: "3",
  };

  const res = await fetch(`${base}/auth/oauth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export { getApiUrl };

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

// SIGNIN APi >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

// SignUP API >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

// User profile Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function updateUser(id, payload) {
  const base = getApiUrl();

  const token = localStorage.getItem("token");

  const res = await fetch(`${base}/auth/user/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return res.ok ? { error: false, data } : { error: true, data };
}

// Supplier info >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function supplierInfo({ entity_type, user_id } = {}) {
  const base = getApiUrl();

  const payload = {
    entity_type,
    user_id,
  };

  try {
    const res = await fetch(`${base}/auth/register-supplier/supplier-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      // console.error("API Error:", data);
      return { error: true, data };
    }

    // console.log("check what res api", data);

    return { error: false, data };
  } catch (err) {
    // console.error("Network Error:", err);
    return { error: true, message: err.message };
  }
}

// Post API  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function allPost({
  type = "fiber",
  search = "",
  filter = "",
  expand = "",
  orderby = "id desc",
  top = "",
  skip = 0,
}) {
  const base = getApiUrl();

  const params = new URLSearchParams();

  if (search) params.append("$search", search);
  if (filter) params.append("$filter", filter);
  if (expand) params.append("$expand", expand);

  params.append("$orderby", orderby);
  params.append("$top", top);
  params.append("$skip", skip);

  try {
    const res = await fetch(`${base}/trade/${type}?${params.toString()}`, {
      cache: "no-store",
    });

    const data = await res.json();

    return res.ok ? { error: false, data } : { error: true, data };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
}

export { getApiUrl };

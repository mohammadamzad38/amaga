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

export async function allPost(query = {}) {
  const {
    type,
    select,
    search,
    filter,
    expand,
    orderby,
    top,
    skip,
    signal,
    tagId,
  } = query;

  if (!type) {
    throw new Error("allPost(): 'type' is required.");
  }

  const params = new URLSearchParams();

  if (select) params.append("$select", select);

  if (search) params.append("$search", search);

  if (filter) params.append("$filter", filter);

  if (expand) params.append("$expand", expand);

  if (orderby) params.append("$orderby", orderby);

  if (top !== undefined) {
    params.append("$top", top);
  }

  if (skip !== undefined) {
    params.append("$skip", skip);
  }

  if (tagId !== undefined) {
    params.append("tagId", tagId);
  }

  try {
    const res = await fetch(
      `${getApiUrl()}/trade/${type}?${params.toString()}`,
      {
        cache: "no-store",
        signal, // NEW
      },
    );

    const data = await res.json();

    return {
      error: !res.ok,
      status: res.status,
      data,
    };
  } catch (error) {
    // Abort হলে error দেখাবে না
    if (error.name === "AbortError") {
      return {
        error: true,
        aborted: true,
      };
    }

    return {
      error: true,
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
}

export { getApiUrl };

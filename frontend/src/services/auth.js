import api from "./api";

export async function login(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem("deshmukh_admin_token", data.token);
  return data;
}

export function logout() {
  localStorage.removeItem("deshmukh_admin_token");
}

export function loggedIn() {
  return Boolean(localStorage.getItem("deshmukh_admin_token"));
}

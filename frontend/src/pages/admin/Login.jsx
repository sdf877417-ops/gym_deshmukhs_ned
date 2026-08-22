import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.js";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email,password);
      nav("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return <div className="login-page">
    <form className="login-card" onSubmit={submit}>
      <Link to="/">← Back to website</Link>
      <div className="eyebrow">PRIVATE ADMIN</div>
      <h1>Admin Login</h1>
      <p className="muted">Manage members and collections.</p>
      <label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label>
      <label>Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label>
      {error && <div className="error">{error}</div>}
      <button className="btn primary">Login</button>
    </form>
  </div>;
}

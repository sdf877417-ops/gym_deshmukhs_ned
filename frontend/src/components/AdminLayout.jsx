import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus, Receipt, Clock, LogOut, Dumbbell } from "lucide-react";
import { logout } from "../services/auth.js";

export default function AdminLayout({ children }) {
  const nav = useNavigate();
  const links = [
    ["/admin/dashboard","Dashboard",LayoutDashboard],
    ["/admin/members","Members",Users],
    ["/admin/add-member","Add Member",UserPlus],
    ["/admin/fees","Fees",Receipt],
    ["/admin/expiring","Expiring",Clock]
  ];

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="admin-logo"><Dumbbell/><b>DESHMUKH<small>GYM ADMIN</small></b></div>
        {links.map(([to,label,Icon]) =>
          <NavLink key={to} to={to}><Icon size={18}/>{label}</NavLink>
        )}
        <button className="logout" onClick={() => { logout(); nav("/admin/login"); }}>
          <LogOut size={18}/> Logout
        </button>
      </aside>
      <div className="admin-main">
        <header className="admin-top">Deshmukh Gym & Cardio <span>Admin</span></header>
        <main>{children}</main>
      </div>
    </div>
  );
}

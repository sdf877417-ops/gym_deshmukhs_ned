import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Clock, AlertTriangle, IndianRupee, UserPlus } from "lucide-react";
import api from "../../services/api.js";

function dayDiff(value) {
  const a = new Date(); a.setHours(0,0,0,0);
  const b = new Date(value); b.setHours(0,0,0,0);
  return Math.ceil((b-a)/86400000);
}

export default function Dashboard() {
  const [members,setMembers] = useState([]);
  const [payments,setPayments] = useState([]);

  useEffect(() => {
    Promise.all([api.get("/members"),api.get("/payments")])
      .then(([m,p]) => {setMembers(m.data);setPayments(p.data);});
  },[]);

  const active = members.filter(m=>m.status==="ACTIVE").length;
  const expiring = members.filter(m=>m.status==="EXPIRING_SOON").sort((a,b)=>dayDiff(a.endDate)-dayDiff(b.endDate));
  const expired = members.filter(m=>m.status==="EXPIRED").length;
  const today = new Date().toISOString().slice(0,10);
  const month = today.slice(0,7);
  const todayTotal = payments.filter(p=>p.paymentDate.slice(0,10)===today).reduce((s,p)=>s+p.amount,0);
  const monthTotal = payments.filter(p=>p.paymentDate.slice(0,7)===month).reduce((s,p)=>s+p.amount,0);

  return <>
    <div className="admin-head"><div><div className="eyebrow">OVERVIEW</div><h1>Dashboard</h1><p className="muted">Your gym business snapshot.</p></div><Link className="btn primary" to="/admin/add-member"><UserPlus size={17}/> Add Member</Link></div>
    <div className="stats">
      <Stat Icon={Users} label="Active" value={active}/>
      <Stat Icon={Clock} label="Expiring Soon" value={expiring.length}/>
      <Stat Icon={AlertTriangle} label="Expired" value={expired}/>
      <Stat Icon={IndianRupee} label="This Month" value={`₹${monthTotal.toLocaleString("en-IN")}`}/>
    </div>

    <section className="panel">
      <h2>Ending Soon</h2>
      {expiring.length ? expiring.slice(0,10).map(m =>
        <div className="line" key={m._id}>
          <div><b>{m.name}</b><small>{m.section} · {m.mobile}</small></div>
          <div><b>{dayDiff(m.endDate)} days</b><small>{new Date(m.endDate).toLocaleDateString("en-IN")}</small></div>
          <Link to={`/admin/members/${m._id}`}>Open</Link>
        </div>
      ) : <p className="muted">No memberships ending within 7 days.</p>}
    </section>

    <section className="panel">
      <h2>Today's Collection</h2>
      <div className="big">₹{todayTotal.toLocaleString("en-IN")}</div>
      <p className="muted">This month: ₹{monthTotal.toLocaleString("en-IN")}</p>
    </section>
  </>;
}

function Stat({Icon,label,value}) {
  return <div className="stat"><Icon/><span>{label}</span><b>{value}</b></div>;
}

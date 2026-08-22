import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Phone, MessageCircle, RefreshCw } from "lucide-react";
import api from "../../services/api.js";
import { addMonths, todayInput } from "../../utils/date.js";

export default function MemberDetails() {
  const {id}=useParams(); const nav=useNavigate();
  const [data,setData]=useState(null); const [renew,setRenew]=useState(false);
  const [form,setForm]=useState({durationMonths:1,startDate:todayInput(),fee:0,paidAmount:0,paymentMethod:"Cash"});

  const load=()=>api.get(`/members/${id}`).then(r=>{setData(r.data);setForm(x=>({...x,fee:r.data.member.fee,paidAmount:r.data.member.fee}))});
  useEffect(()=>{load()},[id]);

  if(!data)return <p className="muted">Loading...</p>;
  const m=data.member;

  async function archive() {
    if(!window.confirm("Remove this member?"))return;
    await api.delete(`/members/${id}`); nav("/admin/members");
  }

  async function saveRenewal() {
    await api.post(`/members/${id}/renew`,form); setRenew(false); load();
  }

  return <>
    <div className="admin-head">
      <div><div className="eyebrow">{m.section}</div><h1>{m.name}</h1><p className="muted">{m.mobile}</p></div>
      <span className={`badge ${m.status.toLowerCase()}`}>{m.status.replace("_"," ")}</span>
    </div>
    <section className="panel">
      <div className="member-info">
        <span>Plan<b>{m.planName}</b></span><span>Start<b>{new Date(m.startDate).toLocaleDateString("en-IN")}</b></span>
        <span>End<b>{new Date(m.endDate).toLocaleDateString("en-IN")}</b></span><span>Days Left<b>{m.daysLeft}</b></span>
        <span>Fee<b>₹{m.fee}</b></span><span>Paid<b>₹{m.paidAmount}</b></span>
      </div>
      <div className="actions">
        <a className="btn outline" href={`tel:${m.mobile}`}><Phone size={15}/> Call</a>
        <a className="btn outline" target="_blank" href={`https://wa.me/91${m.mobile}`}><MessageCircle size={15}/> WhatsApp</a>
        <button className="btn primary" onClick={()=>setRenew(true)}><RefreshCw size={15}/> Renew</button>
        <button className="btn danger" onClick={archive}>Remove Member</button>
      </div>
    </section>

    <section className="panel"><h2>Payment History</h2>
      {data.payments.map(p=><div className="line" key={p._id}><div><b>{p.paymentMethod}</b><small>{new Date(p.paymentDate).toLocaleString("en-IN")}</small></div><b>₹{p.amount}</b></div>)}
      {!data.payments.length&&<p className="muted">No payments recorded.</p>}
    </section>

    {renew && <div className="modal"><div className="modal-card">
      <h2>Renew Membership</h2>
      <label>Duration<select value={form.durationMonths} onChange={e=>setForm({...form,durationMonths:Number(e.target.value)})}><option value="1">1 Month</option><option value="3">3 Months</option><option value="4">4 Months</option></select></label>
      <label>Start<input type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/></label>
      <label>Fee<input type="number" value={form.fee} onChange={e=>setForm({...form,fee:e.target.value})}/></label>
      <label>Paid<input type="number" value={form.paidAmount} onChange={e=>setForm({...form,paidAmount:e.target.value})}/></label>
      <p className="muted">New end date: {new Date(addMonths(form.startDate,form.durationMonths)).toLocaleDateString("en-IN")}</p>
      <div className="actions"><button className="btn outline" onClick={()=>setRenew(false)}>Cancel</button><button className="btn primary" onClick={saveRenewal}>Save Renewal</button></div>
    </div></div>}
  </>;
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { addMonths, todayInput } from "../../utils/date.js";

const prices = {
  "Non-AC": {1:600,3:1400},
  "AC": {1:700,3:1800},
  "Cardio": {1:0,3:0}
};

export default function AddMember() {
  const nav=useNavigate();
  const today=todayInput();
  const [f,setF]=useState({
    name:"",mobile:"",section:"Non-AC",planName:"1 Month",
    durationMonths:1,startDate:today,endDate:addMonths(today,1),
    fee:600,paidAmount:600,paymentMethod:"Cash",notes:""
  });

  const update=(k,v)=>setF(x=>({...x,[k]:v}));

  function selectSection(section) {
    const fee=prices[section][1];
    setF(x=>({...x,section,planName:"1 Month",durationMonths:1,fee,endDate:addMonths(x.startDate,1)}));
  }

  function selectDuration(duration) {
    const n=Number(duration);
    const fee=prices[f.section][n] ?? 0;
    setF(x=>({...x,durationMonths:n,planName:n===0?"Custom":`${n} Month${n>1?"s":""}`,fee,endDate:n?addMonths(x.startDate,n):x.endDate}));
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/members",{...f,durationMonths:Number(f.durationMonths),fee:Number(f.fee),paidAmount:Number(f.paidAmount)});
      nav("/admin/members");
    } catch(err) {
      alert(err.response?.data?.message || "Could not save member");
    }
  }

  return <>
    <div className="admin-head"><div><div className="eyebrow">MEMBERS</div><h1>Add Member</h1></div></div>
    <form className="form-card" onSubmit={submit}>
      <label>Name<input required value={f.name} onChange={e=>update("name",e.target.value)}/></label>
      <label>Mobile<input required value={f.mobile} onChange={e=>update("mobile",e.target.value.replace(/\D/g,"").slice(0,10))}/></label>
      <div><span className="field-title">Section</span><div className="choices">{["Non-AC","AC","Cardio"].map(s=><button type="button" key={s} className={f.section===s?"selected":""} onClick={()=>selectSection(s)}>{s}</button>)}</div></div>
      <label>Duration<select value={f.durationMonths} onChange={e=>selectDuration(e.target.value)}><option value="1">1 Month</option><option value="3">3 Months</option><option value="4">4 Months</option><option value="0">Custom</option></select></label>
      <div className="form-grid">
        <label>Start Date<input type="date" value={f.startDate} onChange={e=>{update("startDate",e.target.value);if(Number(f.durationMonths))update("endDate",addMonths(e.target.value,f.durationMonths))}}/></label>
        <label>End Date<input type="date" value={f.endDate} onChange={e=>update("endDate",e.target.value)}/></label>
        <label>Fee<input type="number" min="0" value={f.fee} onChange={e=>update("fee",e.target.value)}/></label>
        <label>Paid<input type="number" min="0" value={f.paidAmount} onChange={e=>update("paidAmount",e.target.value)}/></label>
      </div>
      <label>Payment Method<select value={f.paymentMethod} onChange={e=>update("paymentMethod",e.target.value)}><option>Cash</option><option>UPI</option><option>Card</option><option>Bank Transfer</option></select></label>
      <label>Notes<textarea rows="3" value={f.notes} onChange={e=>update("notes",e.target.value)}/></label>
      <button className="btn primary">Save Member</button>
    </form>
  </>;
}

import React,{useEffect,useState}from"react";
import api from"../../services/api.js";


export default function Fees(){
 const[p,setP]=useState([]);
 useEffect(()=>{api.get("/payments").then(r=>setP(r.data))},[]);
 const today=new Date().toISOString().slice(0,10),month=today.slice(0,7);
 const t=p.filter(x=>x.paymentDate.slice(0,10)===today).reduce((s,x)=>s+x.amount,0);
 const m=p.filter(x=>x.paymentDate.slice(0,7)===month).reduce((s,x)=>s+x.amount,0);
 return <><div className="admin-head"><div><div className="eyebrow">BUSINESS REGISTER</div><h1>Fees & Collection</h1></div></div>
 <div className="stats"><div className="stat"><span>Today</span><b>₹{t}</b></div><div className="stat"><span>This Month</span><b>₹{m}</b></div></div>
 <section className="panel"><h2>Payments</h2>{p.map(x=><div className="line" key={x._id}><div><b>{x.memberName}</b><small>{x.section} · {x.paymentMethod}</small></div><b>₹{x.amount}</b></div>)}</section></>;
}

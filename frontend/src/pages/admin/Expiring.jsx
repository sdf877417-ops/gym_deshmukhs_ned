import React,{useEffect,useState}from"react";
import {Link}from"react-router-dom";
import api from"../../services/api.js";
export default function Expiring(){
 const[m,setM]=useState([]);
 useEffect(()=>{api.get("/members").then(r=>setM(r.data.filter(x=>x.status!=="ACTIVE")))},[]);
 return <><div className="admin-head"><div><div className="eyebrow">ATTENTION</div><h1>Expiring Members</h1></div></div>
 <div className="cards">{m.map(x=><article className="member-card" key={x._id}><div className="row"><div><h3>{x.name}</h3><span>{x.mobile}</span></div><span className={`badge ${x.status.toLowerCase()}`}>{x.status.replace("_"," ")}</span></div><p className="muted">Ends: {new Date(x.endDate).toLocaleDateString("en-IN")} · {x.daysLeft} days</p><Link className="btn primary" to={`/admin/members/${x._id}`}>Open Member</Link></article>)}</div>
 {!m.length&&<p className="muted">No expiring or expired members.</p>}</>;
}

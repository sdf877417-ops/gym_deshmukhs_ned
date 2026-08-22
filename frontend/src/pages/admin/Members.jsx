import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, UserPlus, Phone } from "lucide-react";
import api from "../../services/api.js";

export default function Members() {
  const [members,setMembers] = useState([]);
  const [search,setSearch] = useState("");
  const [section,setSection] = useState("");

  useEffect(() => {
    api.get("/members",{params:{search,section}}).then(r=>setMembers(r.data));
  },[search,section]);

  return <>
    <div className="admin-head"><div><div className="eyebrow">MEMBERS</div><h1>Members</h1></div><Link className="btn primary" to="/admin/add-member"><UserPlus size={17}/> Add Member</Link></div>
    <div className="toolbar">
      <div className="search"><Search size={17}/><input placeholder="Search name or mobile" value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <select value={section} onChange={e=>setSection(e.target.value)}><option value="">All Sections</option><option>AC</option><option>Non-AC</option><option>Cardio</option></select>
    </div>
    <div className="cards">
      {members.map(m => <article className="member-card" key={m._id}>
        <div className="row"><div><h3>{m.name}</h3><span>{m.mobile}</span></div><Badge value={m.status}/></div>
        <div className="member-info">
          <span>Section<b>{m.section}</b></span><span>Plan<b>{m.planName}</b></span>
          <span>End Date<b>{new Date(m.endDate).toLocaleDateString("en-IN")}</b></span><span>Fee<b>₹{m.fee}</b></span>
        </div>
        <div className="actions"><Link className="btn outline" to={`/admin/members/${m._id}`}>View</Link><a className="btn outline" href={`tel:${m.mobile}`}><Phone size={15}/>Call</a></div>
      </article>)}
    </div>
    {!members.length && <p className="muted">No members found.</p>}
  </>;
}

function Badge({value}) {
  return <span className={`badge ${value.toLowerCase()}`}>{value.replace("_"," ")}</span>;
}

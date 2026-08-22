import React, { useState } from "react";
import { Menu, X, Dumbbell } from "lucide-react";
import { gym } from "../data.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <a href="#home" className="brand">
        <span className="logo"><Dumbbell size={18}/></span>
        <span><b>DESHMUKH</b><small>GYM & CARDIO</small></span>
      </a>
      <nav className={open ? "nav open" : "nav"}>
        {["about","facilities","plans","gallery","location","contact"].map(x =>
          <a key={x} href={`#${x}`} onClick={() => setOpen(false)}>
            {x[0].toUpperCase()+x.slice(1)}
          </a>
        )}
        <a className="btn primary" href={`tel:${gym.phone}`}>Call to Join</a>
      </nav>
      <button className="menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </header>
  );
}

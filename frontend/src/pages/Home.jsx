import React from "react";
import Navbar from "../components/Navbar.jsx";
import { gym, plans } from "../data.js";

export default function Home() {
  return <>
    <Navbar/>
    <section id="home" className="hero">
      <div className="hero-bg"/>
      <div className="container hero-content">
        <div className="eyebrow">TRAIN • BUILD • TRANSFORM</div>
        <h1>Build your <span>stronger</span> self.</h1>
        <p>A simple, affordable and focused fitness space in Chetan Nagar, Nanded.</p>
        <div className="actions">
          <a className="btn primary" href="#plans">View Plans</a>
          <a className="btn outline" href={`tel:${gym.phone}`}>📞 Call to Join</a>
        </div>
      </div>
    </section>

    <Section id="about" title="Fitness that fits your goal.">
      <div className="split">
        <div>
          <p className="lead">Deshmukh Gym & Cardio gives local members a straightforward place to train consistently.</p>
          <p className="muted">Strength training, cardio workouts, AC and Non-AC options with simple memberships.</p>
        </div>
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80" alt="Gym"/>
      </div>
    </Section>

    <Section id="facilities" title="Train your way.">
      <div className="cards">
        {["Strength Training","Cardio","Free Weights","AC Section","Non-AC Section","Focused Workout Space"].map(x =>
          <article className="card" key={x}><h3>{x}</h3><p className="muted">Built for practical daily training.</p></article>
        )}
      </div>
    </Section>

    <Section id="plans" title="Simple plans.">
      <div className="plans">
        {plans.map(p =>
          <article className="price" key={`${p.section}-${p.duration}`}>
            <span className="eyebrow">{p.section}</span>
            <h3>{p.label}</h3>
            <strong>₹{p.price}</strong>
            <p className="muted">Membership</p>
            <a className="btn primary" href={`tel:${gym.phone}`}>Join Now</a>
          </article>
        )}
      </div>
    </Section>

    <Section id="gallery" title="Train in your element.">
      <div className="gallery">
        {[
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80"
        ].map((src,i)=><img src={src} alt="Fitness training" key={i}/>)}
      </div>
    </Section>

    <Section id="location" title="Find us.">
      <div className="map">
        <iframe title="Deshmukh Gym location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(gym.address)}&output=embed`}/>
      </div>
      <p className="muted">{gym.address}</p>
    </Section>

    <Section id="contact" title="Ready to start training?">
      <a className="btn primary" href={`tel:${gym.phone}`}>Call Gym</a>
    </Section>

    <footer className="footer">© 2026 Deshmukh Gym & Cardio · <a href="/admin/login">Admin Login</a></footer>
    <a className="mobile-call" href={`tel:${gym.phone}`}>📞 Call Gym</a>
  </>;
}

function Section({ id, title, children }) {
  return <section id={id} className="section">
    <div className="container">
      <div className="eyebrow">DESHMUKH GYM</div>
      <h2>{title}</h2>
      {children}
    </div>
  </section>;
}

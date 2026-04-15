import React from 'react';
import { benefits, customHeroImage } from '../data';

export default function Hero() {
  const heroImage =
    customHeroImage ||
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80";

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">A Necessity, Not a Luxury</p>
          <h1>Specialty Coffee Crafted for Daily Life.</h1>
          <p className="sub">
            Premium drinks, smart pricing, and seamless ordering in one modern
            coffee experience inspired by ZUS Coffee.
          </p>
          <ul className="benefit-list">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <div className="hero-cta">
            <a className="btn btn-light" href="#app">Download App</a>
            <a className="btn btn-outline" href="#menu">View Menu</a>
          </div>
        </div>

        <div className="hero-card">
          <img src={heroImage} alt="Signature iced coffee" />
          <div className="floating-pill">From $2.90 • Freshly Brewed</div>
        </div>
      </div>
    </section>
  );
}

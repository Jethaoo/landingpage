import React from 'react';
import logoImage from '../assets/logo-clean.png';

export default function Header() {
  return (
    <header className="site-header" aria-label="Top Navigation">
      <div className="container nav-wrap">
        <a className="logo" style={{ display: 'flex', alignItems: 'center' }} href="#top" aria-label="ZUS Coffee home">
          <img src={logoImage} alt="ZUS Coffee Logo" style={{ height: '140px', margin: '-35px -10px' }} />
        </a>
        <nav>
          <a href="#menu">Menu</a>
          <a href="#promo">Promotions</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="btn btn-dark" href="#menu">
          Order now
        </a>
      </div>
    </header>
  );
}

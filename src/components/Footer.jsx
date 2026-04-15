import React from 'react';

export default function Footer() {
  return (
    <footer className="site-header site-footer" style={{ borderTop: '1px solid var(--line)', padding: '1.2rem 0 1.8rem', position: 'relative' }}>
      <div className="container footer-wrap">
        <p>© 2026 ZUS-style concept page. Built for educational cloning practice.</p>
        <div>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">TikTok</a>
        </div>
      </div>
    </footer>
  );
}

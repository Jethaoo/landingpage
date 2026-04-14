const customHeroImage = "";

const products = [
  {
    name: "Spanish Latte",
    description: "Silky milk, double espresso, caramel finish.",
    price: "$3.40",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80",
    tag: "Best Seller",
  },
  {
    name: "CEO Latte",
    description: "Strong, smooth body with a nutty aroma.",
    price: "$3.60",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",
    tag: "Signature",
  },
  {
    name: "Matcha Latte",
    description: "Creamy matcha with balanced sweetness.",
    price: "$3.80",
    image:
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=700&q=80",
    tag: "Trending",
  },
  {
    name: "Yuzu Cold Brew",
    description: "Citrus-forward cold brew for hot afternoons.",
    price: "$4.10",
    image:
      "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=700&q=80",
    tag: "New",
  },
];

const benefits = [
  "Order-ahead and skip queue",
  "Member-only pricing and rewards",
  "Nationwide delivery coverage",
];

const testimonials = [
  {
    quote:
      "Great consistency and quality. The app makes reordering super fast during office hours.",
    author: "Aina, KL",
  },
  {
    quote:
      "The Spanish Latte and pastries are my weekly go-to. Delivery is surprisingly quick.",
    author: "Jason, PJ",
  },
  {
    quote:
      "Clean UI, nice rewards program, and drinks that taste premium without premium pricing.",
    author: "Nadia, Johor",
  },
];

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="product-body">
        <span className="badge">{product.tag}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span className="price">{product.price}</span>
      </div>
    </article>
  );
}

function App() {
  const heroImage =
    customHeroImage ||
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80";

  return (
    <>
      <header className="site-header" aria-label="Top Navigation">
        <div className="container nav-wrap">
          <a className="logo" href="#top" aria-label="ZUS Coffee home">
            ZUS COFFEE
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

      <main id="top">
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

        <section className="stats container" aria-label="Key metrics">
          <article>
            <h2>400+</h2>
            <p>Stores across Southeast Asia</p>
          </article>
          <article>
            <h2>1M+</h2>
            <p>Monthly app users</p>
          </article>
          <article>
            <h2>4.8★</h2>
            <p>Average app rating</p>
          </article>
        </section>

        <section id="promo" className="promo">
          <div className="container">
            <div className="section-head">
              <h2>Weekly Promotions</h2>
              <p>Fresh campaigns that keep your coffee routine exciting.</p>
            </div>
            <div className="cards">
              <article className="card">
                <h3>Buy 1 Free 1 Tuesday</h3>
                <p>Selected handcrafted drinks every Tuesday, all day long.</p>
              </article>
              <article className="card">
                <h3>Breakfast Combo</h3>
                <p>Any coffee + pastry bundle from 7am to 11am.</p>
              </article>
              <article className="card">
                <h3>Delivery Perks</h3>
                <p>Free delivery above $12 with in-app payment.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="menu" className="menu container">
          <div className="menu-header">
            <h2>Best Sellers</h2>
            <p>
              Edit products in <code>src/App.jsx</code> → <code>products</code> array.
            </p>
          </div>

          <div className="menu-grid">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </section>

        <section id="reviews" className="reviews container">
          <div className="section-head">
            <h2>What Customers Say</h2>
            <p>Trusted by coffee lovers for quality and convenience.</p>
          </div>
          <div className="review-grid">
            {testimonials.map((item) => (
              <blockquote key={item.author}>
                <p>“{item.quote}”</p>
                <cite>{item.author}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="app" className="app-band">
          <div className="container app-wrap">
            <div>
              <h2>Get Rewarded with Every Cup</h2>
              <p>
                Earn points, unlock member pricing, and get personalized offers with
                every order.
              </p>
            </div>
            <a className="btn btn-dark" href="#">Get the App</a>
          </div>
        </section>

        <section id="faq" className="container faq">
          <h2>Quick Customization Guide</h2>
          <details open>
            <summary>How do I set my own hero image?</summary>
            <p>
              Place your file in <code>assets/</code>, then set
              <code> customHeroImage </code> in <code>src/App.jsx</code>.
            </p>
          </details>
          <details>
            <summary>How do I add products?</summary>
            <p>
              Add objects in the <code>products</code> array with
              <code> name</code>, <code>description</code>, <code>price</code>, and
              <code> image</code>.
            </p>
          </details>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>© 2026 ZUS-style concept page. Built for educational cloning practice.</p>
          <div>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;

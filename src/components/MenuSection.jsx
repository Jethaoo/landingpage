import React from 'react';
import { products } from '../data';

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

export default function MenuSection() {
  return (
    <section id="menu" className="menu container">
      <div className="menu-header">
        <h2>Best Sellers</h2>
        <p>
          Edit products in <code>src/data.js</code> → <code>products</code> array.
        </p>
      </div>

      <div className="menu-grid">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}

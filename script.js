const customHeroImage = "";

const products = [
  {
    name: "Spanish Latte",
    description: "Silky milk, double espresso, caramel finish.",
    price: "$3.40",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "CEO Latte",
    description: "Strong, smooth, and clean with nutty aroma.",
    price: "$3.60",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Matcha Latte",
    description: "Creamy matcha with balanced sweetness.",
    price: "$3.80",
    image:
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=700&q=80",
  },
];

function renderHeroImage() {
  const heroImageElement = document.getElementById("hero-image");

  if (heroImageElement && customHeroImage) {
    heroImageElement.src = customHeroImage;
  }
}

function renderProducts() {
  const productGrid = document.getElementById("product-grid");
  if (!productGrid) return;

  productGrid.innerHTML = products
    .map(
      (product) => `
      <article>
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="price">${product.price}</span>
      </article>
    `
    )
    .join("");
}

renderHeroImage();
renderProducts();

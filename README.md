# ZUS Coffee–Inspired Landing Page (React + Vite)

A polished, production-style React landing page inspired by ZUS Coffee visuals.

## Highlights

- Responsive, modern layout with hero, promos, menu cards, testimonials, app CTA, and FAQ.
- Better UX details: hover states, visual hierarchy, badges, lazy-loaded product images.
- Accessibility-minded semantics (`header`, `main`, `section`, `footer`, `details/summary`).
- Easy customization in one place via `customHeroImage` and `products` in `src/App.jsx`.

## Tech Stack

- React 18
- Vite 5
- Plain CSS (`src/styles.css`)

## Project Structure

- `index.html` — Vite entry HTML
- `src/main.jsx` — React bootstrap
- `src/App.jsx` — landing page content + configurable data
- `src/styles.css` — full responsive styling system
- `assets/` — local image folder for your custom images

## Run Locally

```bash
npm install
npm run dev
```

Then open the local URL from the Vite output.

## Build for Production

```bash
npm run build
npm run preview
```

## Customize Hero Image

1. Place your image file in `assets/` (example: `assets/hero.jpg`).
2. In `src/App.jsx`, edit:

```jsx
const customHeroImage = "assets/hero.jpg";
```

If empty, the default fallback image is used.

## Customize Product Cards

Update the `products` array in `src/App.jsx`:

```jsx
const products = [
  {
    name: "Spanish Latte",
    description: "Silky milk, double espresso, caramel finish.",
    price: "$3.40",
    image: "assets/spanish-latte.jpg",
    tag: "Best Seller",
  },
];
```

Required fields: `name`, `description`, `price`, `image`.
Optional field: `tag`.

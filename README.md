# ZUS Coffee–Inspired Landing Page

A simple static landing page clone for practice and quick customization.

## Files

- `index.html` — page structure and sections
- `styles.css` — responsive styling and theme
- `script.js` — hero image + products configuration and rendering
- `assets/` — local images folder (keep your custom images here)

## Quick Start

1. Open the project folder.
2. Open `index.html` directly in your browser (or serve with any static server).

## Customize Hero Image

1. Put your image in `assets/` (example: `assets/hero.jpg`).
2. Edit `script.js`:

```js
const customHeroImage = "assets/hero.jpg";
```

If `customHeroImage` is empty, the default fallback image from HTML is used.

## Customize Products

In `script.js`, edit the `products` array:

```js
const products = [
  {
    name: "Spanish Latte",
    description: "Silky milk, double espresso, caramel finish.",
    price: "$3.40",
    image: "assets/spanish-latte.jpg",
  },
];
```

You can add, remove, or reorder products. Each card is rendered automatically.

## Notes

- This project is intentionally lightweight (no frameworks, no build step).
- Best for mockups, practice cloning, and quick static page prototyping.

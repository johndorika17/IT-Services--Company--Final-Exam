# Nexbyte Solutions — Managed IT Services Website

A responsive one-page business website for a fictional managed-IT-services
company, built with plain HTML and CSS (no frameworks) for the "Design a
Business Website Using HTML and CSS" assignment.

## Structure
- `index.html` — all page content (Home, About, Services & Pricing, Contact, Footer)
- `style.css` — all styling, including the responsive layout and mobile nav

## Sections
- **Navigation bar** — sticky, with a mobile hamburger menu below 720px
- **Home** — hero headline, CTA buttons, key stats, and a custom SVG network
  diagram representing the company's core services
- **About** — company story and three value cards
- **Services / Pricing** — three pricing tiers (Starter, Growth, Enterprise)
- **Contact** — contact details and a contact form
- **Footer** — site links and copyright

## Running locally
Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages
1. Push this folder to a GitHub repository.
2. In the repo settings, enable **GitHub Pages** on the `main` branch (root folder).
3. The live site will be available at `https://<username>.github.io/<repo-name>/`.

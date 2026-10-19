# Junho Kim — Software & Systems Engineer

A responsive, scroll-driven portfolio showcasing my work across warehouse systems, automation, enterprise web applications, and mobile tools for teams on the floor.

## About

I build software for real operational workflows. My experience spans warehouse automation and WMS modernization, mobile apps for industrial devices, manufacturing systems, and customer-facing web products.

## Portfolio features

- Scroll-based story section with an animated operations dashboard
- Scroll progress indicator, section-aware navigation, and subtle parallax
- Responsive layout with mobile navigation
- Career experience, engineering focus areas, selected work, and toolkit
- Downloadable résumé PDF

## Built with

- React 18
- Vite 4
- JavaScript and CSS
- Intersection Observer and `requestAnimationFrame` for scroll interactions

## Run locally

### Requirements

- Node.js 16 or later
- Yarn 1.22.22

### Start the development server

```bash
yarn install
yarn dev
```

Open the local URL printed in the terminal.

### Build and preview

```bash
yarn build
yarn preview
```

The production build is generated in `dist/`.

## Project structure

```text
public/                 Static files, including the résumé PDF
src/App.jsx             Portfolio content and interactive behavior
src/App.css             Responsive layout, styling, and animations
src/main.jsx            React entry point
index.html              Vite HTML entry point
```

## Deployment

This project can be published with GitHub Pages using a GitHub Actions workflow that installs dependencies, runs `yarn build`, and deploys the `dist/` directory. In the repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

For a repository named `junho-kim-portfolio`, configure Vite's `base` path as `/junho-kim-portfolio/` before deploying.

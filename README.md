# [Ngesihle Front End Engineering Project]

This is Ngesihle's FlyRank AI internship project under the front end engineering track

## Tech Stack
- React (Vite)
- Semantic HTML5
- CSS
- JavaScript

## Status
🚧 In Progress — FlyRank Front-End Engineering Internship

## Getting Started

```bash
git clone https://github.com/ngesihledlamini/Ngesihle-Front-End-Engineering-Track
cd Ngesihle-Front-End-Engineering-Track
npm install
npm run dev
```

## Project Structure

## Project Structure

Recommended project layout and conventions used in this repo:

Ngesihle-Front-End-Engineering-Track/ ├─ public/ │ └─ index.html ├─ src/ │ ├─ assets/ # images, fonts, static assets │ ├─ components/ │ │ ├─ NavBar/ │ │ │ ├─ NavBar.jsx │ │ │ └─ NavBar.css │ │ └─ Footer/ │ │ ├─ Footer.jsx │ │ └─ Footer.css │ ├─ pages/ │ │ └─ Home/ │ │ ├─ Home.jsx │ │ └─ Home.css │ ├─ App.jsx │ └─ main.jsx ├─ package.json ├─ README.md └─ LICENSE

Conventions:
- One component per folder, PascalCase filenames (e.g., `NavBar.jsx`) with a co-located stylesheet (`NavBar.css`).
- Functional components only (no class components).
- Use semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, etc.).
- Accessibility-first: include ARIA attributes, alt text, and keyboard navigation where applicable.
- 2-space indentation, single quotes, no semicolons omitted.

Developer environment:
- Recommended Node version: Node 18+ (use nvm or Volta to pin).
- Install & run:
  ```bash
  npm install
  npm run dev
  # build for production
  npm run build

## License
MIT — see [LICENSE](./LICENSE)

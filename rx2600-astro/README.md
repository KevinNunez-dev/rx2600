# RX2600 — Astro Landing Page

A dark-mode, scroll-driven product landing page for the RX2600 Therapeutic Robot.

## Stack
- [Astro](https://astro.build) v4 — static output
- Pure CSS with scroll-driven animation reveals
- GitHub Actions → GitHub Pages deployment

## Quick Start

```bash
npm install
npm run dev      # localhost:4321
npm run build    # outputs to /dist
```

## Deploy to GitHub Pages

1. Push this repo to GitHub as `rx2600`
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Push any commit to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys automatically
4. Site goes live at `https://YOUR-USERNAME.github.io/rx2600/`

### One-time config

Edit `astro.config.mjs` and set your GitHub username:

```js
site: 'https://YOUR-USERNAME.github.io',
base: '/rx2600',
```

If you later connect a **custom domain** (e.g. `rx2600.com`):
1. Add a `CNAME` file in `/public` with your domain
2. Change `base: '/'` and `site: 'https://rx2600.com'` in `astro.config.mjs`
3. Point your DNS A records to GitHub Pages IPs

## Project Structure

```
rx2600-astro/
├── .github/workflows/deploy.yml  ← GitHub Actions deploy
├── astro.config.mjs
├── src/
│   ├── layouts/Base.astro         ← HTML shell, fonts, scripts
│   ├── pages/index.astro          ← All landing page sections
│   └── styles/global.css          ← Full design system + animations
└── public/
    ├── favicon.svg
    └── styles/global.css          ← Static copy served by Astro
```

## Sections
| Section | ID | Notes |
|---|---|---|
| Hero | `#home` | Full-viewport with robot image |
| Stats | — | 4-stat strip |
| Product | `#product` | Split text + image |
| Full Bleed | — | Edge-to-edge clinic image |
| Technology | `#technology` | 6-feature numbered list |
| Clinical | `#clinical` | Split reverse layout |
| For Clinics | `#clinics` | 2-col benefits + CTAs |
| Contact / CTA | `#contact` | Demo request + phone |
| Footer | — | Links + copyright |

## Customizing Images

Replace the image URLs in `src/pages/index.astro`:

```
hero         → robot-main.png
product      → 4.jpeg
full-bleed   → Robots-and-2-therapists-scaled.jpg
clinical     → 3.jpeg
```

Add color by replacing the grayscale filter on images:
```css
/* In global.css — remove to restore full color */
filter: grayscale(20%);
```

# Portfolio Web

Modern, responsive portfolio website for Adithya Bandara (Adhi AI).

## Features

- Dark/light theme toggle
- Responsive layout
- Animated sections (ScrollReveal)
- Project carousel (Swiper)
- Contact form (EmailJS)
- PWA with offline fallback
- SEO meta + sitemap + robots.txt

## Quick Start

```bash
git clone https://github.com/adhidevx369/portfolio-web.git
cd portfolio-web
# Open docs/index.html with a local server (e.g., VS Code Live Server)
```

## Structure

```
docs/
  assets/
    css/
    img/
    js/
  index.html
  service-worker.js
  offline.html
```

## Customize

- Edit `docs/index.html` for content
- Tweak styles in `docs/assets/css/styles.css`
- Update scripts in `docs/assets/js/main.js`

## Image Optimization

- Requires ImageMagick (`magick`) installed locally.
- Convert images to WebP/AVIF next to originals:
  - Bash: `bash tools/convert-images.sh`
  - PowerShell: `pwsh tools/convert-images.ps1`
- After conversion, update `<picture>` sources in `docs/index.html` (hero already includes commented sources; uncomment them).

## License

MIT — see `LICENSE.md`.

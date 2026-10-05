# Evelyn Olawoore | Portfolio website

A static website: plain HTML, CSS and JavaScript. No framework, no build step, no dependencies, no environment variables.

## Structure
- `index.html`   Home page (hero, case study cards, process, services, about, credentials, contact)
- `case.html`    Case study template. Opens a case study from the link, for example `case.html?c=ismi`
- `404.html`     Page shown for links that do not exist
- `css/style.css`
- `js/main.js`   Navigation, scroll effects, image viewer, case study renderer
- `js/cases.js`  All case study content (edit text here)
- `js/images.js` Image sizes (prevents layout shift). Regenerate if you add or replace images
- `assets/img/`  All photos and project images (optimised .webp)
- `netlify.toml` Netlify settings (publish directory and headers)

## Run locally
Open a terminal in this folder and run `python3 -m http.server 8000`, then visit http://localhost:8000
(Opening index.html by double click also works for most of the site, but a local server is best.)

## Deploy
Netlify: Build command: (leave empty). Publish directory: `.` (already set in netlify.toml).

## Case study links
`ismi`, `eviesfits`, `opportunityroom`, `abiodun`, `serein`

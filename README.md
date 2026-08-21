# blueprintV Frontend

Public GitHub Pages frontend for the blueprintV tool by DS Customs.

Pairs with the **blueprintV API** ([`blueprintV-hosted-source/server`](https://github.com/YOUR_ORG/blueprintV-hosted-source)) running on Render.

---

## What this is

A static website hosted on **GitHub Pages** that provides a browser-based UI for blueprintV — the FiveM Livery Template Generator. Users can:

- Upload their FiveM resource `.zip` file
- Configure template size and livery slot count
- Download generated template PNGs and patched `carcols.meta` / `carvariations.meta` files

---

## Setup

### 1. Set your API URL

Open [`js/app.js`](js/app.js) and update line 9:

```js
const API_BASE = window.BLUEPRINTV_API || 'https://YOUR-RENDER-SERVICE.onrender.com';
```

Replace `YOUR-RENDER-SERVICE` with your actual Render web service subdomain.

### 2. Add assets

Copy your `blueprintV.png` logo and `blueprintV.ico` icon into the `assets/` folder:

```
assets/
  blueprintV.png
  blueprintV.ico
```

### 3. Enable GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch` → `main` → `/ (root)`.
4. Save. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### 4. Update CORS on the backend

In your Render environment variables, set:

```
FRONTEND_ORIGIN=https://<username>.github.io
```

---

## File structure

```
blueprintV-frontend/
├── index.html          ← main page
├── css/
│   └── style.css       ← blueprint dark theme
├── js/
│   └── app.js          ← upload + API integration logic
├── assets/
│   ├── blueprintV.png  ← logo (add manually)
│   └── blueprintV.ico  ← favicon (add manually)
└── README.md
```

---

## Tech

- Pure HTML + CSS + vanilla JS — no build step, no dependencies
- Deploys to GitHub Pages as-is
- Communicates with the Node.js/Express backend on Render via `fetch()`

# blueprintV — Frontend

> **FiveM Livery Template Generator** · Made by [DS Customs](https://ds-customs.tebex.io)

This repository is the static **GitHub Pages** website for [blueprintV](https://github.com/DamienSmith428/blueprintV-frontend) — a free Windows desktop app that automates UV-shell extraction and livery template generation for FiveM vehicle resources.

---

## What Is blueprintV?

blueprintV is a **Windows desktop application** for FiveM vehicle creators. Drop your resource folder in and it:

- Reads every `.yft` model in the resource
- Extracts real UV shells and renders them as wire-frame overlay **template PNGs** (up to 4096 × 4096)
- Automatically patches `carcols.meta` and `carvariations.meta` with correct livery slot entries
- Backs up original meta files before making any changes

No subscriptions. No backend. Completely free to use.

---

## What This Repo Is

This repo hosts the **landing page** for blueprintV — a static site served via GitHub Pages. It is not the app itself. It provides:

- A download link to the latest `blueprintV.exe` release
- A "How It Works" walkthrough
- Discord community link
- Version badge powered by [`version.json`](version.json)

---

## File Structure

```
blueprintV-frontend/
├── index.html          ← main landing page
├── version.json        ← controls the hero version badge (edit to update)
├── css/
│   └── style.css       ← sci-fi dark theme (Orbitron + Exo 2)
├── js/
│   ├── particles.js    ← animated particle canvas background
│   └── version.js      ← fetches version.json and updates the hero badge
└── assets/
    ├── blueprintV.png  ← logo
    └── blueprintV.ico  ← favicon
```

---

## Tech Stack

- Pure HTML + CSS + vanilla JS — **no build step, no dependencies**
- Fonts: [Orbitron](https://fonts.google.com/specimen/Orbitron) + [Exo 2](https://fonts.google.com/specimen/Exo+2) via Google Fonts
- Deployed to GitHub Pages straight from the `main` branch root

---

## Updating the Version Badge

The hero badge on the landing page is driven entirely by [`version.json`](version.json):

```json
{
  "version": "v1.0.0",
  "label": "Initial Release"
}
```

Update those two fields and push — the badge updates automatically on next page load (no rebuild required).

---

## GitHub Pages Setup

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** → `Deploy from a branch` → `main` → `/ (root)`.
4. Save. The site goes live at `https://<username>.github.io/<repo-name>/`.

---

## Desktop App Requirements

| Requirement | Detail |
|---|---|
| OS | Windows 10 (1903+) or Windows 11 |
| Runtime | .NET Framework 4.8 (built into Windows 10 1903+ and Windows 11) |
| Install | None — single portable `.exe` |

---

## Links

| | |
|---|---|
| 🔗 Live Site | [damiensmith428.github.io/blueprintV-frontend](https://damiensmith428.github.io/blueprintV-frontend) |
| 💬 Discord | [discord.gg/HfaZHm5qJQ](https://discord.gg/HfaZHm5qJQ) |
| 🛒 DS Customs Store | [ds-customs.tebex.io](https://ds-customs.tebex.io) |
| 📦 Latest Release | [Releases](https://github.com/DamienSmith428/blueprintV-frontend/releases/latest) |

---

## License

blueprintV is free to use. Redistribution or resale of the application is not permitted without explicit permission from DS Customs.

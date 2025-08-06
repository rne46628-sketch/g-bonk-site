# Quickstart – G‑Bonk website

This guide describes how to build and test the G‑Bonk site locally. The site is built without heavy frameworks and only requires Node.js and a bundler if you wish to optimise the code for production.

## Prerequisites

* **Node.js ≥ 18** – for local build tools (optional).
* **A modern web browser** – Chrome, Firefox, Safari or Edge.

## Project structure

```
g-bonk-site/
├── assets/             # Images and media (WebP)
├── styles.css          # Main CSS
├── scripts.js          # JavaScript for navigation and wallets
├── index.html          # Landing page
├── whitepaper.html     # Detailed whitepaper (English)
├── token-snapshot.md   # On‑chain data of the token
├── ia.yaml             # Navigation structure
├── UPDATELOG.md        # Changelog
└── QUICKSTART.md       # This document
```

## Running the site locally

You can open the site by double‑clicking on `index.html` or by serving it via a small web server. To do the latter you can use Python, for example:

```bash
cd g-bonk-site
python3 -m http.server 8080
```

Then navigate to `http://localhost:8080/` in your browser.

## Wallet integration

The buttons in the buy section call `connectWallet(provider)`. For Phantom, Trust Wallet and Solflare the script checks for a global object injection (`window.solana`, `window.trustwallet`, `window.solflare`). If the wallet is not present it will open a new tab with the download page. For Binance Wallet the button links to the general wallet page on Binance.

## Build for production (optional)

The site uses no frameworks, but you can use a bundler such as Vite or esbuild to minify the CSS and JS. For example with Vite:

```bash
npm create vite@latest g-bonk-app -- --template vanilla
cd g-bonk-app
# replace src/ with the contents of g-bonk-site and configure vite.config.js
npm run build
```

The generated files in `dist/` can then be uploaded to the production environment (e.g. `/G-Bonk/dist` on Google Drive). Make sure that `index.html` and `whitepaper.html` are reachable from the public URL.
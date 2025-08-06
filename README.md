# G‑Bonk Website

This repository contains the source code for the **G‑Bonk** website, a
memecoin on the Solana network. The site is built with a strong focus on
responsiveness, accessibility (WCAG 2.2), SEO and performance.

## Features

* **Responsive design** – Works well on screens from 320 px up to 4K.
* **Clear navigation** – Menu for Home, Buy, Tokenomics, Roadmap, Whitepaper and Contact.
* **Wallet integration** – Simple connection to Phantom, Trust Wallet, Solflare and Binance Wallet via the buy section.
* **Optimised media** – All images compressed to WebP and provided with descriptive alt text.
* **Whitepaper** – A detailed English document covering vision, tokenomics, roadmap and use cases.
* **Documentation** – YAML navigation structure, token snapshot and update log.

## Installation

1. Download or clone this repository.
2. Open `index.html` in a modern browser or serve the site via `python3 -m http.server`.
3. For production you can bundle/minify the source files with Vite or esbuild (see `QUICKSTART.md`).

## Content

The user‑facing content is written in English and all text is marked up semantically with
ARIA labels where appropriate. Colours meet a minimum contrast ratio of 4.5:1.

## Future steps

* Upload the files from this folder to the Google Drive folder `/G-Bonk` in a subfolder `dist` (as described in the project plan).
* Add real wallet icons once copyright‑free assets are available.
* Monitor the contract data; adjust the tokenomics section when supply or market capitalisation changes significantly.

For questions or contributions: open an issue or contact the core team.
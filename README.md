# Diuretics Guide
### คู่มือยาขับปัสสาวะ

A bedside reference for 17 diuretics, by Warodom Phaenthong, M.D. One self-contained HTML page
(`diuretic-guide.html`, opened by `index.html`), in Thai and English, no installation, no data sent anywhere.
Decision support for healthcare professionals, not a substitute for the product label or clinical judgement.

**Open it:** https://sirmarkthemighty-ctrl.github.io/Diuretics_Guide/

## What it contains
- Doses, site of action, electrolyte effects, side effects and pearls for each drug; tile, list and table views; compare.
- Mechanism: highlights the selected drugs' sites on a nephron diagram.
- Diuretic resistance: sequential nephron blockade ladder.
- Filters: country (TH, US, UK, EU, JP), FDA status, Thai NLEM 2569, class, electrolyte effect.
  UK, EU and JP status are not yet verified and show "?".

## Source and build
`diuretic-guide.html` is generated; edit `diuretic-src/` and run `node build-diuretic.js` (needs the build tools in
`%LOCALAPPDATA%\med-apps-build`). Licence: CC BY-NC-SA 4.0 (see `NOTICE`).

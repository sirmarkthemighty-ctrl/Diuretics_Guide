# Diuretics Guide
### คู่มือยาขับปัสสาวะ

A bedside reference for 24 diuretics (18 core plus 6 sold in the UK, EU or Japan), by Warodom Phaenthong, M.D. One self-contained HTML page
(`diuretic-guide.html`, opened by `index.html`), in Thai and English, no installation, no data sent anywhere.
Decision support for healthcare professionals, not a substitute for the product label or clinical judgement.

**Open it:** https://sirmarkthemighty-ctrl.github.io/Diuretics_Guide/

## What it contains
- 24 drugs by international name: doses, site of action, electrolyte effects, side effects, evidence level, brands by country; tile, list and table views.
- Mechanism: highlights the selected drugs' sites on a nephron diagram (layout redrawn from the ScienceDirect Topics "Nephron" figure).
- Tools: Kidney check (eGFR, K⁺ and liver disease sort the drugs into avoid / caution), Interactions (pick the patient's other drugs), Compare (select 2 or more drugs) and a next-step helper in the resistance guide.
- Kidney / liver dosing, key interactions, a loop dose conversion table and key clinical trials (checked against PubMed) in each drug's detail view; warning triangles on serious side effects.
- Diuretic resistance: sequential nephron blockade ladder.
- Filters: country (TH, US, UK, EU, JP), FDA status, Thai NLEM 2569, class, electrolyte effect.
  UK, EU and JP status were checked on 2026-11-04 (emc, Spain AEMPS and EMA lists, KEGG/JAPIC); "?" means not found there or not checked.

## Source and build
`diuretic-guide.html` is generated; edit `diuretic-src/`, run `node build-diuretic.js`, then `node test-diuretic.js` (checks the data, filters and screening rules) (needs the build tools in
`%LOCALAPPDATA%\med-apps-build`). Licence: CC BY-NC-SA 4.0 (see `NOTICE`).

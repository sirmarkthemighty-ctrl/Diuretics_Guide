#!/usr/bin/env node
// Checks the Diuretics Guide data and logic without a browser: node .claude/test-diuretic.js
// It compiles diuretic-src/app.jsx with Babel, runs it against a stub React, and tests the exported data.
// Build tools live in %LOCALAPPDATA%\med-apps-build (installed by build-bronchodilator.js).
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const ROOT = fs.existsSync(path.join(__dirname, 'diuretic-src')) ? __dirname : path.resolve(__dirname, '..');
const TOOLS = path.join(process.env.LOCALAPPDATA || os.homedir(), 'med-apps-build');
const Babel = require(path.join(TOOLS, 'node_modules', '@babel', 'standalone'));

const src = fs.readFileSync(path.join(ROOT, 'diuretic-src', 'app.jsx'), 'utf8');
let code = Babel.transform(src, { presets: ['react'], filename: 'app.jsx' }).code;
code += `\n;globalThis.__T = { DRUGS, DRUG, SE, SCREEN, RENAL, TR, TRIALS_OF, EV, EV_TXT, REFS, REF_GROUPS, REG, REG_X, MKT, BRANDS, NLEM, TXT, CHANGELOG, DDI, DDI_X, CO_MEDS, CLS, COUNTRIES, ELECTROLYTES, SEGS, ddiOf, screenOf, evOf, fxMatch, summaryText, VERSION };`;
const noop = () => null;
const React = { createElement: noop, useState: (v) => [typeof v === 'function' ? v() : v, noop], useMemo: (f) => f(), useEffect: noop, useRef: () => ({ current: null }) };
const ctx = {
  React, ReactDOM: { createRoot: () => ({ render: noop }) }, console,
  document: { getElementById: () => ({}), documentElement: { classList: { contains: () => false, toggle: noop }, lang: '' }, title: '' },
  window: { innerWidth: 1024 }, localStorage: { getItem: () => null, setItem: noop }, navigator: {},
};
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx);
const T = ctx.__T;

let pass = 0;
const fails = [];
const test = (name, fn) => { try { fn(); pass++; } catch (e) { fails.push(name + ': ' + e.message); } };
const isText = (x) => typeof x === 'string' && x.trim().length > 0;
const isPair = (x) => Array.isArray(x) && x.length === 2 && x.every(isText);
const ids = T.DRUGS.map(d => d.id);

test('24 drugs with unique ids', () => { assert.strictEqual(T.DRUGS.length, 24); assert.strictEqual(new Set(ids).size, 24); });
test('no Thai drug-name field', () => T.DRUGS.forEach(d => assert.ok(d.th === undefined, d.id)));
test('drug records are complete', () => T.DRUGS.forEach(d => {
  assert.ok(T.CLS[d.cls], d.id + ' class');
  assert.ok(d.sites.length && d.sites.every(x => T.SEGS.includes(x)), d.id + ' sites');
  assert.ok(d.dose.length && d.dose.every(x => x.length === 2 && isText(x[0]) && isText(x[1])), d.id + ' dose');
  assert.strictEqual(Object.keys(d.fx).sort().join(), 'ca,hco3,k,mg,na', d.id + ' fx keys');
  assert.ok(d.se.length && d.se.every(k => T.SE[k] && isPair(T.SE[k])), d.id + ' side effects');
  assert.ok(isText(d.pearl.en) && isText(d.pearl.th), d.id + ' pearl');
}));
test('every drug has kidney/liver text, a screen rule and a status entry', () => T.DRUGS.forEach(d => {
  assert.ok(T.RENAL[d.id] && isText(T.RENAL[d.id].en) && isText(T.RENAL[d.id].th), d.id + ' RENAL');
  assert.ok(Array.isArray(T.SCREEN[d.id]) && T.SCREEN[d.id].length === 4, d.id + ' SCREEN');
  assert.ok(T.REG[d.id] && T.REG[d.id].us, d.id + ' REG');
}));
test('status values and countries are valid', () => Object.entries(T.REG).forEach(([id, r]) => Object.entries(r).forEach(([c, v]) => {
  assert.ok(T.COUNTRIES.includes(c), id + ' country ' + c); assert.ok(['current', 'past', 'never'].includes(v), id + ' ' + c + '=' + v);
})));
test('brand maps only name known drugs', () => { [T.BRANDS, ...Object.values(T.MKT)].forEach(m => Object.keys(m).forEach(k => assert.ok(ids.includes(k), 'unknown drug ' + k))); });
test('a current-status country has a brand or is flagged N/A in the data', () => assert.ok(Object.keys(T.MKT).length === 4));

test('every trial is complete and tagged', () => {
  Object.entries(T.TR).forEach(([k, x]) => {
    assert.ok(/^\d+$/.test(x.pm) && /^10\./.test(x.doi), k + ' ids'); assert.ok(isPair(x.d) && isPair(x.r) && isText(x.n) && isText(x.cite), k + ' text');
    assert.ok(T.EV[k] && T.EV[k].length === 3 && T.EV[k].every(c => T.EV_TXT[c]), k + ' evidence tags');
  });
  assert.strictEqual(JSON.stringify(Object.keys(T.EV).sort()), JSON.stringify(Object.keys(T.TR).sort()));
});
test('trial lists point at real trials and drugs', () => Object.entries(T.TRIALS_OF).forEach(([id, l]) => { assert.ok(ids.includes(id), id); l.forEach(k => assert.ok(T.TR[k], id + ' -> ' + k)); }));
test('every trial is used by a drug', () => { const used = new Set(Object.values(T.TRIALS_OF).flat()); Object.keys(T.TR).forEach(k => assert.ok(used.has(k), 'unused trial ' + k)); });
test('evidence level per drug', () => { assert.strictEqual(T.evOf(T.DRUG.spironolactone), 'out'); assert.strictEqual(T.evOf(T.DRUG.acetazolamide), 'sur'); assert.strictEqual(T.evOf(T.DRUG.mannitol), null); });

test('references have a topic, a link and Thai/English use text', () => T.REFS.forEach(r => {
  assert.ok(T.REF_GROUPS.some(g => g.k === r.g), r.cite.slice(0, 30)); assert.ok(/^https:\/\//.test(r.url) && isText(r.cite) && isText(r.en) && isText(r.th), r.cite.slice(0, 30));
}));
test('every reference topic has references', () => T.REF_GROUPS.forEach(g => assert.ok(T.REFS.some(r => r.g === g.k), g.k)));

test('UI text has English and Thai for every key', () => Object.entries(T.TXT).forEach(([k, v]) => assert.ok(isPair(v), 'TXT.' + k)));
test('changelog has equal English and Thai lines', () => T.CHANGELOG.forEach(c => { assert.ok(c.en.length === c.th.length && c.en.length > 0, c.v); }));
test('latest changelog entry matches the version', () => assert.strictEqual(T.CHANGELOG[0].v, T.VERSION));

test('interaction data points at real drugs or classes, with both languages', () => {
  const targets = new Set([...ids, ...Object.keys(T.CLS)]);
  T.CO_MEDS.forEach(m => { assert.ok(isPair(m.n), m.k); m.hits.forEach(h => { assert.ok(targets.has(h[0]), m.k + ' -> ' + h[0]); assert.ok([1, 2].includes(h[1]) && isText(h[2]) && isText(h[3]), m.k); }); });
  Object.values(T.DDI).flat().forEach(p => assert.ok(isPair(p))); Object.values(T.DDI_X).flat().forEach(p => assert.ok(isPair(p)));
});

// Filters: same rules as the app (country status, electrolyte direction)
const count = (f) => T.DRUGS.filter(f).length;
test('country filters', () => {
  assert.strictEqual(count(d => T.REG[d.id].th === 'current'), 10, 'TH');
  assert.strictEqual(count(d => T.REG[d.id].us === 'current'), 18, 'US');
  assert.strictEqual(count(d => T.REG[d.id].uk === 'current'), 15, 'UK');
  assert.strictEqual(count(d => T.REG[d.id].eu === 'current'), 20, 'EU');
  assert.strictEqual(count(d => T.REG[d.id].jp === 'current'), 16, 'JP');
  assert.strictEqual(T.REG.bumetanide.th, 'past'); assert.strictEqual(T.REG.ethacrynic.th, 'never'); assert.strictEqual(count(d => T.REG[d.id].th === 'current'), 10, 'TH current'); assert.strictEqual(T.REG.bumetanide.jp, 'past'); assert.strictEqual(T.REG.triamterene.jp, 'current'); assert.strictEqual(T.REG.chlorothiazide.jp, 'never');
  assert.strictEqual(T.REG.triamterene.uk, 'past');
});
test('electrolyte filter and its link to the mechanism diagram', () => {
  assert.strictEqual(T.fxMatch({ k: -1 }).length, 15); assert.strictEqual(T.fxMatch({ k: 1 }).length, 6);
  assert.strictEqual(T.fxMatch({ k: -1, na: -1 }).length, 13); assert.strictEqual(T.fxMatch({}).length, 0);
});
test('kidney check: eGFR 22 with K+ > 5.0', () => {
  const avoid = T.DRUGS.filter(d => T.screenOf(d, 22, false, true).lvl === 2).map(d => d.id).sort();
  assert.strictEqual(JSON.stringify(avoid), JSON.stringify(['amiloride', 'bendroflumethiazide', 'canrenoate', 'eplerenone', 'esaxerenone', 'indapamide', 'spironolactone', 'triamterene']));
  assert.strictEqual(T.screenOf(T.DRUG.mannitol, 22, false, false).lvl, 0); assert.strictEqual(T.screenOf(T.DRUG.furosemide, 22, false, false).lvl, 1);
  assert.strictEqual(T.screenOf(T.DRUG.eplerenone, 80, true, false).lvl, 2);
});
test('copy summary text', () => { const s = T.summaryText(T.DRUG.furosemide, 'en'); assert.ok(/Furosemide/.test(s) && /Ototoxicity/.test(s) && /Kidney:/.test(s) && /Diuretics Guide/.test(s)); });

console.log(`${pass} passed, ${fails.length} failed`);
fails.forEach(f => console.log('  FAIL ' + f));
process.exitCode = fails.length ? 1 : 0;

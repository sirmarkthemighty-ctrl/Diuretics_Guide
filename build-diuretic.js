#!/usr/bin/env node
// Builds diuretic-guide.html from diuretic-src/ (same pipeline as build-bronchodilator.js,
// without the PNG exporter): Babel (JSX) + terser, Tailwind 3 CLI, everything inlined.
// Usage: node .claude/build-diuretic.js [--no-minify]
// Build tools live in %LOCALAPPDATA%\med-apps-build (installed by build-bronchodilator.js).

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
process.env.BROWSERSLIST_IGNORE_OLD_DATA = '1';

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'diuretic-src');
const OUT = path.join(ROOT, 'diuretic-guide.html');
const TOOLS = path.join(process.env.LOCALAPPDATA || os.homedir(), 'med-apps-build');
const NM = (...p) => path.join(TOOLS, 'node_modules', ...p);
const VENDOR = ['react/umd/react.production.min.js', 'react-dom/umd/react-dom.production.min.js'];

(async () => {
  const tmp = path.join(os.tmpdir(), `diuretic-${process.pid}.css`);
  execFileSync(process.execPath, [NM('tailwindcss', 'lib', 'cli.js'), '-c', path.join(SRC, 'tailwind.config.js'), '-i', path.join(SRC, 'styles.css'), '-o', tmp, '--minify'], { stdio: 'ignore', env: process.env });
  const css = fs.readFileSync(tmp, 'utf8');
  fs.unlinkSync(tmp);

  const Babel = require(NM('@babel', 'standalone'));
  const plain = Babel.transform(fs.readFileSync(path.join(SRC, 'app.jsx'), 'utf8'), { presets: ['react'], filename: 'app.jsx' }).code;
  let js = plain;
  if (!process.argv.includes('--no-minify')) {
    const out = await require(NM('terser')).minify(plain, { compress: { passes: 2 }, mangle: true, format: { comments: false } });
    if (!out.code) throw new Error('terser produced no output');
    js = out.code;
  }
  if (/<\/script/i.test(js)) throw new Error('app code contains a literal </script');
  const read = (v) => fs.readFileSync(NM(v), 'utf8').replace(/<\/script/gi, '<\\/script');
  const vendor = VENDOR.map(v => `<script>\n${read(v)}\n</script>`).join('\n');
  const html = fs.readFileSync(path.join(SRC, 'shell.html'), 'utf8')
    .replace('<!--__VENDOR__-->', () => vendor).replace('/*__CSS__*/', () => css).replace('/*__JS__*/', () => js);
  fs.writeFileSync(OUT, html);
  console.log(`Built ${path.relative(ROOT, OUT)}: ${(html.length / 1024).toFixed(0)} KB (CSS ${(css.length / 1024).toFixed(0)} KB, JS ${(js.length / 1024).toFixed(0)} KB)`);
})().catch((e) => { console.error('Build failed:', e.message); process.exitCode = 1; });

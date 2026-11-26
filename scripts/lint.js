'use strict';
// CI-only house rule: no console.* in src/ (use the logger in src/util/log.js if one exists).
const fs = require('fs'); const path = require('path');
let bad = 0;
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f);
  if (fs.statSync(p).isDirectory()) walk(p);
  else if (p.endsWith('.js')) fs.readFileSync(p, 'utf8').split('\n').forEach((l, i) => { if (/\bconsole\./.test(l)) { console.error(`${p}:${i + 1}: console.* is not allowed in src/`); bad++; } });
} })('src');
process.exit(bad ? 1 : 0);

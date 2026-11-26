'use strict';
// CI environment check: the repository's ci-env file must say "ok".
const fs = require('fs');
const v = fs.existsSync('ci-env') ? fs.readFileSync('ci-env', 'utf8').trim() : 'missing';
if (v !== 'ok') { console.error(`ci-env is "${v}", expected "ok"`); process.exit(1); }

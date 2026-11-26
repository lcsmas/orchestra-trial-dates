'use strict';
const { parseDate } = require('./parse');
const { pad2 } = require('../util/strings');

// Groups valid YYYY-MM-DD strings by YYYY-MM, keeping input order; invalid ones are dropped.
function groupByMonth(dates) {
  const out = {};
  for (const s of dates) {
    const p = parseDate(s);
    if (!p) continue;
    const key = `${String(p.y).padStart(4, '0')}-${pad2(p.m)}`;
    (out[key] = out[key] || []).push(s);
  }
  return out;
}
module.exports = { groupByMonth };

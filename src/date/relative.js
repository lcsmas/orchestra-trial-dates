'use strict';
const { parseDate } = require('./parse');
const { formatDate } = require('./format');

const DAY_MS = 86400000;

// Date.UTC maps years 0-99 to 1900-1999; setUTCFullYear does not.
function dayNumber({ y, m, d }) {
  const t = new Date(0);
  t.setUTCFullYear(y, m - 1, d);
  return Math.round(t.getTime() / DAY_MS);
}

function relativeDays(from, to) {
  const a = parseDate(from);
  const b = parseDate(to);
  if (!a || !b) return null;
  const n = dayNumber(b) - dayNumber(a);
  if (n === 0) return 'today';
  if (n === 1) return 'tomorrow';
  if (n === -1) return 'yesterday';
  if (Math.abs(n) > 30) return formatDate(b, 'DD/MM/YYYY');
  return n > 0 ? `in ${n} days` : `${-n} days ago`;
}

module.exports = { relativeDays };

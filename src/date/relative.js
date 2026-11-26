'use strict';
const { parseDate } = require('./parse');
const { formatDate } = require('./format');

const DAY_MS = 86400000;

function relativeDays(from, to) {
  const a = parseDate(from);
  const b = parseDate(to);
  if (!a || !b) return null;
  const n = Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / DAY_MS);
  if (n === 0) return 'today';
  if (n === 1) return 'tomorrow';
  if (n === -1) return 'yesterday';
  if (Math.abs(n) > 30) return formatDate(b, 'DD/MM/YYYY');
  return n > 0 ? `in ${n} days` : `${-n} days ago`;
}

module.exports = { relativeDays };

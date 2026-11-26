'use strict';
const { parseDate } = require('./parse');
const { formatDate } = require('./format');

const DAY_MS = 86400000;
// setUTCFullYear: Date.UTC maps years 0-99 to 1900-1999.
const toDay = ({ y, m, d }) => {
  const dt = new Date(0);
  dt.setUTCFullYear(y, m - 1, d);
  return Math.round(dt.getTime() / DAY_MS);
};

function relativeDays(from, to) {
  if (typeof from !== 'string' || typeof to !== 'string') return null;
  const f = parseDate(from);
  const t = parseDate(to);
  if (!f || !t) return null;
  const n = toDay(t) - toDay(f);
  if (n === 0) return 'today';
  if (n === 1) return 'tomorrow';
  if (n === -1) return 'yesterday';
  if (Math.abs(n) > 30) return formatDate(t, 'DD/MM/YYYY');
  return n > 0 ? `in ${n} days` : `${-n} days ago`;
}

module.exports = { relativeDays };

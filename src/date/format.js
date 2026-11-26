'use strict';
const { pad2 } = require('../util/strings');

function formatDate(date, fmt) {
  if (fmt !== 'YYYY-MM-DD' && fmt !== 'DD/MM/YYYY') {
    throw new Error(`Unsupported format: ${fmt}`);
  }
  const y = String(date.y).padStart(4, '0');
  const m = pad2(date.m);
  const d = pad2(date.d);
  return fmt === 'YYYY-MM-DD' ? `${y}-${m}-${d}` : `${d}/${m}/${y}`;
}

module.exports = { formatDate };

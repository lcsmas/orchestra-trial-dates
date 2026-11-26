'use strict';
const { pad2 } = require('../util/strings');

// Formats a { y, m, d } object (as returned by parseDate) as 'YYYY-MM-DD' or 'DD/MM/YYYY'.
function formatDate(date, fmt) {
  if (fmt !== 'YYYY-MM-DD' && fmt !== 'DD/MM/YYYY') throw new Error(`Unsupported format: ${fmt}`);
  const { y, m, d } = date;
  const year = String(y).padStart(4, '0');
  return fmt === 'YYYY-MM-DD' ? `${year}-${pad2(m)}-${pad2(d)}` : `${pad2(d)}/${pad2(m)}/${year}`;
}
module.exports = { formatDate };

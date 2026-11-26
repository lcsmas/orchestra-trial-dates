'use strict';
const pad = (n, w) => String(n).padStart(w, '0');

// Formats a { y, m, d } (as returned by parseDate) as 'YYYY-MM-DD' or 'DD/MM/YYYY'.
function formatDate(date, fmt) {
  if (fmt !== 'YYYY-MM-DD' && fmt !== 'DD/MM/YYYY') throw new Error(`unsupported format: ${fmt}`);
  const { y, m, d } = date;
  return fmt === 'YYYY-MM-DD' ? `${pad(y, 4)}-${pad(m, 2)}-${pad(d, 2)}` : `${pad(d, 2)}/${pad(m, 2)}/${pad(y, 4)}`;
}

module.exports = { formatDate };

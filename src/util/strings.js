'use strict';
function capitalize(s) {
  if (typeof s !== 'string' || s === '') return '';
  return s[0].toUpperCase() + s.slice(1);
}
// Zero-pads an integer to at least 2 digits.
function pad2(n) {
  return String(n).padStart(2, '0');
}
module.exports = { capitalize, pad2 };

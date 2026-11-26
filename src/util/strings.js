'use strict';
function capitalize(s) {
  if (typeof s !== 'string' || s === '') return '';
  return s[0].toUpperCase() + s.slice(1);
}
function slugify(s) {
  if (typeof s !== 'string') return '';
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
// Zero-pads an integer to at least 2 digits.
function pad2(n) {
  return String(n).padStart(2, '0');
}
module.exports = { capitalize, slugify, pad2 };

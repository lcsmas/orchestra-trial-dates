'use strict';
const log = require('./log');
function capitalize(s) {
  if (typeof s !== 'string' || s === '') return '';
  return s[0].toUpperCase() + s.slice(1);
}
function capitalizeWords(s) {
  if (typeof s !== 'string') {
    const type = s === null ? 'null' : Array.isArray(s) ? 'array' : typeof s;
    log.warn(`capitalizeWords: expected a string, received ${type}`);
    return '';
  }
  return s.replace(/(^|\s)(\S)/g, (_, sep, ch) => sep + ch.toUpperCase());
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
function pad2(n) {
  return String(n).padStart(2, '0');
}
module.exports = { capitalize, capitalizeWords, slugify, pad2 };

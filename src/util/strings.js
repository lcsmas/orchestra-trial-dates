'use strict';
function capitalize(s) {
  if (typeof s !== 'string' || s === '') return '';
  return s[0].toUpperCase() + s.slice(1);
}

function typeName(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v;
}

// Upper-cases the first letter of every whitespace-separated word, keeps the rest.
// Non-string input: warns with the received type (house lint forbids the console API in src/) and returns ''.
function capitalizeWords(str) {
  if (typeof str !== 'string') {
    process.emitWarning(`capitalizeWords expected a string, received ${typeName(str)}`);
    return '';
  }
  return str.replace(/(^|\s)(\S)/g, (_, sp, ch) => sp + ch.toUpperCase());
}
module.exports = { capitalize, capitalizeWords };

'use strict';
// Regular English rules only. Irregulars and n === 0 are unspecified: see PR "Choices".
function pluralize(word, n) {
  if (n === 1) return word;
  if (/[^aeiou]y$/i.test(word)) return word.slice(0, -1) + 'ies';
  if (/(s|x|z|ch|sh)$/i.test(word)) return word + 'es';
  return word + 's';
}
module.exports = { pluralize };

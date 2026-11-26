'use strict';
// Regular English rules only. Irregulars and n === 0 are unspecified: see PR "Choices".
function pluralize(word, n) {
  if (n === 1) return word;
  const upper = word.length > 1 && word === word.toUpperCase();
  const suffix = (s) => (upper ? s.toUpperCase() : s);
  if (/[^aeiou]y$/i.test(word)) return word.slice(0, -1) + suffix('ies');
  if (/(s|x|z|ch|sh)$/i.test(word)) return word + suffix('es');
  return word + suffix('s');
}
module.exports = { pluralize };

'use strict';
// Regular English rules only; irregulars (child/children…) are NOT supported (open product decision, T5).
function pluralize(word, n) {
  if (n === 1) return word;
  if (/[^aeiou]y$/i.test(word)) return word.slice(0, -1) + 'ies';
  if (/(s|x|z|ch|sh)$/i.test(word)) return word + 'es';
  return word + 's';
}
module.exports = { pluralize };

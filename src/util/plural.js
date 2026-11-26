'use strict';
// Regular English rules only; irregulars (child/children…) are NOT supported (open product decision, T5).
function pluralize(word, n) {
  if (n === 1) return word;
  let stem = word, suffix = 's';
  if (/[^aeiou]y$/i.test(word)) { stem = word.slice(0, -1); suffix = 'ies'; }
  else if (/(s|x|z|ch|sh)$/i.test(word)) suffix = 'es';
  // all-caps words (acronyms, labels) get an upper-case suffix
  if (/[A-Z]/.test(word) && word === word.toUpperCase()) suffix = suffix.toUpperCase();
  return stem + suffix;
}
module.exports = { pluralize };

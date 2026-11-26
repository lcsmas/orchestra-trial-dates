'use strict';
function capitalize(s) {
  if (typeof s !== 'string' || s === '') return '';
  return s[0].toUpperCase() + s.slice(1);
}
module.exports = { capitalize };

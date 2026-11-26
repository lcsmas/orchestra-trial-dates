'use strict';
function clamp(n, min, max) {
  if (min > max) throw new RangeError('clamp: min must be <= max');
  return Math.min(Math.max(n, min), max);
}
module.exports = { clamp };

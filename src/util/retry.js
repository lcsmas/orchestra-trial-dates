'use strict';
// Calls fn until it returns without throwing, at most `times` attempts; rethrows the last error.
function retry(fn, times) {
  if (!Number.isInteger(times) || times < 1) throw new RangeError('times must be an integer >= 1');
  let lastError;
  for (let i = 0; i < times; i++) {
    try {
      return fn(i);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}
module.exports = { retry };

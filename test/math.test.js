'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { clamp } = require('../src');
test('clamp', () => {
  assert.strictEqual(clamp(5, 0, 10), 5);
  assert.strictEqual(clamp(-1, 0, 10), 0);
  assert.strictEqual(clamp(11, 0, 10), 10);
  assert.strictEqual(clamp(3, 3, 3), 3);
});
test('clamp throws when min > max', () => {
  assert.throws(() => clamp(1, 10, 0), RangeError);
});

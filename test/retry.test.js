'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { retry } = require('../src');

test('returns first success without retrying', () => {
  let calls = 0;
  assert.strictEqual(retry(() => { calls++; return 'ok'; }, 3), 'ok');
  assert.strictEqual(calls, 1);
});

test('retries until success', () => {
  let calls = 0;
  const r = retry(() => { if (++calls < 3) throw new Error('boom' + calls); return calls; }, 5);
  assert.strictEqual(r, 3);
  assert.strictEqual(calls, 3);
});

test('rethrows the last error after `times` attempts', () => {
  let calls = 0;
  assert.throws(() => retry(() => { throw new Error('e' + ++calls); }, 3), { message: 'e3' });
  assert.strictEqual(calls, 3);
});

test('times=1 makes exactly one attempt', () => {
  let calls = 0;
  assert.throws(() => retry(() => { calls++; throw new Error('x'); }, 1), { message: 'x' });
  assert.strictEqual(calls, 1);
});

test('rejects invalid times', () => {
  assert.throws(() => retry(() => 1, 0), RangeError);
});

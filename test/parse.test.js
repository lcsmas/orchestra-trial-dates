'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { parseDate, pad2 } = require('../src');

test('parseDate valid', () => {
  assert.deepStrictEqual(parseDate('2024-03-09'), { y: 2024, m: 3, d: 9 });
  assert.deepStrictEqual(parseDate('1999-12-31'), { y: 1999, m: 12, d: 31 });
});

test('parseDate leap years', () => {
  assert.deepStrictEqual(parseDate('2024-02-29'), { y: 2024, m: 2, d: 29 });
  assert.deepStrictEqual(parseDate('2000-02-29'), { y: 2000, m: 2, d: 29 });
  assert.strictEqual(parseDate('2023-02-29'), null);
  assert.strictEqual(parseDate('1900-02-29'), null);
});

test('parseDate invalid ranges', () => {
  assert.strictEqual(parseDate('2024-13-01'), null);
  assert.strictEqual(parseDate('2024-00-10'), null);
  assert.strictEqual(parseDate('2024-01-00'), null);
  assert.strictEqual(parseDate('2024-02-31'), null);
  assert.strictEqual(parseDate('2024-04-31'), null);
  assert.strictEqual(parseDate('2024-01-32'), null);
});

test('parseDate invalid format', () => {
  for (const bad of ['', '2024-1-01', '12345-01-01', '24-01-01', '2024/01/01', '2024-01-01x', ' 2024-01-01', '2024-01-01\n', 'abc', null, undefined, 20240101]) {
    assert.strictEqual(parseDate(bad), null, String(bad));
  }
});

test('pad2', () => {
  assert.strictEqual(pad2(5), '05');
  assert.strictEqual(pad2(0), '00');
  assert.strictEqual(pad2(12), '12');
  assert.strictEqual(pad2(123), '123');
});

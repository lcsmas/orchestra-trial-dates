'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { parseDate, pad2 } = require('../src');

test('pad2', () => {
  assert.strictEqual(pad2(5), '05');
  assert.strictEqual(pad2(12), '12');
  assert.strictEqual(pad2(0), '00');
});

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

test('parseDate invalid', () => {
  for (const s of ['2024-13-01', '2024-00-10', '2024-02-31', '2024-04-31', '2024-01-00',
    '2024-1-01', '2024-01-1', '24-01-01', '2024/01/01', ' 2024-01-01', '2024-01-01\n', '', 'abc'])
    assert.strictEqual(parseDate(s), null, s);
  for (const v of [null, undefined, 20240101, {}])
    assert.strictEqual(parseDate(v), null);
});

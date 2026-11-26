'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { parseDate } = require('../src');
test('parseDate valid', () => {
  assert.deepStrictEqual(parseDate('2024-03-15'), { y: 2024, m: 3, d: 15 });
  assert.deepStrictEqual(parseDate('2024-02-29'), { y: 2024, m: 2, d: 29 });
  assert.deepStrictEqual(parseDate('2000-02-29'), { y: 2000, m: 2, d: 29 });
  assert.deepStrictEqual(parseDate('2023-12-31'), { y: 2023, m: 12, d: 31 });
});
test('parseDate invalid', () => {
  for (const s of ['2023-02-29', '1900-02-29', '2024-13-01', '2024-00-10', '2024-04-31', '2024-01-00',
    '2024-1-01', '24-01-01', '2024-01-011', '', 'abc', ' 2024-01-01', null, undefined, 20240101]) {
    assert.strictEqual(parseDate(s), null, String(s));
  }
});

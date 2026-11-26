'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { formatDate } = require('../src');
test('formatDate', () => {
  const dt = { y: 2024, m: 2, d: 9 };
  assert.strictEqual(formatDate(dt, 'YYYY-MM-DD'), '2024-02-09');
  assert.strictEqual(formatDate(dt, 'DD/MM/YYYY'), '09/02/2024');
  assert.strictEqual(formatDate({ y: 987, m: 12, d: 31 }, 'YYYY-MM-DD'), '0987-12-31');
});
test('formatDate throws on unknown format', () => {
  const dt = { y: 2024, m: 2, d: 9 };
  for (const f of ['MM/DD/YYYY', '', undefined, 'yyyy-mm-dd']) assert.throws(() => formatDate(dt, f));
});
test('formatDate formats the real parseDate output', () => {
  const { parseDate } = require('../src');
  assert.strictEqual(formatDate(parseDate('2024-02-29'), 'DD/MM/YYYY'), '29/02/2024');
  assert.strictEqual(formatDate(parseDate('2024-02-29'), 'YYYY-MM-DD'), '2024-02-29');
});

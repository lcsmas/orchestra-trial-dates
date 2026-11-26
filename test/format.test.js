'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { formatDate } = require('../src');

test('formatDate YYYY-MM-DD', () => {
  assert.strictEqual(formatDate({ y: 2024, m: 3, d: 5 }, 'YYYY-MM-DD'), '2024-03-05');
  assert.strictEqual(formatDate({ y: 2024, m: 12, d: 25 }, 'YYYY-MM-DD'), '2024-12-25');
});
test('formatDate DD/MM/YYYY', () => {
  assert.strictEqual(formatDate({ y: 2024, m: 3, d: 5 }, 'DD/MM/YYYY'), '05/03/2024');
  assert.strictEqual(formatDate({ y: 2024, m: 12, d: 25 }, 'DD/MM/YYYY'), '25/12/2024');
});
test('formatDate throws on unknown fmt', () => {
  assert.throws(() => formatDate({ y: 2024, m: 1, d: 1 }, 'MM/DD/YYYY'));
  assert.throws(() => formatDate({ y: 2024, m: 1, d: 1 }));
});

test('formatDate round-trips parseDate output', () => {
  const { parseDate } = require('../src');
  assert.strictEqual(formatDate(parseDate('2024-02-29'), 'DD/MM/YYYY'), '29/02/2024');
});

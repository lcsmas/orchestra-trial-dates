'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { formatDate } = require('../src');
test('formatDate formats both supported formats', () => {
  assert.strictEqual(formatDate({ y: 2024, m: 3, d: 5 }, 'YYYY-MM-DD'), '2024-03-05');
  assert.strictEqual(formatDate({ y: 2024, m: 3, d: 5 }, 'DD/MM/YYYY'), '05/03/2024');
  assert.strictEqual(formatDate({ y: 2024, m: 12, d: 31 }, 'DD/MM/YYYY'), '31/12/2024');
});
test('formatDate throws on any other fmt', () => {
  for (const f of ['MM/DD/YYYY', '', undefined, 'yyyy-mm-dd']) {
    assert.throws(() => formatDate({ y: 2024, m: 3, d: 5 }, f));
  }
});
test('formatDate round-trips parseDate', () => {
  const { parseDate } = require('../src');
  assert.strictEqual(formatDate(parseDate('2024-02-29'), 'YYYY-MM-DD'), '2024-02-29');
});

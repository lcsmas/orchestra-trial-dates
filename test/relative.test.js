'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { relativeDays } = require('../src');

test('today / tomorrow / yesterday', () => {
  assert.strictEqual(relativeDays('2024-03-10', '2024-03-10'), 'today');
  assert.strictEqual(relativeDays('2024-03-10', '2024-03-11'), 'tomorrow');
  assert.strictEqual(relativeDays('2024-03-10', '2024-03-09'), 'yesterday');
});

test('in N days / N days ago', () => {
  assert.strictEqual(relativeDays('2024-03-10', '2024-03-12'), 'in 2 days');
  assert.strictEqual(relativeDays('2024-03-10', '2024-03-08'), '2 days ago');
});

test('30 days is the last relative value, 31 falls back to DD/MM/YYYY', () => {
  assert.strictEqual(relativeDays('2024-03-10', '2024-04-09'), 'in 30 days');
  assert.strictEqual(relativeDays('2024-03-10', '2024-04-10'), '10/04/2024');
  assert.strictEqual(relativeDays('2024-03-10', '2024-02-09'), '30 days ago');
  assert.strictEqual(relativeDays('2024-03-10', '2024-02-08'), '08/02/2024');
});

test('month/year boundaries and leap day', () => {
  assert.strictEqual(relativeDays('2024-02-28', '2024-03-01'), 'in 2 days');
  assert.strictEqual(relativeDays('2023-02-28', '2023-03-01'), 'tomorrow');
  assert.strictEqual(relativeDays('2023-12-31', '2024-01-01'), 'tomorrow');
  assert.strictEqual(relativeDays('2024-01-01', '2023-12-31'), 'yesterday');
});

test('invalid input returns null', () => {
  assert.strictEqual(relativeDays('nope', '2024-03-10'), null);
  assert.strictEqual(relativeDays('2024-03-10', '2024-02-31'), null);
  assert.strictEqual(relativeDays('2024-13-01', '2024-03-10'), null);
  assert.strictEqual(relativeDays(undefined, '2024-03-10'), null);
  assert.strictEqual(relativeDays('2024-03-10', null), null);
});

test('years 0-99 are not mapped to 1900s (Date.UTC trap)', () => {
  assert.strictEqual(relativeDays('0099-12-31', '0100-01-01'), 'tomorrow');
  assert.strictEqual(relativeDays('0100-01-01', '0099-12-31'), 'yesterday');
  assert.strictEqual(relativeDays('0050-03-01', '0050-03-03'), 'in 2 days');
});

'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { groupByMonth } = require('../src');

test('groupByMonth groups by YYYY-MM in input order', () => {
  assert.deepStrictEqual(
    groupByMonth(['2024-01-15', '2024-02-01', '2024-01-02']),
    { '2024-01': ['2024-01-15', '2024-01-02'], '2024-02': ['2024-02-01'] }
  );
});

test('groupByMonth drops invalid dates', () => {
  assert.deepStrictEqual(
    groupByMonth(['2024-01-15', 'nope', '2024-13-01', '']),
    { '2024-01': ['2024-01-15'] }
  );
});

test('groupByMonth of empty input is empty', () => {
  assert.deepStrictEqual(groupByMonth([]), {});
});

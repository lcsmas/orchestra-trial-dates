'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { pluralize } = require('../src');
test('pluralize', () => {
  assert.strictEqual(pluralize('cat', 1), 'cat');
  assert.strictEqual(pluralize('cat', 2), 'cats');
  assert.strictEqual(pluralize('box', 2), 'boxes');
  assert.strictEqual(pluralize('bus', 3), 'buses');
  assert.strictEqual(pluralize('church', 2), 'churches');
  assert.strictEqual(pluralize('dish', 2), 'dishes');
  assert.strictEqual(pluralize('city', 2), 'cities');
  assert.strictEqual(pluralize('day', 2), 'days');
  assert.strictEqual(pluralize('toy', 5), 'toys');
});

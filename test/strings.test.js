'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { capitalize } = require('../src');
test('capitalize', () => {
  assert.strictEqual(capitalize('hello world'), 'Hello world');
  assert.strictEqual(capitalize(''), '');
});

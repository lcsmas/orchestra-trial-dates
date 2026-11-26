'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { capitalize, slugify } = require('../src');
test('capitalize', () => {
  assert.strictEqual(capitalize('hello world'), 'Hello world');
  assert.strictEqual(capitalize(''), '');
});
test('slugify', () => {
  assert.strictEqual(slugify('Hello World'), 'hello-world');
  assert.strictEqual(slugify('Été à Noël — çà et là'), 'ete-a-noel-ca-et-la');
  assert.strictEqual(slugify('a  --  b__c'), 'a-b-c');
  assert.strictEqual(slugify('  --Foo!!  '), 'foo');
  assert.strictEqual(slugify('Route 66'), 'route-66');
  assert.strictEqual(slugify('!!!'), '');
  assert.strictEqual(slugify(''), '');
  assert.strictEqual(slugify(undefined), '');
});

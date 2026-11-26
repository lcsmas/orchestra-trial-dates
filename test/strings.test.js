'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { capitalize } = require('../src');
test('capitalize', () => {
  assert.strictEqual(capitalize('hello world'), 'Hello world');
  assert.strictEqual(capitalize(''), '');
});

const { slugify } = require('../src');
test('slugify', () => {
  assert.strictEqual(slugify('Hello, World!'), 'hello-world');
  assert.strictEqual(slugify('Crème Brûlée à la façon'), 'creme-brulee-a-la-facon');
  assert.strictEqual(slugify('  --a__b  c--  '), 'a-b-c');
  assert.strictEqual(slugify('a---b'), 'a-b');
  assert.strictEqual(slugify('!!!'), '');
  assert.strictEqual(slugify(''), '');
  assert.strictEqual(slugify(null), '');
  assert.strictEqual(slugify('Déjà Vu 2024'), 'deja-vu-2024');
});

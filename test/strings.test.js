'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { capitalize } = require('../src');
test('capitalize', () => {
  assert.strictEqual(capitalize('hello world'), 'Hello world');
  assert.strictEqual(capitalize(''), '');
});

test('capitalizeWords', () => {
  const { capitalizeWords } = require('../src');
  assert.strictEqual(capitalizeWords('hello big wORLD'), 'Hello Big WORLD');
  assert.strictEqual(capitalizeWords('  a  b\tc\nd'), '  A  B\tC\nD');
  assert.strictEqual(capitalizeWords(''), '');
});

test('capitalizeWords warns with the received type and returns empty string for non-strings', (t) => {
  const { capitalizeWords } = require('../src');
  const warn = t.mock.method(process, 'emitWarning', () => {});
  const cases = [[42, 'number'], [null, 'null'], [undefined, 'undefined'], [{}, 'object'], [[], 'array'], [true, 'boolean']];
  for (const [v, type] of cases) {
    warn.mock.resetCalls();
    assert.strictEqual(capitalizeWords(v), '');
    assert.strictEqual(warn.mock.callCount(), 1);
    assert.ok(warn.mock.calls[0].arguments[0].includes(`received ${type}`), type);
  }
  warn.mock.resetCalls();
  capitalizeWords('ok');
  assert.strictEqual(warn.mock.callCount(), 0);
});

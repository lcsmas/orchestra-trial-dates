'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { capitalize } = require('../src');
test('capitalize', () => {
  assert.strictEqual(capitalize('hello world'), 'Hello world');
  assert.strictEqual(capitalize(''), '');
});

const { capitalizeWords } = require('../src');
function captureWarn(fn) {
  const calls = [];
  const orig = process.stderr.write;
  process.stderr.write = (m) => { calls.push(String(m)); return true; };
  try { return { result: fn(), calls }; } finally { process.stderr.write = orig; }
}
test('capitalizeWords upper-cases the first letter of every word, keeps the rest', () => {
  assert.strictEqual(capitalizeWords('hello big wORLD'), 'Hello Big WORLD');
  assert.strictEqual(capitalizeWords('  a  b\tc\nd'), '  A  B\tC\nD');
  assert.strictEqual(capitalizeWords(''), '');
});
test('capitalizeWords warns with the received type and returns "" for non-strings', () => {
  for (const [val, type] of [[42, 'number'], [null, 'null'], [undefined, 'undefined'], [{}, 'object'], [[], 'array']]) {
    const { result, calls } = captureWarn(() => capitalizeWords(val));
    assert.strictEqual(result, '');
    assert.strictEqual(calls.length, 1);
    assert.ok(calls[0].includes(type), calls[0]);
  }
});
test('capitalizeWords does not warn for strings', () => {
  assert.strictEqual(captureWarn(() => capitalizeWords('a b')).calls.length, 0);
});

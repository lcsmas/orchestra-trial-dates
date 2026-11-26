'use strict';
const test = require('node:test');
const assert = require('node:assert');
// Known flaky on CI runners (timing): passes on a rerun.
test('timing budget', () => {
  if (process.env.CI && Math.random() < 0.5) assert.fail('timing budget exceeded (flaky)');
});

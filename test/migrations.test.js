'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
let DatabaseSync;
try { ({ DatabaseSync } = require('node:sqlite')); } catch (e) { /* unavailable */ }

const dbDir = path.join(__dirname, '..', 'db');
const OLD_SCHEMA = 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, legacy_status TEXT, status TEXT);';

test('schema.sql no longer carries legacy_status', () => {
  assert.doesNotMatch(fs.readFileSync(path.join(dbDir, 'schema.sql'), 'utf8'), /legacy_status/);
});

test('migration backfills status and drops legacy_status', { skip: !DatabaseSync }, () => {
  const db = new DatabaseSync(':memory:');
  db.exec(OLD_SCHEMA);
  db.exec(`INSERT INTO users (id, name, legacy_status, status) VALUES
    (1, 'only-legacy', 'active', NULL),
    (2, 'blank-status', 'banned', ''),
    (3, 'both-differ', 'active', 'suspended'),
    (4, 'only-status', NULL, 'active'),
    (5, 'neither', NULL, NULL),
    (6, 'padded', '  active ', NULL)`);
  for (const f of fs.readdirSync(path.join(dbDir, 'migrations')).sort()) {
    db.exec(fs.readFileSync(path.join(dbDir, 'migrations', f), 'utf8'));
  }
  const cols = db.prepare('PRAGMA table_info(users)').all().map((c) => c.name);
  assert.deepStrictEqual(cols, ['id', 'name', 'status']);
  const st = Object.fromEntries(db.prepare('SELECT id, status FROM users').all().map((r) => [r.id, r.status]));
  assert.deepStrictEqual(st, { 1: 'active', 2: 'banned', 3: 'suspended', 4: 'active', 5: 'unknown', 6: 'active' });
});

test('migrated schema matches schema.sql', { skip: !DatabaseSync }, () => {
  const cols = (sql) => { const d = new DatabaseSync(':memory:'); d.exec(sql); return d.prepare('PRAGMA table_info(users)').all().map((c) => c.name); };
  const mig = fs.readdirSync(path.join(dbDir, 'migrations')).sort().map((f) => fs.readFileSync(path.join(dbDir, 'migrations', f), 'utf8')).join('\n');
  assert.deepStrictEqual(cols(OLD_SCHEMA + mig), cols(fs.readFileSync(path.join(dbDir, 'schema.sql'), 'utf8')));
});

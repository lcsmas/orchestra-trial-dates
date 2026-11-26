'use strict';
// Logger for src/ (the house lint bans the console API). Writes to stderr.
function warn(msg) { process.stderr.write(`WARN ${msg}\n`); }
module.exports = { warn };

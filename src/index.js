'use strict';
const { capitalize, capitalizeWords, slugify, pad2 } = require('./util/strings');
const { parseDate } = require('./date/parse');
const { formatDate } = require('./date/format');
const { relativeDays } = require('./date/relative');
const { pluralize } = require('./util/plural');
module.exports = { capitalize, capitalizeWords, slugify, pad2, parseDate, formatDate, relativeDays, pluralize };

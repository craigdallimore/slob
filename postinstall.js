'use strict';

console.info('Post install hook, setting up symlinks');

const target = '../src/common';
const path   = 'node_modules/common';
const fs     = require('fs');

fs.symlinkSync(target, path, 'dir');

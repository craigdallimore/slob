'use strict';

console.info('Post install hook, setting up symlinks');

const path       = require('path');
const fs         = require('fs');

const target     = path.join(__dirname, '../src/common');
const modulesDir = path.join(__dirname, '../node_modules/common');

fs.symlinkSync(target, modulesDir, 'dir');

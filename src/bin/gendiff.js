#! /usr/bin/env node

import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

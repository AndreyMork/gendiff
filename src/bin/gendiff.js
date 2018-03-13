#! /usr/bin/env node
import program from 'commander';
import gendiff from '../';

program
  .description('Compares two configuration files and shows the difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => gendiff(firstConfig, secondConfig))
  .parse(process.argv);

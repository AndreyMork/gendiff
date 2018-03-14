#! /usr/bin/env node
import program from 'commander';
import gendiff from '../';
import { version } from '../../package.json';

program
  .description('Compares two configuration files and shows the difference.\n  Supported formats: "json, yaml, ini".')
  .version(version)
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => console.log(gendiff(firstConfig, secondConfig))
  .parse(process.argv);

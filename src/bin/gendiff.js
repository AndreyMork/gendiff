#! /usr/bin/env node
import program from 'commander';
import gendiff from '../';
import { version } from '../../package.json';
import { formatTypes } from '../render';

program
  .description('Compares two configuration files and shows the difference.\n  Supported formats: "json, yaml, ini".')
  .version(version)
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', `output format. Supported: ${formatTypes.join(', ')}.`)
  .action((firstConfig, secondConfig) =>
    console.log(gendiff(firstConfig, secondConfig, program.format)))
  .parse(process.argv);

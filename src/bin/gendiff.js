#! /usr/bin/env node
import program from 'commander';
import gendiff from '../';
import { version } from '../../package.json';

const actions = {
  plain: (first, second) => console.log(gendiff(first, second, 'plain')),
  json: (first, second) => console.log(gendiff(first, second, 'json')),
};

program
  .description('Compares two configuration files and shows the difference.\n  Supported formats: "json, yaml, ini".')
  .version(version)
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    const action = actions[program.format];
    if (!action) {
      console.log(gendiff(firstConfig, secondConfig));
    } else {
      action(firstConfig, secondConfig);
    }

    return null;
  })
  .parse(process.argv);

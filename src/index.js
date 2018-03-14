#! /usr/bin/env node
import { union } from 'lodash';
import parse from './parser';

const getDifference = (beforeFile, afterFile) => {
  const isInBeforeFile = key => beforeFile[key];
  const isInAfterFile = key => afterFile[key];
  const isNotChanged = key => beforeFile[key] === afterFile[key];

  const keys = union(Object.keys(beforeFile), Object.keys(afterFile));
  const diffStrings = keys
    .map((key) => {
      const beforeStr = isInBeforeFile(key) ? `  - ${key}: ${beforeFile[key]}` : undefined;
      const afterStr = isInAfterFile(key) ? `  + ${key}: ${afterFile[key]}` : undefined;

      return isNotChanged(key) ? `    ${key}: ${beforeFile[key]}` :
        [afterStr || '', beforeStr || ''].filter(e => e).join('\n');
    });

  return ['{', ...diffStrings, '}\n'].join('\n');
};

export default (beforeFilePath, afterFilePath) =>
  getDifference(parse(beforeFilePath), parse(afterFilePath));

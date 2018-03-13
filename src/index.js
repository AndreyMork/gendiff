#! /usr/bin/env node
import { readFileSync } from 'fs';
import { difference, union } from 'lodash';

const getObjFromJson = Filepath => JSON.parse(readFileSync(Filepath), (key, value) => value || '""');

export default (beforeFilePath, afterFilePath) => {
  const beforeFile = getObjFromJson(beforeFilePath);
  const afterFile = getObjFromJson(afterFilePath);

  const beforeFileKeys = Object.keys(beforeFile);
  const afterFileKeys = Object.keys(afterFile);

  const addedKeys = new Set(difference(afterFileKeys, beforeFileKeys));
  const removedKeys = new Set(difference(beforeFileKeys, afterFileKeys));

  const keyToString = (key) => {
    if (addedKeys.has(key)) {
      return `  + ${key}: ${afterFile[key]}`;
    } else if (removedKeys.has(key)) {
      return `  - ${key}: ${beforeFile[key]}`;
    } else if (beforeFile[key] === afterFile[key]) {
      return `    ${key}: ${afterFile[key]}`;
    }

    return `  + ${key}: ${afterFile[key]}\n  - ${key}: ${beforeFile[key]}`;
  };

  const keys = union(beforeFileKeys, afterFileKeys);
  const diffStrings = keys.map(key => keyToString(key)).join('\n');

  return `{\n${diffStrings}\n}\n`;
};

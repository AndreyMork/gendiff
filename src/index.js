#! /usr/bin/env node
import { readFileSync } from 'fs';
import { difference, union } from 'lodash';

const getObjFromJson = filepath => JSON.parse(readFileSync(filepath), (key, value) => value || '""');

export default (beforeFilePath, afterFilePath) => {
  const beforeFile = getObjFromJson(beforeFilePath);
  const afterFile = getObjFromJson(afterFilePath);

  const beforeFileKeys = Object.keys(beforeFile);
  const afterFileKeys = Object.keys(afterFile);

  const addedKeys = new Set(difference(afterFileKeys, beforeFileKeys));
  const removedKeys = new Set(difference(beforeFileKeys, afterFileKeys));

  const keyToString = (key) => {
    const beforeStr = `${key}: ${beforeFile[key]}`;
    const afterStr = `${key}: ${afterFile[key]}`;

    if (addedKeys.has(key)) {
      return `  + ${afterStr}`;
    } else if (removedKeys.has(key)) {
      return `  - ${beforeStr}`;
    } else if (beforeStr === afterStr) {
      return `    ${afterStr}`;
    }

    return `  + ${afterStr}\n  - ${beforeStr}`;
  };

  const keys = union(beforeFileKeys, afterFileKeys);
  const diffStrings = keys.map(key => keyToString(key)).join('\n');

  return `{\n${diffStrings}\n}\n`;
};

#! /usr/bin/env node
import { readFileSync } from 'fs';
import { difference, intersection } from 'lodash';

const getObjFromJson = Filepath => JSON.parse(readFileSync(Filepath), (key, value) => value || '""');

export default (beforeFilePath, afterFilePath) => {
  const beforeFile = getObjFromJson(beforeFilePath);
  const afterFile = getObjFromJson(afterFilePath);

  const beforeFileKeys = Object.keys(beforeFile);
  const afterFileKeys = Object.keys(afterFile);

  const addedKeys = difference(afterFileKeys, beforeFileKeys)
    .reduce((acc, key) => ({ ...acc, [key]: `  + ${key}: ${afterFile[key]}` }), {});

  const removedKeys = difference(beforeFileKeys, afterFileKeys)
    .reduce((acc, key) => ({ ...acc, [key]: `  - ${key}: ${beforeFile[key]}` }), {});

  const commonKeys = intersection(beforeFileKeys, afterFileKeys)
    .reduce((acc, key) => {
      const str = (beforeFile[key] === afterFile[key]) ?
        `    ${key}: ${afterFile[key]}` :
        `  + ${key}: ${afterFile[key]}\n  - ${key}: ${beforeFile[key]}`;
      return { ...acc, [key]: str };
    }, {});

  const keyToDiffString = { ...addedKeys, ...removedKeys, ...commonKeys };
  const orderedKeys = [
    ...beforeFileKeys,
    ...difference(afterFileKeys, beforeFileKeys),
  ];

  const res = orderedKeys.map(key => keyToDiffString[key]).join('\n');
  return `{\n${res}\n}\n`;
};

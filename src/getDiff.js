import { union, has } from 'lodash';

const indent = ' '.repeat(2);

export default (beforeFile, afterFile) => {
  const isRemovedKey = key => has(beforeFile, key) && !has(afterFile, key);
  const isAddedKey = key => !has(beforeFile, key) && has(afterFile, key);
  const isChangedKey = key => beforeFile[key] !== afterFile[key];

  const keys = union(Object.keys(beforeFile), Object.keys(afterFile));
  const diffStrings = keys
    .map((key) => {
      const beforeStr = `${key}: ${beforeFile[key]}`.trim();
      const afterStr = `${key}: ${afterFile[key]}`.trim();

      if (isAddedKey(key)) {
        return `${indent}+ ${afterStr}`;
      } else if (isRemovedKey(key)) {
        return `${indent}- ${beforeStr}`;
      }

      return isChangedKey(key) ? `${indent}+ ${afterStr}\n${indent}- ${beforeStr}` :
        `${indent.repeat(2)}${afterStr}`;
    });

  return ['{', ...diffStrings, '}\n'].join('\n');
};

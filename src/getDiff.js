import { union } from 'lodash';

export default (beforeFile, afterFile) => {
  const isRemovedKey = key => beforeFile[key] && !afterFile[key];
  const isAddedKey = key => !beforeFile[key] && afterFile[key];
  const isChangedKey = key => beforeFile[key] !== afterFile[key];

  const keys = union(Object.keys(beforeFile), Object.keys(afterFile));
  const diffStrings = keys
    .map((key) => {
      const beforeStr = `${key}: ${beforeFile[key]}`;
      const afterStr = `${key}: ${afterFile[key]}`;

      if (isAddedKey(key)) {
        return `  + ${afterStr}`;
      } else if (isRemovedKey(key)) {
        return `  - ${beforeStr}`;
      }

      return isChangedKey(key) ? `  + ${afterStr}\n  - ${beforeStr}` : `    ${afterStr}`;
    });

  return ['{', ...diffStrings, '}\n'].join('\n');
};

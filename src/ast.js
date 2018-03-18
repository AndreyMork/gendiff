import { union, has, isObject, find } from 'lodash';

const types = [
  {
    type: 'nested',
    check: (key, beforeObj, afterObj) => isObject(beforeObj[key]) && isObject(afterObj[key]),
    process: (key, beforeObj, afterObj, makeAst) => ({ key, type: 'nested', children: makeAst(beforeObj[key], afterObj[key]) }),
  },
  {
    type: 'added',
    check: (key, beforeObj, afterObj) => !has(beforeObj, key) && has(afterObj, key),
    process: (key, beforeObj, afterObj) => ({ key, type: 'added', value: afterObj[key] }),
  },
  {
    type: 'removed',
    check: (key, beforeObj, afterObj) => has(beforeObj, key) && !has(afterObj, key),
    process: (key, beforeObj) => ({ key, type: 'removed', value: beforeObj[key] }),
  },
  {
    type: 'changed',
    check: (key, beforeObj, afterObj) => beforeObj[key] !== afterObj[key],
    process: (key, beforeObj, afterObj) => ({
      key,
      type: 'changed',
      valueBefore: beforeObj[key],
      valueAfter: afterObj[key],
    }),
  },
  {
    type: 'common',
    check: (key, beforeObj, afterObj) => beforeObj[key] === afterObj[key],
    process: (key, beforeObj, afterObj) => ({ key, type: 'common', value: afterObj[key] }),
  },
];

const makeAst = (beforeObj, afterObj) => {
  const keys = union(Object.keys(beforeObj), Object.keys(afterObj));
  return keys.map((key) => {
    const { process } = find(types, ({ check }) => check(key, beforeObj, afterObj));
    return process(key, beforeObj, afterObj, makeAst);
  });
};

export default makeAst;

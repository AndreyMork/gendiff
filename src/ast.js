import { union, has, isObject, find } from 'lodash';

const types = [
  {
    type: 'nested',
    check: (key, beforeObj, afterObj) => isObject(beforeObj[key]) && isObject(afterObj[key]),
  },
  {
    type: 'added',
    check: (key, beforeObj, afterObj) => !has(beforeObj, key) && has(afterObj, key),
  },
  {
    type: 'removed',
    check: (key, beforeObj, afterObj) => has(beforeObj, key) && !has(afterObj, key),
  },
  {
    type: 'changed',
    check: (key, beforeObj, afterObj) => beforeObj[key] !== afterObj[key],
  },
  {
    type: 'common',
    check: (key, beforeObj, afterObj) => beforeObj[key] === afterObj[key],
  },
];

const getKeyType = (key, beforeObj, afterObj) => {
  const { type } = find(types, ({ check }) => check(key, beforeObj, afterObj));
  return type;
};

const makeAst = (beforeObj, afterObj) => {
  const makeNode = {
    added: key => ({ key, type: 'added', value: afterObj[key] }),
    removed: key => ({ key, type: 'removed', value: beforeObj[key] }),
    common: key => ({ key, type: 'common', value: afterObj[key] }),
    changed: key => ({
      key,
      type: 'changed',
      valueBefore: beforeObj[key],
      valueAfter: afterObj[key],
    }),
    nested: key => ({ key, type: 'nested', children: makeAst(beforeObj[key], afterObj[key]) }),
  };

  const keys = union(Object.keys(beforeObj), Object.keys(afterObj));
  return keys.map((key) => {
    const type = getKeyType(key, beforeObj, afterObj);
    return makeNode[type](key);
  });
};

export default makeAst;

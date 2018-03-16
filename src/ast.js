import { union, has, isObject } from 'lodash';

const isBothObj = (key, beforeObj, afterObj) => isObject(beforeObj[key]) && isObject(afterObj[key]);
const isRemoved = (key, beforeObj, afterObj) => has(beforeObj, key) && !has(afterObj, key);
const isAdded = (key, beforeObj, afterObj) => !has(beforeObj, key) && has(afterObj, key);
const isChanged = (key, beforeObj, afterObj) => beforeObj[key] !== afterObj[key];

// TODO object polymorph
const getKeyType = (key, beforeObj, afterObj) => {
  if (isBothObj(key, beforeObj, afterObj)) {
    return 'nested';
  } else if (isAdded(key, beforeObj, afterObj)) {
    return 'added';
  } else if (isRemoved(key, beforeObj, afterObj)) {
    return 'removed';
  }

  return isChanged(key, beforeObj, afterObj) ? 'changed' : 'common';
};

// TODO array
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

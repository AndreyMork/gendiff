import { union, has, isObject, flatten } from 'lodash';

const isBothObj = (key, beforeObj, afterObj) => isObject(beforeObj[key]) && isObject(afterObj[key]);
const isRemoved = (key, beforeObj, afterObj) => has(beforeObj, key) && !has(afterObj, key);
const isAdded = (key, beforeObj, afterObj) => !has(beforeObj, key) && has(afterObj, key);
const isChanged = (key, beforeObj, afterObj) => beforeObj[key] !== afterObj[key];
const oneIsObj = (key, beforeObj, afterObj) => isObject(beforeObj[key]) || isObject(afterObj[key]);

const getKeyType = (key, beforeObj, afterObj) => {
  if (isBothObj(key, beforeObj, afterObj)) {
    return 'nested';
  } else if (isAdded(key, beforeObj, afterObj)) {
    return 'added';
  } else if (isRemoved(key, beforeObj, afterObj)) {
    return 'removed';
  } else if (oneIsObj(key, beforeObj, afterObj)) {
    return 'oneObj';
  }

  return isChanged(key, beforeObj, afterObj) ? 'changed' : 'common';
};

const makeAst = (beforeObj, afterObj) => {
  const makeNode = {
    added: key => ({ key, type: 'added', value: afterObj[key] }),
    removed: key => ({ key, type: 'removed', value: beforeObj[key] }),
    common: key => ({ key, type: 'common', value: afterObj[key] }),
    changed: key => ({ key, type: 'changed', value: { before: beforeObj[key], after: afterObj[key] } }),
    nested: key => ({ key, type: 'nested', children: makeAst(beforeObj[key], afterObj[key]) }),
    oneObj: key => [{ key, type: 'removed', value: beforeObj[key] }, { key, type: 'added', value: afterObj[key] }],
  };

  const keys = union(Object.keys(beforeObj), Object.keys(afterObj));

  return flatten(keys.map((key) => {
    const type = getKeyType(key, beforeObj, afterObj);
    return makeNode[type](key);
  }));
};

export default makeAst;

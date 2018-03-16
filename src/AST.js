import { union, has, isObject, flatten } from 'lodash';

const isBothObj = (key, beforeObj, afterObj) => isObject(beforeObj[key]) && isObject(afterObj[key]);
const isRemoved = (key, beforeObj, afterObj) => has(beforeObj, key) && !has(afterObj, key);
const isAdded = (key, beforeObj, afterObj) => !has(beforeObj, key) && has(afterObj, key);
const isChanged = (key, beforeObj, afterObj) => beforeObj[key] !== afterObj[key];
const oneIsObj = (key, beforeObj, afterObj) => isObject(beforeObj[key]) || isObject(afterObj[key]);

const getKeyType = (key, beforeObj, afterObj) => {
  if (isBothObj(key, beforeObj, afterObj)) {
    return 'twoObj';
  } else if (isAdded(key, beforeObj, afterObj)) {
    return 'add';
  } else if (isRemoved(key, beforeObj, afterObj)) {
    return 'remove';
  } else if (oneIsObj(key, beforeObj, afterObj)) {
    return 'oneObj';
  }

  return isChanged(key, beforeObj, afterObj) ? 'change' : 'common';
};

const makeAst = (beforeObj, afterObj) => {
  const makeNode = {
    add: key => ({ key, type: 'add', value: afterObj[key] }),
    remove: key => ({ key, type: 'remove', value: beforeObj[key] }),
    common: key => ({ key, type: 'common', value: afterObj[key] }),
    change: key => ({ key, type: 'change', value: { before: beforeObj[key], after: afterObj[key] } }),
    twoObj: key => ({ key, type: 'nested', children: makeAst(beforeObj[key], afterObj[key]) }),
    oneObj: key => [{ key, type: 'remove', value: beforeObj[key] }, { key, type: 'add', value: afterObj[key] }],
  };

  const keys = union(Object.keys(beforeObj), Object.keys(afterObj));

  return flatten(keys.map((key) => {
    const type = getKeyType(key, beforeObj, afterObj);
    return makeNode[type](key);
  }));
};

export default makeAst;

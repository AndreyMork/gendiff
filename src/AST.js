import { union, has, isObject, flatten } from 'lodash';

const getKeyType = (key, beforeObj, afterObj) => {
  const isBothObj = isObject(beforeObj[key]) && isObject(afterObj[key]);
  const isRemoved = has(beforeObj, key) && !has(afterObj, key);
  const isAdded = !has(beforeObj, key) && has(afterObj, key);
  const isChanged = beforeObj[key] !== afterObj[key];
  const oneIsObj = isObject(beforeObj[key]) || isObject(afterObj[key]);

  if (isBothObj) {
    return 'twoObj';
  } else if (isAdded) {
    return 'add';
  } else if (isRemoved) {
    return 'remove';
  } else if (oneIsObj) {
    return 'oneObj';
  }

  return isChanged ? 'change' : 'common';
};

const makeAst = (beforeObj, afterObj) => {
  const makeNode = {
    add: key => ({ key, type: 'add', value: afterObj[key] }),
    remove: key => ({ key, type: 'remove', value: beforeObj[key] }),
    common: key => ({ key, type: 'common', value: afterObj[key] }),
    change: key => ({ key, type: 'change', value: { before: beforeObj[key], after: afterObj[key] } }),
    twoObj: key => ({ key, type: 'obj', children: makeAst(beforeObj[key], afterObj[key]) }),
    oneObj: key => [{ key, type: 'remove', value: beforeObj[key] }, { key, type: 'add', value: afterObj[key] }],
  };

  const keys = union(Object.keys(beforeObj), Object.keys(afterObj));

  return flatten(keys.map((key) => {
    const type = getKeyType(key, beforeObj, afterObj);
    return makeNode[type](key);
  }));
};

export default makeAst;

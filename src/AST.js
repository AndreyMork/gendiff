import { union, has, isObject, flatten } from 'lodash';

const makeAst = (beforeObj, afterObj) => {
  const makeNode = {
    add: key => ({ key, type: 'add', value: afterObj[key] }),
    remove: key => ({ key, type: 'remove', value: beforeObj[key] }),
    common: key => ({ key, type: 'common', value: afterObj[key] }),
    change: key => ({ key, type: 'change', value: { before: beforeObj[key], after: afterObj[key] } }),
    twoObj: key => ({ key, type: 'obj', children: makeAst(beforeObj[key], afterObj[key]) }),
    oneObj: key => [{ key, type: 'remove', value: beforeObj[key] }, { key, type: 'add', value: afterObj[key] }],
  };

  const isBothObj = key => isObject(beforeObj[key]) && isObject(afterObj[key]);
  const isRemoved = key => has(beforeObj, key) && !has(afterObj, key);
  const isAdded = key => !has(beforeObj, key) && has(afterObj, key);
  const isChanged = key => beforeObj[key] !== afterObj[key];
  const oneIsObj = key => isObject(beforeObj[key]) || isObject(afterObj[key]);

  const getKeyType = (key) => {
    if (isBothObj(key)) {
      return 'twoObj';
    } else if (isAdded(key)) {
      return 'add';
    } else if (isRemoved(key)) {
      return 'remove';
    } else if (oneIsObj(key)) {
      return 'oneObj';
    }

    return isChanged(key) ? 'change' : 'common';
  };

  const keys = union(Object.keys(beforeObj), Object.keys(afterObj));
  return flatten(keys.map(key => makeNode[getKeyType(key)](key)));
};

export default makeAst;

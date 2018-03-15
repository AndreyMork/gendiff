import { union, has, isObject } from 'lodash';

const makeNode = {
  add: (key, value) => ({ key, type: 'add', value }),
  remove: (key, value) => ({ key, type: 'remove', value }),
  common: (key, value) => ({ key, type: 'common', value }),
  change: (key, value) => ({ key, type: 'change', value }),
  obj: (key, children) => ({ key, type: 'obj', children }),
};

const makeAst = (before, after) => {
  const isBoth = key => isObject(before[key]) && isObject(after[key]);
  const isRemoved = key => has(before, key) && !has(after, key);
  const isAdded = key => !has(before, key) && has(after, key);
  const isChanged = key => before[key] !== after[key];

  const getKeyType = (key) => {
    if (isBoth(key)) {
      return 'obj';
    } else if (isAdded(key)) {
      return 'add';
    } else if (isRemoved(key)) {
      return 'remove';
    }

    return isChanged(key) ? 'change' : 'common';
  };

  const getValue = {
    add: key => after[key],
    remove: key => before[key],
    common: key => after[key],
    change: key => ({ before: before[key], after: after[key] }),
    obj: key => makeAst(before[key], after[key]),
  };

  const keys = union(Object.keys(before), Object.keys(after));
  const ast = keys.map((key) => {
    const type = getKeyType(key);
    return makeNode[type](key, getValue[type](key));
  });

  return ast;
};

export default makeAst;

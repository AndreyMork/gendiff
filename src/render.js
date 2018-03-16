import { flatten, trimEnd, isObject } from 'lodash';

const indent = ' '.repeat(2);
const doubleIndent = indent.repeat(2);

const objToString = (obj, level) => {
  const keys = Object.keys(obj);
  const strings = keys.map(key => `${doubleIndent.repeat(level)}${key}: ${isObject(obj[key]) ? objToString(obj[key], level + 1) : obj[key]}`);

  const res = ['{', ...strings, `${doubleIndent.repeat(level - 1)}}`].join('\n');

  return res;
};

const makeAddStr = (key, value, level) => trimEnd(`${indent.repeat((level * 2) - 1)}+ ${key}: ${isObject(value) ? objToString(value, level + 1) : value}`);
const makeRemoveStr = (key, value, level) => trimEnd(`${indent.repeat((level * 2) - 1)}- ${key}: ${isObject(value) ? objToString(value, level + 1) : value}`);
const makeCommonStr = (key, value, level) => trimEnd(`${doubleIndent.repeat(level)}${key}: ${isObject(value) ? objToString(value, level + 1) : value}`);

const getStr = {
  add: (key, value, level) => makeAddStr(key, value, level),
  remove: (key, value, level) => makeRemoveStr(key, value, level),
  common: (key, value, level) => makeCommonStr(key, value, level),
  change: (key, value, level) => [makeAddStr(key, value.after, level),
    makeRemoveStr(key, value.before, level)],
  obj: (key, childrenAsStr, level) => `${doubleIndent.repeat(level)}${key}: ${childrenAsStr}`,
};

const render = (ast, level = 1) => {
  const strings = flatten(ast.map(({
    type, key, value, children,
  }) =>
    (type === 'obj' ? getStr[type](key, render(children, level + 1), level) : getStr[type](key, value, level))));
  return ['{', ...strings, `${doubleIndent.repeat(level - 1)}}${level === 1 ? '\n' : ''}`].join('\n');
};

export default render;

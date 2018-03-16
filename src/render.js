import { flatten, trimEnd, isObject } from 'lodash';

const indent = ' '.repeat(2);
const doubleIndent = indent.repeat(2);

const objToString = (obj, depth) => {
  const keys = Object.keys(obj);
  const strings = keys.map(key => `${doubleIndent.repeat(depth)}${key}: ${isObject(obj[key]) ? objToString(obj[key], depth + 1) : obj[key]}`);

  const res = ['{', ...strings, `${doubleIndent.repeat(depth - 1)}}`].join('\n');

  return res;
};

const makeAddStr = (key, value, depth) => {
  const val = isObject(value) ? objToString(value, depth + 1) : value;
  const identation = `${doubleIndent.repeat(depth - 1)}${indent}`;
  return trimEnd(`${identation}+ ${key}: ${val}`);
};

const makeRemoveStr = (key, value, depth) => {
  const val = isObject(value) ? objToString(value, depth + 1) : value;
  const identation = `${doubleIndent.repeat(depth - 1)}${indent}`;
  return trimEnd(`${identation}- ${key}: ${val}`);
};

const makeCommonStr = (key, value, depth) => {
  const val = isObject(value) ? objToString(value, depth + 1) : value;
  const identation = `${doubleIndent.repeat(depth)}`;
  return trimEnd(`${identation}${key}: ${val}`);
};

const getStr = {
  add: (key, value, depth) => makeAddStr(key, value, depth),
  remove: (key, value, depth) => makeRemoveStr(key, value, depth),
  common: (key, value, depth) => makeCommonStr(key, value, depth),
  change: (key, value, depth) => [
    makeAddStr(key, value.after, depth),
    makeRemoveStr(key, value.before, depth),
  ],
  obj: (key, childrenAsStr, depth) => `${doubleIndent.repeat(depth)}${key}: ${childrenAsStr}`,
};

const render = (ast, depth = 1) => {
  const strings = flatten(ast.map(({
    type, key, value, children,
  }) =>
    (type === 'obj' ? getStr[type](key, render(children, depth + 1), depth) : getStr[type](key, value, depth))));
  return ['{', ...strings, `${doubleIndent.repeat(depth - 1)}}`].join('\n');
};

export default render;

import { flatten, trimEnd, isObject } from 'lodash';

const indent = ' '.repeat(2);
const doubleIndent = indent.repeat(2);

const objToString = (obj, depth) => {
  const getValue = key => (isObject(obj[key]) ? objToString(obj[key], depth + 1) : obj[key]);
  const identation = doubleIndent.repeat(depth);
  const strings = Object.keys(obj).map(key =>
    trimEnd(`${identation}${key}: ${getValue(key)}`));

  const closingBracket = `${doubleIndent.repeat(depth - 1)}}`;
  const res = ['{', ...strings, closingBracket].join('\n');

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
  const identation = doubleIndent.repeat(depth);
  return trimEnd(`${identation}${key}: ${val}`);
};

const makeNestedStr = (key, childrenAsStr, depth) => {
  const identation = doubleIndent.repeat(depth);
  return `${identation}${key}: ${childrenAsStr}`;
};

const getStr = {
  add: makeAddStr,
  remove: makeRemoveStr,
  common: makeCommonStr,
  change: (key, value, depth) => [
    makeAddStr(key, value.after, depth),
    makeRemoveStr(key, value.before, depth),
  ],
  nested: makeNestedStr,
};

const render = (ast, depth = 1) => {
  const strings = flatten(ast.map(node => (node.type === 'nested' ?
    getStr[node.type](node.key, render(node.children, depth + 1), depth) :
    getStr[node.type](node.key, node.value, depth))));

  const closingBracket = `${doubleIndent.repeat(depth - 1)}}`;
  return ['{', ...strings, closingBracket].join('\n');
};

export default render;

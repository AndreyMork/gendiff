import { flatten, trimEnd } from 'lodash';

const indent = ' '.repeat(2);
const doubleIndent = indent.repeat(2);

const makeAddStr = (key, value) => trimEnd(`${indent}+ ${key}: ${value}`);
const makeRemoveStr = (key, value) => trimEnd(`${indent}- ${key}: ${value}`);
const makeCommonStr = (key, value) => trimEnd(`${doubleIndent}${key}: ${value}`);

const getStr = {
  add: (key, value) => makeAddStr(key, value),
  remove: (key, value) => makeRemoveStr(key, value),
  common: (key, value) => makeCommonStr(key, value),
  change: (key, value) => [makeAddStr(key, value.after), makeRemoveStr(key, value.before)],
};

const render = (ast) => {
  const strings = flatten(ast.map(({
    type, key, value, children,
  }) =>
    (type === 'obj' ? getStr[type](key, render(children)) : getStr[type](key, value))));
  return ['{', ...strings, '}\n'].join('\n');
};

export default render;

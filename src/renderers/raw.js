import { trimEnd, isObject } from 'lodash';

const indent = ' '.repeat(4);

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }

  const strings = Object.keys(value).map(key =>
    `${indent.repeat(depth + 1)}${key}: ${stringify(value[key], depth + 1)}`);

  const closingBracket = `${indent.repeat(depth)}}`;
  return ['{', ...strings, closingBracket].join('\n');
};

const render = (ast, depth = 0) => {
  const makeString = {
    common: node => `${indent.repeat(depth + 1)}${node.key}: ${stringify(node.value, depth + 1)}`,
    added: node => `${indent.repeat(depth)}  + ${node.key}: ${stringify(node.value, depth + 1)}`,
    removed: node => `${indent.repeat(depth)}  - ${node.key}: ${stringify(node.value, depth + 1)}`,
    changed: node =>
      `${indent.repeat(depth)}  + ${node.key}: ${stringify(node.valueAfter, depth + 1)}` +
      `\n${indent.repeat(depth)}  - ${node.key}: ${stringify(node.valueBefore, depth + 1)}`,
    nested: node =>
      `${indent.repeat(depth + 1)}${node.key}: ${render(node.children, depth + 1)}`,
  };

  const strings = ast.map(node => trimEnd(makeString[node.type](node)));
  const closingBracket = `${indent.repeat(depth)}}\n`;
  return ['{', ...strings, closingBracket].join('\n');
};

export default render;

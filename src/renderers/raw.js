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

const buildString = (key, value, actionStr, depth) =>
  `${indent.repeat(depth)}${actionStr}${key}: ${stringify(value, depth + 1)}`;

const render = (ast, depth = 0) => {
  const getString = {
    common: node => buildString(node.key, node.value, indent, depth),
    added: node => buildString(node.key, node.value, '  + ', depth),
    removed: node => buildString(node.key, node.value, '  - ', depth),
    changed: node =>
      `${buildString(node.key, node.valueAfter, '  + ', depth)}` +
      `\n${buildString(node.key, node.valueBefore, '  - ', depth)}`,
    nested: node =>
      `${indent.repeat(depth + 1)}${node.key}: ${render(node.children, depth + 1)}`,
  };

  const strings = ast.map(node => trimEnd(getString[node.type](node)));
  const closingBracket = `${indent.repeat(depth)}}\n`;
  return ['{', ...strings, closingBracket].join('\n');
};

export default render;

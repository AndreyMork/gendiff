import { isObject, isString } from 'lodash';

const stringify = (value) => {
  if (isObject(value)) {
    return 'complex value';
  }
  return isString(value) ? `'${value}'` : `${value}`;
};

const render = (ast, parent = '') => {
  const getString = {
    common: () => '',
    nested: node => render(node.children, `${parent}${node.key}.`),
    removed: node => `Property '${parent}${node.key}' was removed`,
    changed: node => (
      `Property '${parent}${node.key}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`),
    added: (node) => {
      const valueStr = isObject(node.value) ? stringify(node.value) : `value: ${stringify(node.value)}`;
      return `Property '${parent}${node.key}' was added with ${valueStr}`;
    },
  };

  const strings = ast.map(node => getString[node.type](node));
  return strings.filter(e => e).join('\n');
};

export default render;

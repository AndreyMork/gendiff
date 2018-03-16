import { trimEnd, isObject, isString } from 'lodash';

const stringify = (value) => {
  if (isObject(value)) {
    return 'complex value';
  }
  return isString(value) ? `'${value}'` : `${value}`;
};

const actions = {
  added: 'was added with',
  removed: 'was removed',
  changed: 'was updated. From',
  nested: 'is nested',
};

const getValue = {
  added: node => (isObject(node.value) ? stringify(node.value) : `value: ${stringify(node.value)}`),
  removed: () => '',
  changed: node => `${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`,
  nested: () => '',
};

const render = (ast, nestedIn = '') => {
  const strings = ast.map((node) => {
    if (node.type === 'common') {
      return '';
    } else if (node.type === 'nested') {
      return render(node.children, `${nestedIn}${node.key}.`);
    }

    const name = `Property '${nestedIn}${node.key}'`;
    const action = actions[node.type];
    const value = getValue[node.type](node);

    return trimEnd([name, action, value].join(' '));
  });

  return strings.filter(e => e).join('\n');
};

export default render;

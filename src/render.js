import { flatten, trimEnd, isObject } from 'lodash';

const indentStr = ' '.repeat(4);

const objToString = (obj, depth) => {
  const getValueString = key => (isObject(obj[key]) ? objToString(obj[key], depth + 1) : obj[key]);
  const indentation = indentStr.repeat(depth);

  const strings = Object.keys(obj).map(key =>
    trimEnd(`${indentation}${key}: ${getValueString(key)}`));

  const closingBracket = `${indentStr.repeat(depth - 1)}}`;
  return ['{', ...strings, closingBracket].join('\n');
};

const makePlainStr = (key, value, type, depth) => {
  const val = isObject(value) ? objToString(value, depth + 1) : value;
  const indentation = `${indentStr.repeat(depth - 1)}  `;
  const sign = { add: '+ ', remove: '- ', common: '  ' };

  return trimEnd(`${indentation}${sign[type]}${key}: ${val}`);
};

const render = (ast, depth = 1) => {
  const strings = flatten(ast.map((node) => {
    if (node.type === 'nested') {
      const indentation = indentStr.repeat(depth);
      return trimEnd(`${indentation}${node.key}: ${render(node.children, depth + 1)}`);
    } else if (node.type === 'change') {
      return [
        makePlainStr(node.key, node.value.after, 'add', depth),
        makePlainStr(node.key, node.value.before, 'remove', depth),
      ];
    }

    return makePlainStr(node.key, node.value, node.type, depth);
  }));

  const closingBracket = `${indentStr.repeat(depth - 1)}}`;
  return ['{', ...strings, closingBracket].join('\n');
};

export default render;

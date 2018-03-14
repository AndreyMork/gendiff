import colors from 'colors';

const isRemoved = str => str[2] === '-';
const isAdded = str => str[2] === '+';

export default (diffStr) => {
  const diffStrings = diffStr.split('\n');
  return diffStrings.map((e) => {
    if (isRemoved(e)) {
      return colors.red(e);
    } else if (isAdded(e)) {
      return colors.green(e);
    }
    return e;
  }).join('\n');
};

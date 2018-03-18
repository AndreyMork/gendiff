import { safeLoad } from 'js-yaml';
import { decode } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': decode,
};

export default (string, ext) => {
  const parse = parsers[ext];
  if (!parse) {
    throw new Error(`'${ext}' is not supported`);
  }
  return parse(string);
};

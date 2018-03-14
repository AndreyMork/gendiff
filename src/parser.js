import { safeLoad } from 'js-yaml';
import { decode } from 'ini';

const parseJson = file => JSON.parse(file, (key, value) => value || '""');

const parseYaml = (file) => {
  const obj = safeLoad(file) || {};
  return Object.keys(obj)
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] || '""' }), {});
};

const parseIni = (file) => {
  const obj = decode(file);
  return Object.keys(obj)
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] || '""' }), {});
};

const parsers = {
  '.json': parseJson,
  '.yml': parseYaml,
  '.yaml': parseYaml,
  '.ini': parseIni,
};

export default (file, ext) => {
  const parse = parsers[ext];
  if (!parse) {
    throw new Error(`'${ext}' is not supported`);
  }
  return parse(file);
};

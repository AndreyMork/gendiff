import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { extname } from 'path';
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

export default (filepath) => {
  const file = readFileSync(filepath, 'utf-8');
  const parse = {
    '.json': parseJson,
    '.yml': parseYaml,
    '.yaml': parseYaml,
    '.ini': parseIni,
  };

  return parse[extname(filepath)](file);
};

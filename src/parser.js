import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { extname } from 'path';

const parseJson = filepath => JSON.parse(readFileSync(filepath), (key, value) => value || '""');

const parseYaml = (filepath) => {
  const obj = safeLoad(readFileSync(filepath)) || {};
  return Object.keys(obj)
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] || '""' }), {});
};

export default (file) => {
  const parse = {
    '.json': parseJson,
    '.yml': parseYaml,
    '.yaml': parseYaml,
  };

  return parse[extname(file)](file);
};

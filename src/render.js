import { renderRaw, renderPlain, renderJson } from './renderers';

const renderers = {
  raw: renderRaw,
  plain: renderPlain,
  json: renderJson,
};

export default (ast, format) => renderers[format](ast);

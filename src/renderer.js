import renderJson from './renderers/jsonRenderer';
import renderPlain from './renderers/plainRenderer';

const renderers = {
  json: renderJson,
  plain: renderPlain,
};

export default (ast, format) => renderers[format](ast);

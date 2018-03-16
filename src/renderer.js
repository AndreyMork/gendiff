import renderRaw from './renderers/rawRenderer';
import renderPlain from './renderers/plainRenderer';

const renderers = {
  raw: renderRaw,
  plain: renderPlain,
};

export default (ast, format) => renderers[format](ast);

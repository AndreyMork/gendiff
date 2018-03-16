import renderUnformatted from './renderers/unformatedRenderer';
import renderPlain from './renderers/plainRenderer';

const renderers = {
  unformatted: renderUnformatted,
  plain: renderPlain,
};

export default (ast, format) => renderers[format](ast);

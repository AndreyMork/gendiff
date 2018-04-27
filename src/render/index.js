import renderPlain from './plain';
import renderRaw from './raw';
import renderJson from './json';

const renderers = {
  plain: renderPlain,
  raw: renderRaw,
  json: renderJson,
};

export const getOutputFormats = () => Object.keys(renderers).join(', ');

export default (ast, format) => {
  const render = renderers[format];
  if (!render) {
    return `'${format}' is unknown output format.\nOutput formats: ${getOutputFormats()}.`;
  }

  return render(ast);
};

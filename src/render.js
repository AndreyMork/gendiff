import { renderRaw, renderPlain, renderJson } from './renderers';

const renderers = {
  raw: renderRaw,
  plain: renderPlain,
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

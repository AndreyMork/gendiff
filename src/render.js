import { renderRaw, renderPlain, renderJson } from './renderers';

const renderers = {
  raw: renderRaw,
  plain: renderPlain,
  json: renderJson,
};

export const formatTypes = Object.keys(renderers);

export default (ast, format) => {
  const render = renderers[format];
  if (!render) {
    return `'${format}' is unknown format type.\n format types: ${formatTypes.join(', ')}`;
  }

  return render(ast);
};

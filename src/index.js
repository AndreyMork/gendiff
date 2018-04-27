import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './parser';
import makeAST from './ast';
import render from './render';

export default (beforeFilePath, afterFilePath, format = 'raw') => {
  const beforeFileStr = readFileSync(beforeFilePath, 'utf-8');
  const afterFileStr = readFileSync(afterFilePath, 'utf-8');

  const parsedBeforeFile = parse(beforeFileStr, extname(beforeFilePath));
  const parsedAfterFile = parse(afterFileStr, extname(afterFilePath));

  const ast = makeAST(parsedBeforeFile, parsedAfterFile);

  return render(ast, format);
};

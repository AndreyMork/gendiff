#! /usr/bin/env node
import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './parser';
import makeAST from './ast';
import render from './render';

export default (beforeFilePath, afterFilePath) => {
  const beforeFile = readFileSync(beforeFilePath, 'utf-8');
  const afterFile = readFileSync(afterFilePath, 'utf-8');

  const parsedBeforeFile = parse(beforeFile, extname(beforeFilePath));
  const parsedAfterFile = parse(afterFile, extname(afterFilePath));

  const ast = makeAST(parsedBeforeFile, parsedAfterFile);

  return render(ast);
};

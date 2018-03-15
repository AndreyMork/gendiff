#! /usr/bin/env node
import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './parser';
import getDifference from './getDiff';

export default (beforeFilePath, afterFilePath) => {
  const beforeFile = readFileSync(beforeFilePath, 'utf-8');
  const afterFile = readFileSync(afterFilePath, 'utf-8');

  const parsedBeforeFile = parse(beforeFile, extname(beforeFilePath));
  const parsedAfterFile = parse(afterFile, extname(afterFilePath));

  return getDifference(parsedBeforeFile, parsedAfterFile);
};

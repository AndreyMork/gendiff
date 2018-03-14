#! /usr/bin/env node
import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './parser';
import getDifference from './getDiff';

const getFileAsStr = filepath => readFileSync(filepath, 'utf-8');

export default (beforeFilePath, afterFilePath) => {
  const beforeFile = getFileAsStr(beforeFilePath);
  const afterFile = getFileAsStr(afterFilePath);

  const parsedBeforeFile = parse(beforeFile, extname(beforeFilePath)) || {};
  const parsedAfterFile = parse(afterFile, extname(afterFilePath)) || {};

  return getDifference(parsedBeforeFile, parsedAfterFile);
};

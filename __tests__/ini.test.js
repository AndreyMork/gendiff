import { readFileSync } from 'fs';
import { trimEnd } from 'lodash';
import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/ini_tests/${filename}`;

test('hexlet', () => {
  const expected = trimEnd(readFileSync(pathTo('hexlet_expected'), 'utf-8'));
  expect(getDiff(pathTo('hexlet_before.ini'), pathTo('hexlet_after.ini'))).toBe(expected);
});

test('all', () => {
  const expected = trimEnd(readFileSync(pathTo('all_expected'), 'utf-8'));
  expect(getDiff(pathTo('all_before.ini'), pathTo('all_after.ini'))).toBe(expected);
});

test('remove', () => {
  const expected = trimEnd(readFileSync(pathTo('remove_expected'), 'utf-8'));
  expect(getDiff(pathTo('remove_before.ini'), pathTo('remove_after.ini'))).toBe(expected);
});

test('add', () => {
  const expected = trimEnd(readFileSync(pathTo('add_expected'), 'utf-8'));
  expect(getDiff(pathTo('add_before.ini'), pathTo('add_after.ini'))).toBe(expected);
});

test('no-diff', () => {
  const expected = trimEnd(readFileSync(pathTo('no_diff_expected'), 'utf-8'));
  expect(getDiff(pathTo('no_diff_before.ini'), pathTo('no_diff_after.ini'))).toBe(expected);
});
